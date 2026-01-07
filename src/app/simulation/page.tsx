"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Shield, Crosshair, Skull, Trophy, AlertTriangle, Swords, Play, Ship, Plane } from "lucide-react";
import { getAllCountries, getCountryById, CountryData } from "@/lib/mockData";
// import SimulationMap from "@/components/SimulationMap"; // Removed
import { ALL_TACTICS, Tactic, PersonalityType, ScenarioType, getPersonality, PERSONALITY_INFO } from "@/lib/tacticsData";
import Footer from "@/components/Footer";

// Types
// ScenarioType is now imported
// type ScenarioType = "TOTAL_WAR" | "NAVAL_BLOCKADE" | "AIR_SUPERIORITY" | "BORDER_SKIRMISH";

interface BattleLog {
    timestamp: string;
    message: string;
    type: "info" | "damage" | "critical" | "victory";
    source?: string;
}

const SCENARIOS: Record<ScenarioType, { label: string; desc: string; modifiers: [number, number, number] }> = {
    TOTAL_WAR: {
        label: "Total War",
        desc: "Full-scale conflict involving all military branches.",
        modifiers: [1, 1, 1] // Army, Navy, Air
    },
    NAVAL_BLOCKADE: {
        label: "Naval Blockade",
        desc: "Maritime conflict focusing on fleet strength and coastal defense.",
        modifiers: [0.2, 2.0, 1.2]
    },
    AIR_SUPERIORITY: {
        label: "Air Superiority",
        desc: "Battle for control of the skies.",
        modifiers: [0.1, 0.5, 2.5]
    },
    BORDER_SKIRMISH: {
        label: "Border Skirmish",
        desc: "Limited ground engagement involving army and tactical air support.",
        modifiers: [1.5, 0, 0.8]
    }
};

// Helper Functions
// Calculate distance between two coordinates (Haversine formula)
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// Doctrine System
type MilitaryDoctrine = "LAND_DOMINANT" | "NAVAL_DOMINANT" | "AIR_DOMINANT" | "BALANCED" | "ASYMMETRIC";

const getCountryDoctrine = (c: CountryData): MilitaryDoctrine => {
    // Improved heuristic for more doctrine variety

    // Asymmetric check: Weak power but high manpower
    if (c.powerIndex > 2.0 && c.army.activePersonnel > 200000) return "ASYMMETRIC";

    // Use more balanced scoring to get better variety
    const airScore = c.airforce.totalAircraft * 8 + (c.airforce.fighters * 12) + (c.airforce.attackHelicopters * 15);
    const navalScore = c.navy.totalShips * 15 + (c.navy.aircraftCarriers * 3000) + (c.navy.submarines * 200) + (c.navy.destroyers * 100);
    const landScore = (c.army.tanks * 8) + (c.army.rocketProjectors * 12) + (c.army.activePersonnel * 0.03) + (c.army.afv * 3);

    // Add threshold for clearer distinction
    const maxScore = Math.max(airScore, navalScore, landScore);
    const secondMax = [airScore, navalScore, landScore].sort((a, b) => b - a)[1];

    // If scores are too close, it's balanced
    if (maxScore / (secondMax + 1) < 1.3) return "BALANCED";

    if (airScore === maxScore) return "AIR_DOMINANT";
    if (navalScore === maxScore) return "NAVAL_DOMINANT";
    if (landScore === maxScore) return "LAND_DOMINANT";

    return "BALANCED";
};

const DOCTRINE_INFO: Record<MilitaryDoctrine, { label: string; icon: any; color: string; desc: string }> = {
    "LAND_DOMINANT": { label: "Land Warfare Specialist", icon: Shield, color: "text-green-500", desc: "Bonus in Total War & Border Skirmishes" },
    "NAVAL_DOMINANT": { label: "Maritime Power", icon: Ship, color: "text-blue-400", desc: "Bonus in Naval Blockades" },
    "AIR_DOMINANT": { label: "Air Superiority Focus", icon: Plane, color: "text-sky-300", desc: "Bonus in Air Superiority & Strikes" },
    "BALANCED": { label: "Balanced Force", icon: Crosshair, color: "text-amber-400", desc: "Minor bonus in all scenarios" },
    "ASYMMETRIC": { label: "Asymmetric / Guerilla", icon: AlertTriangle, color: "text-red-400", desc: "Unpredictable critical hits" }
};

// Personality System
// PersonalityType is imported



import TeamBuilder from "@/components/TeamBuilder";

// ... (Imports and Helpers stay same) ...

function SimulationPageContent() {
    const searchParams = useSearchParams();

    // Game Mode
    const [mode, setMode] = useState<"1v1" | "TEAM">("1v1");

    // Team State (Single Source of Truth)
    const [team1, setTeam1] = useState<CountryData[]>([]);
    const [team2, setTeam2] = useState<CountryData[]>([]);

    // Initial sync from URL
    useEffect(() => {
        const initC1 = searchParams.get("init");
        if (initC1) {
            const c = getCountryById(initC1);
            if (c) setTeam1([c]);
        }
    }, [searchParams]);

    const [scenario, setScenario] = useState<ScenarioType>("TOTAL_WAR");
    const [isSimulating, setIsSimulating] = useState(false);
    const [battleLogs, setBattleLogs] = useState<BattleLog[]>([]);
    const [winner, setWinner] = useState<string | null>(null); // "TEAM1" or "TEAM2"

    const handle1v1Select1 = (id: string) => {
        if (!id) { setTeam1([]); return; }
        const c = getCountryById(id);
        if (c) setTeam1([c]);
    };

    const handle1v1Select2 = (id: string) => {
        if (!id) { setTeam2([]); return; }
        const c = getCountryById(id);
        if (c) setTeam2([c]);
    };

    // HP Maps (CountryID -> HP)
    const [team1Hp, setTeam1Hp] = useState<Record<string, number>>({});
    const [team2Hp, setTeam2Hp] = useState<Record<string, number>>({});

    const [activeTactics, setActiveTactics] = useState<Record<string, Tactic>>({}); // CountryID -> Active Tactic
    const [useNuclear, setUseNuclear] = useState(false);

    const countries = getAllCountries();

    // Nuclear Availability Check
    const canUseNuclear = [...team1, ...team2].some(c => c.nuclear.hasNuclear);

    useEffect(() => {
        if (!canUseNuclear) setUseNuclear(false);
    }, [team1, team2, canUseNuclear]);

    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const currentSimulationId = React.useRef<number>(0);

    // Reset
    const resetSimulation = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        currentSimulationId.current = Date.now();
        setIsSimulating(false);
        setWinner(null);
        setBattleLogs([]);
        setTeam1Hp({});
        setTeam2Hp({});
        setActiveTactics({});
    };

    // Add/Remove Helpers
    const addToTeam1 = (c: CountryData) => setTeam1(prev => [...prev, c]);
    const removeFromTeam1 = (id: string) => setTeam1(prev => prev.filter(c => c.id !== id));
    const addToTeam2 = (c: CountryData) => setTeam2(prev => [...prev, c]);
    const removeFromTeam2 = (id: string) => setTeam2(prev => prev.filter(c => c.id !== id));

    const runSimulation = async () => {
        if (team1.length === 0 || team2.length === 0) return;

        // Init Health
        const t1Health: Record<string, number> = {};
        const t2Health: Record<string, number> = {};
        team1.forEach(c => t1Health[c.id] = 100);
        team2.forEach(c => t2Health[c.id] = 100);

        setTeam1Hp(t1Health);
        setTeam2Hp(t2Health);
        setWinner(null);
        setBattleLogs([]);
        setActiveTactics({});

        setIsSimulating(true);

        const runId = Date.now();
        currentSimulationId.current = runId;

        const addLog = (msg: string, type: BattleLog["type"] = "info") => {
            setBattleLogs(prev => [...prev, {
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: '2-digit', second: '2-digit' }),
                message: msg,
                type
            }]);
        };

        addLog(`=== BATTLE START: ${SCENARIOS[scenario].label.toUpperCase()} ===`);
        addLog(`BLUE TEAM (${team1.length}) vs RED TEAM (${team2.length})`);

        await new Promise(r => setTimeout(r, 1000));
        if (currentSimulationId.current !== runId) return;

        // Helper: Proximity-based target selection for Team Battle
        const selectTargetByProximity = (attacker: CountryData, candidates: CountryData[]) => {
            if (mode === "1v1" || candidates.length === 1) {
                // 1v1 mode or single target: just return it
                return candidates[0];
            }

            // Calculate distances and weights
            const weights = candidates.map(target => {
                const dist = getDistance(
                    attacker.coordinates[0], attacker.coordinates[1],
                    target.coordinates[0], target.coordinates[1]
                );
                // Closer countries have higher weight (inverse distance)
                return { target, weight: 1 / (dist + 100) }; // +100 to avoid division by zero
            });

            // Weighted random selection
            const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
            let random = Math.random() * totalWeight;

            for (const { target, weight } of weights) {
                random -= weight;
                if (random <= 0) return target;
            }

            return weights[0].target; // fallback
        };

        // Simulation Loop
        intervalRef.current = setInterval(() => {
            try {
                // Check Win Condition
                const t1Alive = team1.filter(c => t1Health[c.id] > 0);
                const t2Alive = team2.filter(c => t2Health[c.id] > 0);

                if (t1Alive.length === 0 || t2Alive.length === 0) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsSimulating(false);
                    const winTeam = t1Alive.length > 0 ? "BLUE TEAM" : "RED TEAM";
                    setWinner(winTeam);
                    addLog(`⭐⭐⭐ VICTORY: ${winTeam} ELIMINATED THE ENEMY! ⭐⭐⭐`, "victory");
                    return;
                }

                // Execution Phase
                // 1. Pick random attacker from T1 -> Proximity-based target in T2
                if (t1Alive.length > 0 && t2Alive.length > 0) {
                    const attacker = t1Alive[Math.floor(Math.random() * t1Alive.length)];
                    const target = selectTargetByProximity(attacker, t2Alive);
                    executeAttack(attacker, target, t2Health, true);
                }

                // 2. Pick random attacker from T2 -> Proximity-based target in T1
                if (t2Alive.length > 0 && t1Alive.length > 0) {
                    const attacker = t2Alive[Math.floor(Math.random() * t2Alive.length)];
                    const target = selectTargetByProximity(attacker, t1Alive);
                    executeAttack(attacker, target, t1Health, false);
                }

                // Update UI state
                setTeam1Hp({ ...t1Health });
                setTeam2Hp({ ...t2Health });

            } catch (e) {
                console.error(e);
            }
        }, 1500);

        // Helper: Check if country has required units for scenario tactics
        const hasRequiredUnits = (country: CountryData, scenarioType: ScenarioType): boolean => {
            switch (scenarioType) {
                case "AIR_SUPERIORITY":
                    return country.airforce.totalAircraft > 0;
                case "NAVAL_BLOCKADE":
                    return country.navy.totalShips > 0;
                case "TOTAL_WAR":
                case "BORDER_SKIRMISH":
                    return true; // All countries can participate
                default:
                    return true;
            }
        };

        // Attack Logic
        const executeAttack = (attacker: CountryData, target: CountryData, targetHealthMap: Record<string, number>, isTeam1: boolean) => {
            // Basic Power Calc
            const pAtt = attacker.powerIndex > 0 ? attacker.powerIndex : 0.0001;
            const pDef = target.powerIndex > 0 ? target.powerIndex : 0.0001;

            // Inverted because lower is better for index
            const powerRatio = (1 / pAtt) / (1 / pDef);

            let damage = Math.max(5, Math.floor((Math.random() * 15 + 5) * powerRatio));

            // Tactics with unit requirements
            const pType = getPersonality(attacker.id);
            const availableTactics = ALL_TACTICS.filter(t =>
                t.personality === pType &&
                t.scenario === scenario &&
                hasRequiredUnits(attacker, scenario)
            );

            if (availableTactics.length > 0 && Math.random() > 0.3) {
                const tactic = availableTactics[Math.floor(Math.random() * availableTactics.length)];
                setActiveTactics(prev => ({ ...prev, [attacker.id]: tactic }));
                addLog(`${attacker.name} uses [${tactic.name}] on ${target.name} (-${damage})`, "info");
            } else {
                setActiveTactics(prev => {
                    const next = { ...prev };
                    delete next[attacker.id];
                    return next;
                });
                addLog(`${attacker.name} attacks ${target.name} (-${damage})`, "info");
            }

            // Apply Damage
            const currentHp = targetHealthMap[target.id] || 100;
            const newHp = Math.max(0, currentHp - damage);
            targetHealthMap[target.id] = newHp;

            // Log HP change for debugging
            console.log(`${target.name} HP: ${currentHp} -> ${newHp} (damage: ${damage})`);
        };
    };

    return (
        <main className="min-h-screen bg-slate-950 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header & Mode Select */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white mb-4 uppercase flex justify-center items-center gap-4">
                        <Crosshair className="w-10 h-10 text-red-500" />
                        Combat Simulation
                        <Crosshair className="w-10 h-10 text-red-500" />
                    </h1>
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => {
                                setMode("1v1");
                                resetSimulation();
                                setTeam1([]); // Clear teams to prevent crossover
                                setTeam2([]);
                            }}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${mode === "1v1" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"}`}
                        >
                            1v1 DUEL
                        </button>
                        <button
                            onClick={() => {
                                setMode("TEAM");
                                resetSimulation();
                                setTeam1([]);
                                setTeam2([]);
                            }}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${mode === "TEAM" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}
                        >
                            TEAM BATTLE
                        </button>
                    </div>
                </div>

                {/* Team Builders or 1v1 Selects */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {mode === "TEAM" ? (
                        <>
                            <TeamBuilder
                                teamName="BLUE TEAM"
                                teamColor="blue"
                                countries={countries}
                                selectedCountries={team1}
                                onAdd={addToTeam1}
                                onRemove={removeFromTeam1}
                                disabled={isSimulating}
                            />
                            <TeamBuilder
                                teamName="RED TEAM"
                                teamColor="red"
                                countries={countries}
                                selectedCountries={team2}
                                onAdd={addToTeam2}
                                onRemove={removeFromTeam2}
                                disabled={isSimulating}
                            />
                        </>
                    ) : (
                        <>
                            {/* Player 1 (Blue) */}
                            <div className="bg-slate-900/50 border border-blue-500/30 p-6 rounded-xl relative overflow-hidden">
                                <div className="text-blue-500 font-bold mb-4 flex items-center justify-between z-10 relative">
                                    <span className="flex items-center gap-2"><Shield className="w-5 h-5" /> BLUE FORCE</span>
                                    {team1[0] && (
                                        <span className={`text-xs px-2 py-1 rounded bg-slate-800 border ${PERSONALITY_INFO[getPersonality(team1[0].id)].color} flex items-center gap-1`}>
                                            {React.createElement(PERSONALITY_INFO[getPersonality(team1[0].id)].icon, { className: "w-3 h-3" })}
                                            {PERSONALITY_INFO[getPersonality(team1[0].id)].label}
                                        </span>
                                    )}
                                </div>

                                <select
                                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded mb-4 z-10 relative"
                                    value={team1[0]?.id || ""}
                                    onChange={e => handle1v1Select1(e.target.value)}
                                    disabled={isSimulating}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>

                                {team1[0] && (
                                    <div className="text-center z-10 relative">
                                        <img src={team1[0].flagUrl} className="w-32 h-20 object-cover mx-auto mb-4 rounded shadow-lg border border-slate-700" />
                                        <div className="text-4xl font-black mb-2">{Math.round(team1Hp[team1[0].id] ?? 100)}%</div>
                                        <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                style={{ width: `${team1Hp[team1[0].id] ?? 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {/* Background decoration */}
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                            </div>

                            {/* Player 2 (Red) */}
                            <div className="bg-slate-900/50 border border-red-500/30 p-6 rounded-xl relative overflow-hidden">
                                <div className="text-red-500 font-bold mb-4 flex items-center justify-between z-10 relative">
                                    <span className="flex items-center gap-2">RED FORCE <Shield className="w-5 h-5" /></span>
                                    {team2[0] && (
                                        <span className={`text-xs px-2 py-1 rounded bg-slate-800 border ${PERSONALITY_INFO[getPersonality(team2[0].id)].color} flex items-center gap-1`}>
                                            {React.createElement(PERSONALITY_INFO[getPersonality(team2[0].id)].icon, { className: "w-3 h-3" })}
                                            {PERSONALITY_INFO[getPersonality(team2[0].id)].label}
                                        </span>
                                    )}
                                </div>

                                <select
                                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded mb-4 z-10 relative"
                                    value={team2[0]?.id || ""}
                                    onChange={e => handle1v1Select2(e.target.value)}
                                    disabled={isSimulating}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>

                                {team2[0] && (
                                    <div className="text-center z-10 relative">
                                        <img src={team2[0].flagUrl} className="w-32 h-20 object-cover mx-auto mb-4 rounded shadow-lg border border-slate-700" />
                                        <div className="text-4xl font-black mb-2">{Math.round(team2Hp[team2[0].id] ?? 100)}%</div>
                                        <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700">
                                            <div
                                                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                                style={{ width: `${team2Hp[team2[0].id] ?? 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {/* Background decoration */}
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/5 rounded-full blur-3xl"></div>
                            </div>
                        </>
                    )}
                </div>

                {/* Active Tactics Display (Dedicated Section) */}
                {isSimulating && Object.keys(activeTactics).length > 0 && (
                    <div className="mb-8">
                        <div className="text-center text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">- Active Tactics -</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(activeTactics).map(([countryId, tactic]) => {
                                const c = getCountryById(countryId);
                                if (!c) return null;
                                const isTeam1 = team1.some(t => t.id === c.id);
                                return (
                                    <div key={countryId} className={`bg-slate-900/80 border ${isTeam1 ? "border-blue-500/40" : "border-red-500/40"} p-3 rounded-lg flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 shadow-lg backdrop-blur`}>
                                        <img src={c.flagUrl} className="w-12 h-8 object-cover rounded shadow border border-slate-700" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`font-bold text-xs ${isTeam1 ? "text-blue-400" : "text-red-400"}`}>{c.name}</span>
                                                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{tactic.name}</span>
                                            </div>
                                            <div className="text-xs text-slate-300 leading-tight truncate">{tactic.description}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Active Combat Status (Only when simulating AND in Team Mode) - Removed Popups */}
                {isSimulating && mode === "TEAM" && (
                    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Blue Team Status */}
                        <div className="space-y-2">
                            {team1.map(c => {
                                const hp = team1Hp[c.id] ?? 100;
                                return (
                                    <div key={c.id} className={`bg-slate-900 border ${hp === 0 ? "border-slate-800 opacity-50" : "border-blue-500/30"} p-2 rounded flex items-center gap-3 relative overflow-hidden transition-all`}>
                                        <img src={c.flagUrl} className="w-10 h-6 object-cover rounded opacity-80" />
                                        <div className="flex-1 z-10">
                                            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                                <span>{c.name}</span>
                                                <span className={hp < 30 ? "text-red-500" : "text-blue-400"}>{hp}%</span>
                                            </div>
                                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${hp}%` }} />
                                            </div>
                                        </div>
                                        {hp <= 0 && <Skull className="absolute right-2 w-6 h-6 text-slate-700" />}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Red Team Status */}
                        <div className="space-y-2">
                            {team2.map(c => {
                                const hp = team2Hp[c.id] ?? 100;
                                return (
                                    <div key={c.id} className={`bg-slate-900 border ${hp === 0 ? "border-slate-800 opacity-50" : "border-red-500/30"} p-2 rounded flex items-center gap-3 relative overflow-hidden transition-all`}>
                                        <div className="flex-1 z-10 text-right">
                                            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                                <span className={hp < 30 ? "text-red-500" : "text-red-400"}>{hp}%</span>
                                                <span>{c.name}</span>
                                            </div>
                                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden flex justify-end">
                                                <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${hp}%` }} />
                                            </div>
                                        </div>
                                        <img src={c.flagUrl} className="w-10 h-6 object-cover rounded opacity-80" />
                                        {hp <= 0 && <Skull className="absolute left-2 w-6 h-6 text-slate-700" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Scenario & Controls */}
                <div className="text-center mb-8">
                    {!isSimulating && !winner && (
                        <div className="mb-6">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Combat Scenario</h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {(Object.keys(SCENARIOS) as ScenarioType[]).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setScenario(s)}
                                        className={`px-4 py-2 rounded text-xs font-bold uppercase transition-all border ${scenario === s
                                            ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                            : "bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-600"
                                            }`}
                                    >
                                        {SCENARIOS[s].label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-slate-400 mb-4 font-mono text-sm max-w-2xl mx-auto border-l-2 border-slate-700 pl-4 py-2 bg-slate-900/50 rounded-r">
                        <span className="text-amber-500 font-bold mr-2">[{SCENARIOS[scenario].label}]</span>
                        {SCENARIOS[scenario].desc}
                    </p>

                    {!isSimulating && !winner && (
                        <button
                            onClick={runSimulation}
                            disabled={team1.length === 0 || team2.length === 0}
                            className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-12 rounded-lg shadow-lg text-xl uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            START BATTLE
                        </button>
                    )}

                    {winner && (
                        <div className="animate-bounce">
                            <div className="text-2xl font-black text-amber-500 mb-2">{winner} WINS!</div>
                            <button onClick={resetSimulation} className="bg-amber-500 text-black font-bold py-2 px-6 rounded hover:bg-amber-400">
                                PLAY AGAIN
                            </button>
                        </div>
                    )}
                </div>

                {/* Battle Log */}
                <div className="bg-black border border-slate-800 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs">
                    {battleLogs.length === 0 ? <span className="text-slate-600">Waiting for deployment...</span> : (
                        <div className="space-y-1">
                            {battleLogs.map((log, i) => (
                                <div key={i} className={`
                                    ${log.type === 'victory' ? 'text-amber-400 font-bold text-base' :
                                        log.type === 'critical' ? 'text-red-400' : 'text-slate-400'}
                                `}>
                                    <span className="opacity-50 mr-2">[{log.timestamp}]</span>
                                    {log.message}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}

const SimulationPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <SimulationPageContent />
        </Suspense>
    );
};

export default SimulationPage;
