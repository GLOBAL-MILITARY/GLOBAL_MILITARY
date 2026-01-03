"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Shield, Crosshair, Skull, Trophy, AlertTriangle, Swords, Play, Ship, Plane } from "lucide-react";
import { getAllCountries, getCountryById, CountryData } from "@/lib/mockData";
import { ALL_TACTICS, Tactic, PersonalityType, ScenarioType, getPersonality } from "@/lib/tacticsData";
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

// Personality System
// PersonalityType is imported

const PERSONALITY_INFO: Record<PersonalityType, { label: string; icon: any; color: string; desc: string }> = {
    "OFFENSIVE": { label: "OFFENSIVE", icon: Swords, color: "text-red-500", desc: "+10% Dmg Dealt, +5% Dmg Taken" },
    "DEFENSIVE": { label: "DEFENSIVE", icon: Shield, color: "text-blue-500", desc: "-10% Dmg Output, -15% Dmg Taken" },
    "NEUTRAL": { label: "NEUTRAL", icon: Crosshair, color: "text-slate-400", desc: "Standard Combat Stats" }
};

function SimulationPageContent() {
    const searchParams = useSearchParams();

    const [country1Id, setCountry1Id] = useState<string>(searchParams.get("init") || "");
    const [country2Id, setCountry2Id] = useState<string>("");
    const [scenario, setScenario] = useState<ScenarioType>("TOTAL_WAR");
    const [isSimulating, setIsSimulating] = useState(false);
    const [battleLogs, setBattleLogs] = useState<BattleLog[]>([]);
    const [winner, setWinner] = useState<CountryData | null>(null);
    const [hp1, setHp1] = useState(100);
    const [hp2, setHp2] = useState(100);
    const [tactic1, setTactic1] = useState<string | null>(null);
    const [tactic2, setTactic2] = useState<string | null>(null);
    const [useNuclear, setUseNuclear] = useState(false);

    const countries = getAllCountries();
    const country1 = country1Id ? getCountryById(country1Id) : null;
    const country2 = country2Id ? getCountryById(country2Id) : null;

    // Check if nuclear option is available (Both must have nuclear weapons)
    // Check if nuclear option is available (Either country has nuclear weapons)
    const canUseNuclear = country1?.nuclear.hasNuclear || country2?.nuclear.hasNuclear;

    // Reset nuclear toggle if countries change or aren't eligible
    useEffect(() => {
        if (!canUseNuclear) {
            setUseNuclear(false);
        }
    }, [country1Id, country2Id, canUseNuclear]);

    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const currentSimulationId = React.useRef<number>(0);
    const gameStateRef = React.useRef({
        hp1: 100,
        hp2: 100,
        round: 1,
        hasNukeFired: false
    });

    // Reset Simulation
    const resetSimulation = () => {
        setWinner(null);
        setBattleLogs([]);
        setHp1(100);
        setHp2(100);
        setTactic1(null);
        setTactic2(null);
    };

    // Simulation Engine
    const runSimulation = async () => {
        if (!country1 || !country2) return;

        // 1. Same Country Check
        if (country1.id === country2.id) {
            alert("Cannot simulate combat between the same country.");
            return;
        }

        // Helper Data: Border Adjacency (ISO Alpha-3)
        const BORDER_ADJACENCY: Record<string, string[]> = {
            "sko": ["nko"],
            "nko": ["sko", "chn", "rus"],
            "chn": ["ind", "rus", "nko", "vnm", "mmr", "btn", "nep", "pak", "afg", "tjk", "kgz", "kaz", "mng"],
            "ind": ["chn", "pak", "btn", "nep", "bgd", "mmr"],
            "pak": ["ind", "chn", "afg", "irn"],
            "rus": ["chn", "nko", "kaz", "mng", "geo", "aze", "ukr", "blr", "lva", "est", "fin", "nor", "pol"], // pol via Kaliningrad
            "ukr": ["rus", "blr", "pol", "svk", "hun", "rou", "mda"],
            "blr": ["rus", "ukr", "pol", "ltu", "lva"],
            "pol": ["ukr", "blr", "deu", "cze", "svk", "ltu", "rus"],
            "usa": ["can", "mex"],
            "can": ["usa"],
            "mex": ["usa", "gtm", "blz"],
            "isr": ["egy", "jor", "syr", "lbn", "pse"],
            "irn": ["pak", "afg", "tkm", "aze", "arm", "tur", "irq"],
            "egy": ["isr", "pse", "lby", "sdn"],
            "jor": ["isr", "pse", "syr", "irq", "sau"],
            "syr": ["isr", "lbn", "tur", "irq", "jor"],
            "lbn": ["isr", "syr"],
            "tky": ["grc", "bgr", "geo", "arm", "aze", "irn", "irq", "syr"],
            "tur": ["grc", "bgr", "geo", "arm", "aze", "irn", "irq", "syr"],
            "grc": ["alb", "mkd", "bgr", "tur"],
            "fra": ["bel", "lux", "deu", "che", "ita", "mco", "esp", "and"],
            "deu": ["dnk", "pol", "cze", "aut", "che", "fra", "lux", "bel", "nld"],
            "ger": ["dnk", "pol", "cze", "aut", "che", "fra", "lux", "bel", "nld"],
            "ita": ["fra", "che", "aut", "svn"],
            "ukd": ["irl"],
            "bra": ["arg", "bol", "col", "guf", "guy", "pry", "per", "sur", "ury", "ven"],
            "jpn": [],
            "ino": ["mys", "png", "tls"],
            "arg": ["bol", "bra", "chl", "pry", "ury"],
            "bol": ["arg", "bra", "chl", "pry", "per"],
        };

        const c1Id = country1.id.toLowerCase();
        const c2Id = country2.id.toLowerCase();

        const neighbors1 = BORDER_ADJACENCY[c1Id] || [];
        const isNeighbor = neighbors1.includes(c2Id);

        // 2. Border Skirmish Constraint (Adjacency Check)
        if (scenario === "BORDER_SKIRMISH") {
            if (!isNeighbor) {
                // Double check reverse direction just in case
                const neighbors2 = BORDER_ADJACENCY[c2Id] || [];
                if (!neighbors2.includes(c1Id)) {
                    alert(`Border Skirmish is only available for countries sharing a land border.\n(e.g., South Korea vs North Korea, Ukraine vs Russia)`);
                    return;
                }
            }
        }

        // Initialize new run
        const runId = Date.now();
        currentSimulationId.current = runId;

        // Reset State
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsSimulating(true); // Prevent double clicks immediately
        setBattleLogs([]);
        setWinner(null);
        setHp1(100);
        setHp2(100);
        setTactic1(null);
        setTactic2(null);

        const addLog = (msg: string, type: BattleLog["type"] = "info", source?: string) => {
            setBattleLogs(prev => [...prev, {
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: '2-digit', second: '2-digit' }),
                message: msg,
                type,
                source
            }]);
        };

        addLog(`=== INITIALIZING SIMULATION: ${SCENARIOS[scenario].label.toUpperCase()} ===`);
        if (useNuclear) {
            addLog(`☢️ WARNING: NUCLEAR WEAPONS AUTHORIZED ☢️`, "critical");
        }
        addLog(`${country1.name} vs ${country2.name}`);

        // Artillery Restriction Logic
        const artilleryEnabled = isNeighbor;
        if (!artilleryEnabled && scenario !== "NAVAL_BLOCKADE" && scenario !== "AIR_SUPERIORITY") {
            addLog(`⚠️ DISTANCE: Non-adjacent countries. Artillery support unavailable (Damage Reduced).`, "info");
        }

        // Calculate Doctrines
        const doctrine1 = getCountryDoctrine(country1);
        const doctrine2 = getCountryDoctrine(country2);

        addLog(`${country1.name} doctrine: ${DOCTRINE_INFO[doctrine1].label}`);
        addLog(`${country2.name} doctrine: ${DOCTRINE_INFO[doctrine2].label}`);

        // Personality Logic
        const p1Type = getPersonality(country1.id);
        const p2Type = getPersonality(country2.id);

        addLog(`${country1.name} personality: ${PERSONALITY_INFO[p1Type].label}`);
        addLog(`${country2.name} personality: ${PERSONALITY_INFO[p2Type].label}`);

        await new Promise(r => setTimeout(r, 1000));
        if (currentSimulationId.current !== runId) return;

        // Combat Modifiers based on Doctrine vs Scenario
        let mod1 = 1.0;
        let mod2 = 1.0;

        // Personality Modifiers
        // Offensive: +10% deal, +5% take
        // Defensive: -10% deal, -15% take
        let p1DmgMult = 1.0; // Damage I deal
        let p1DefMult = 1.0; // Damage I take
        let p2DmgMult = 1.0;
        let p2DefMult = 1.0;

        if (p1Type === "OFFENSIVE") { p1DmgMult = 1.1; p1DefMult = 1.05; }
        if (p1Type === "DEFENSIVE") { p1DmgMult = 0.9; p1DefMult = 0.85; }

        if (p2Type === "OFFENSIVE") { p2DmgMult = 1.1; p2DefMult = 1.05; }
        if (p2Type === "DEFENSIVE") { p2DmgMult = 0.9; p2DefMult = 0.85; }

        const applyDoctrineBonus = (doc: MilitaryDoctrine, scn: ScenarioType) => {
            if (doc === "BALANCED") return 1.1; // Small consistent bonus
            if (doc === "ASYMMETRIC") return 1.0; // Handled via crit chance

            if (doc === "NAVAL_DOMINANT" && scn === "NAVAL_BLOCKADE") return 1.3;
            if (doc === "AIR_DOMINANT" && scn === "AIR_SUPERIORITY") return 1.3;
            if (doc === "LAND_DOMINANT" && (scn === "TOTAL_WAR" || scn === "BORDER_SKIRMISH")) return 1.25;

            // Penalty for mismatch (e.g. Land power trying to do naval blockade)
            if (doc === "LAND_DOMINANT" && scn === "NAVAL_BLOCKADE") return 0.8;
            if (doc === "NAVAL_DOMINANT" && scn === "BORDER_SKIRMISH") return 0.9;

            return 1.0;
        };

        mod1 = applyDoctrineBonus(doctrine1, scenario);
        mod2 = applyDoctrineBonus(doctrine2, scenario);

        // Modernization Tech Multiplier (Level 1=0.5x, Level 10=2.0x)
        // Formula: 0.5 + (Level - 1) * (1.5 / 9)
        const tech1 = country1.modernizationLevel || 5;
        const tech2 = country2.modernizationLevel || 5;

        const getTechMult = (lvl: number) => 0.5 + (lvl - 1) * 0.1666;
        const techMult1 = getTechMult(tech1);
        const techMult2 = getTechMult(tech2);

        addLog(`Tech Lv ${tech1}: x${techMult1.toFixed(2)} Power`, "info", country1.name);
        addLog(`Tech Lv ${tech2}: x${techMult2.toFixed(2)} Power`, "info", country2.name);

        await new Promise(r => setTimeout(r, 1000));
        if (currentSimulationId.current !== runId) return;

        // Robust Power Calculation
        const p1 = country1.powerIndex > 0 ? country1.powerIndex : 0.0001;
        const p2 = country2.powerIndex > 0 ? country2.powerIndex : 0.0001;

        // Raw Power: Inverse of PowerIndex (Lower is better)
        // Apply Tech Multiplier to Raw Power
        // Apply Personality Modifiers: (My Damage Output * Enemy Defense Reduction)
        // Effectively: If I am Offensive (1.1x), and Enemy is Defensive (0.85x taken), my effective power is 1.1 * 1.0 (DefMult is self-taken, so we need to apply MY DmgMult and Enemy DefMult to MY damage output)

        // Let's apply it directly to damage output instead of Raw Power for cleaner logic
        // But here we set Raw Power which determines base damage.

        const rawPower1 = (1 / p1) * (1 + Math.random() * 0.2) * mod1 * techMult1;
        const rawPower2 = (1 / p2) * (1 + Math.random() * 0.2) * mod2 * techMult2;

        // Simulation Loop State
        let activeHp1 = 100;
        let activeHp2 = 100;
        let round = 1;
        let hasNukeFired = false; // Track if nuke has been used

        // Force reset UI immediately
        setHp1(100);
        setHp2(100);

        // Check run ID before starting interval logic to be safe
        if (currentSimulationId.current !== runId) return;

        intervalRef.current = setInterval(() => {
            try {
                if (activeHp1 <= 0 || activeHp2 <= 0) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsSimulating(false);
                    const win = activeHp1 > activeHp2 ? country1 : country2;
                    setWinner(win);
                    addLog(`⭐⭐⭐ MISSION ACCOMPLISHED: ${win.name.toUpperCase()} VICTORY ⭐⭐⭐`, "victory");
                    return;
                }

                // Nuclear Logic (Threshold: <= 40% HP, reduced damage for better gameplay)
                if (useNuclear) {
                    const baseDamage = 25; // Reduced from 30 for better pacing

                    // Check Player 1 Trigger
                    if (!hasNukeFired && country1.nuclear.hasNuclear && activeHp1 <= 40) {
                        hasNukeFired = true;
                        activeHp2 = Math.max(0, activeHp2 - baseDamage);
                        setHp2(activeHp2);
                        addLog(`☢️ EMERGENCY: ${country1.name} HP CRITICAL! NUCLEAR LAUNCH INITIATED! ☢️`, "critical");
                        addLog(`💥 IMPACT CONFIRMED: ${country2.name} sustains catastrophic damage (-${baseDamage} HP)`, "damage");

                        // Retaliation Check (slightly reduced damage)
                        if (country2.nuclear.hasNuclear) {
                            const retaliationDamage = Math.floor(baseDamage * 0.8); // 20 damage
                            activeHp1 = Math.max(0, activeHp1 - retaliationDamage);
                            setHp1(activeHp1);
                            addLog(`🚀 RETALIATION DETECTED: ${country2.name} launches counter-strike!`, "critical");
                            addLog(`💥 IMPACT CONFIRMED: ${country1.name} sustains catastrophic damage (-${retaliationDamage} HP)`, "damage");
                        }
                    }
                    // Check Player 2 Trigger (if they hit threshold first)
                    else if (!hasNukeFired && country2.nuclear.hasNuclear && activeHp2 <= 40) {
                        hasNukeFired = true;
                        activeHp1 = Math.max(0, activeHp1 - baseDamage);
                        setHp1(activeHp1);
                        addLog(`☢️ EMERGENCY: ${country2.name} HP CRITICAL! NUCLEAR LAUNCH INITIATED! ☢️`, "critical");
                        addLog(`💥 IMPACT CONFIRMED: ${country1.name} sustains catastrophic damage (-${baseDamage} HP)`, "damage");

                        // Retaliation Check (slightly reduced damage)
                        if (country1.nuclear.hasNuclear) {
                            const retaliationDamage = Math.floor(baseDamage * 0.8); // 20 damage
                            activeHp2 = Math.max(0, activeHp2 - retaliationDamage);
                            setHp2(activeHp2);
                            addLog(`🚀 RETALIATION DETECTED: ${country1.name} launches counter-strike!`, "critical");
                            addLog(`💥 IMPACT CONFIRMED: ${country2.name} sustains catastrophic damage (-${retaliationDamage} HP)`, "damage");
                        }
                    }
                }

                // Damage Logic
                const critChance1 = doctrine1 === "ASYMMETRIC" ? 0.3 : 0.1;
                const critChance2 = doctrine2 === "ASYMMETRIC" ? 0.3 : 0.1;

                let dmg1 = Math.max(5, Math.floor((Math.random() * 15 + 5) * (rawPower2 / rawPower1)));
                let dmg2 = Math.max(5, Math.floor((Math.random() * 15 + 5) * (rawPower1 / rawPower2)));

                // Artillery Penalty if not neighbors (only affects dmg when not air or naval specialized scenario)
                if (!artilleryEnabled && scenario !== "AIR_SUPERIORITY" && scenario !== "NAVAL_BLOCKADE") {
                    dmg1 = Math.floor(dmg1 * 0.85); // 15% penalty
                    dmg2 = Math.floor(dmg2 * 0.85);
                }

                // Tactic Triggers & Multipliers
                let mult1 = 1.0;
                let mult2 = 1.0;

                const SCENARIO_EVENTS: Record<ScenarioType, string[]> = {
                    "TOTAL_WAR": [
                        "launches continuous artillery barrage",
                        "executes precision air strikes",
                        "deploys special forces behind enemy lines",
                        "advances armored divisions",
                        "disrupts supply lines with cyber attacks",
                        "engages in intense urban warfare"
                    ],
                    "NAVAL_BLOCKADE": [
                        "fires anti-ship cruise missiles",
                        "deploys hunter-killer submarines",
                        "intercepts merchant shipping",
                        "launches carrier-based sorties",
                        "bombards coastal fortifications",
                        "executes amphibious harassment raids"
                    ],
                    "AIR_SUPERIORITY": [
                        "scrambles interceptor squadrons",
                        "destroys enemy radar sites (SEAD)",
                        "conducts high-altitude tactical bombing",
                        "deploys loitering munitions (drones)",
                        "engages in dogfights over contested airspace",
                        "strikes strategic airfields"
                    ],
                    "BORDER_SKIRMISH": [
                        "exchanges mortar fire across the border",
                        "snipers engage enemy patrol units",
                        "conducts limited recon-in-force",
                        "claims disputed hilltops",
                        "sabotages border checkpoints",
                        "repels enemy border infiltration"
                    ]
                };
                // Filter Events if Artillery Disabled
                let events = [...SCENARIO_EVENTS[scenario]];
                if (!artilleryEnabled) {
                    events = events.filter(e =>
                        !e.includes("artillery") &&
                        !e.includes("mortar") &&
                        !e.includes("howitzer")
                    );
                }

                // Fetch Tactics (New System)
                const p1Tactics = ALL_TACTICS.filter(t => t.personality === p1Type && t.scenario === scenario);
                const p2Tactics = ALL_TACTICS.filter(t => t.personality === p2Type && t.scenario === scenario);

                const executeTactic = (user: CountryData, pool: Tactic[], enemyPool: Tactic[], isP1: boolean) => {
                    // 12% chance to trigger a tactic per tick
                    if (pool.length > 0 && Math.random() < 0.12) {
                        const tactic = pool[Math.floor(Math.random() * pool.length)];
                        addLog(`${user.name} initiates [${tactic.name}]: ${tactic.description}`, "info", user.name);

                        if (isP1) setTactic1(tactic.name);
                        else setTactic2(tactic.name);

                        let bonusApplied = true;

                        // Counter-Tactic Check (25% chance if enemy has tactics available)
                        if (enemyPool.length > 0 && Math.random() < 0.25) {
                            const counter = enemyPool[Math.floor(Math.random() * enemyPool.length)];
                            addLog(`COUNTER! ${isP1 ? country2.name : country1.name} responds with [${counter.name}]!`, "critical");

                            // Show the counter tactic on the defender's side
                            if (isP1) setTactic2(counter.name);
                            else setTactic1(counter.name);

                            bonusApplied = false; // Counter negates the bonus
                        }

                        if (bonusApplied) {
                            if (isP1) mult1 *= 1.25;
                            else mult2 *= 1.25;
                        }
                    }
                };

                executeTactic(country1, p1Tactics, p2Tactics, true);
                executeTactic(country2, p2Tactics, p1Tactics, false);

                // Apply Multipliers
                // Personality Multipliers Applied Here
                // dmg1 is damage dealt BY Player 1 TO Player 2
                // So dmg1 = Base * p1DmgMult * (1 / p2DefMult)? No, easier to just multiplier.
                // If P2 is Defensive, they take 0.85x damage. So dmg1 *= 0.85

                dmg1 = Math.floor(dmg1 * mult1 * p1DmgMult * p2DefMult);
                dmg2 = Math.floor(dmg2 * mult2 * p2DmgMult * p1DefMult);

                // Critical Hits
                if (Math.random() < critChance2) dmg1 = Math.floor(dmg1 * 1.5);
                if (Math.random() < critChance1) dmg2 = Math.floor(dmg2 * 1.5);

                // Apply Damage
                activeHp1 = Math.max(0, activeHp1 - dmg1);
                activeHp2 = Math.max(0, activeHp2 - dmg2);

                console.log(`Round ${round}: P1(${activeHp1}) -${dmg1}, P2(${activeHp2}) -${dmg2}`);

                // Check for Death
                if (activeHp1 <= 0 || activeHp2 <= 0) {
                    // Next loop tick handles victory logic
                    setHp1(activeHp1);
                    setHp2(activeHp2);
                    return;
                }

                // Flavor Text
                if (Math.random() > 0.5) {
                    addLog(`${country1.name} ${events[Math.floor(Math.random() * events.length)]}`, "damage", country1.name);
                    addLog(`${country2.name} sustains damage! (-${dmg2.toFixed(0)} HP)`, "critical");
                } else {
                    addLog(`${country2.name} ${events[Math.floor(Math.random() * events.length)]}`, "damage", country2.name);
                    addLog(`${country1.name} defenses breached! (-${dmg1.toFixed(0)} HP)`, "critical");
                }

                // UI Update
                setHp1(activeHp1);
                setHp2(activeHp2);
                round++;

            } catch (error) {
                console.error("Simulation Loop Error:", error);
                addLog(`⚠️ SIMULATION ERROR: ${(error as Error).message}`, "critical");
                setIsSimulating(false);
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        }, 1500);
    };

    return (
        <>
            <main className="min-h-screen bg-slate-950 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-widest flex justify-center items-center gap-4">
                            <Crosshair className="w-10 h-10 text-red-500" />
                            Combat Simulation
                            <Crosshair className="w-10 h-10 text-red-500" />
                        </h1>
                        <p className="text-slate-500 font-mono">WARGAMES // A.I. PREDICTION ENGINE</p>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                        {/* Player 1 */}
                        <div className="lg:col-span-4 bg-slate-900/50 border border-blue-500/30 p-6 rounded-xl">
                            <div className="text-blue-500 font-bold mb-4 flex items-center justify-between">
                                <span className="flex items-center gap-2"><Shield className="w-5 h-5" /> BLUE FORCE</span>
                                {country1 && (
                                    <span className={`text-xs px-2 py-1 rounded bg-slate-800 border ${PERSONALITY_INFO[getPersonality(country1.id)].color} flex items-center gap-1`}>
                                        {React.createElement(PERSONALITY_INFO[getPersonality(country1.id)].icon, { className: "w-3 h-3" })}
                                        {PERSONALITY_INFO[getPersonality(country1.id)].label}
                                    </span>
                                )}
                            </div>
                            {tactic1 && (
                                <div className="mb-4 text-xs font-mono text-amber-400 bg-amber-900/30 px-3 py-2 rounded border border-amber-500/50 flex items-center justify-between animate-pulse">
                                    <span className="font-bold">TACTIC ACTIVE</span>
                                    <span>{tactic1}</span>
                                </div>
                            )}
                            <select
                                className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded mb-4"
                                value={country1Id}
                                onChange={e => setCountry1Id(e.target.value)}
                                disabled={isSimulating}
                            >
                                <option value="">Select Country</option>
                                {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            {country1 && (
                                <div className="text-center">
                                    <img src={country1.flagUrl} className="w-24 h-16 object-cover mx-auto mb-2 rounded shadow-lg border border-slate-700" />
                                    <div className="text-3xl font-bold">{Math.round(hp1)}%</div>
                                    <div className="w-full bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 transition-all duration-500"
                                            style={{ width: `${hp1}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Middle Settings */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4">
                            <div className="w-full">
                                <label className="text-slate-400 text-xs uppercase font-bold mb-2 block">Scenario Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(Object.keys(SCENARIOS) as ScenarioType[]).map(key => (
                                        <button
                                            key={key}
                                            onClick={() => setScenario(key)}
                                            disabled={isSimulating}
                                            className={`p-2 text-xs border rounded transition-colors ${scenario === key
                                                ? "bg-amber-500 text-black border-amber-500 font-bold"
                                                : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500"
                                                }`}
                                        >
                                            {SCENARIOS[key].label}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-slate-500 text-xs mt-2 text-center h-8">
                                    {SCENARIOS[scenario].desc}
                                </p>
                            </div>

                            {!isSimulating && !winner && (
                                <button
                                    onClick={runSimulation}
                                    disabled={!country1 || !country2 || country1.id === country2.id}
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black text-xl rounded shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 uppercase tracking-tight"
                                    title={country1?.id === country2?.id ? "Cannot simulate the same country" : ""}
                                >
                                    <Swords className="w-6 h-6" />
                                    {country1?.id === country2?.id ? "Select Different Countries" : "Engage"}
                                </button>
                            )}

                            {isSimulating && (
                                <div className="text-amber-500 animate-pulse font-bold tracking-widest flex items-center gap-2">
                                    SIMULATION IN PROGRESS...
                                </div>
                            )}

                            {winner && (
                                <button
                                    onClick={resetSimulation}
                                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-black text-xl rounded shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 uppercase tracking-tight animate-bounce"
                                >
                                    <Trophy className="w-6 h-6" />
                                    Play Again
                                </button>
                            )}
                        </div>

                        {/* Player 2 */}
                        <div className="lg:col-span-4 bg-slate-900/50 border border-red-500/30 p-6 rounded-xl">
                            <div className="text-red-500 font-bold mb-4 flex items-center justify-between">
                                {country2 && (
                                    <span className={`text-xs px-2 py-1 rounded bg-slate-800 border ${PERSONALITY_INFO[getPersonality(country2.id)].color} flex items-center gap-1`}>
                                        {React.createElement(PERSONALITY_INFO[getPersonality(country2.id)].icon, { className: "w-3 h-3" })}
                                        {PERSONALITY_INFO[getPersonality(country2.id)].label}
                                    </span>
                                )}
                                <span className="flex items-center gap-2">RED FORCE <Shield className="w-5 h-5" /></span>
                            </div>
                            {tactic2 && (
                                <div className="mb-4 text-xs font-mono text-amber-400 bg-amber-900/30 px-3 py-2 rounded border border-amber-500/50 flex items-center justify-between animate-pulse">
                                    <span className="font-bold">TACTIC ACTIVE</span>
                                    <span>{tactic2}</span>
                                </div>
                            )}
                            <select
                                className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded mb-4"
                                value={country2Id}
                                onChange={e => setCountry2Id(e.target.value)}
                                disabled={isSimulating}
                            >
                                <option value="">Select Country</option>
                                {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            {country2 && (
                                <div className="text-center">
                                    <img src={country2.flagUrl} className="w-24 h-16 object-cover mx-auto mb-2 rounded shadow-lg border border-slate-700" />
                                    <div className="text-3xl font-bold">{Math.round(hp2)}%</div>
                                    <div className="w-full bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 transition-all duration-500"
                                            style={{ width: `${hp2}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Nuclear Option Toggle */}
                    {canUseNuclear && (
                        <div className="flex items-center justify-between bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <Skull className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-red-200 font-medium">Nuclear Option</h3>
                                    <p className="text-red-400/60 text-xs">Authorize nuclear arsenal usage</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setUseNuclear(!useNuclear)}
                                className={`
                                    relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out
                                    ${useNuclear ? 'bg-red-600' : 'bg-slate-700'}
                                `}
                            >
                                <span
                                    className={`
                                        absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out
                                        ${useNuclear ? 'translate-x-6' : 'translate-x-0'}
                                    `}
                                />
                            </button>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div className="mt-8 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 text-red-400 font-bold mb-2">
                            <AlertTriangle className="w-5 h-5" />
                            <span>SIMULATION DISCLAIMER</span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-3xl mx-auto">
                            This simulation is for entertainment and educational purposes only. The results are generated based on approximate military data and simplified algorithms. It does not reflect real-world geopolitical complexities, logistics, or morale. Please do not use this for real-world strategic planning.
                            <br className="my-2" />
                            본 시뮬레이션은 단순화된 수치와 확률에 기반한 가상 결과입니다. 실제 현대전의 복잡성(보급, 사기, 전술 등)을 완벽히 반영하지 않으므로, 결과는 재미로만 봐주시기 바랍니다.
                        </p>
                    </div>

                    {/* Battle Log */}
                    <div className="bg-black border border-slate-800 rounded-lg p-6 font-mono text-sm h-96 overflow-y-auto shadow-inner relative">
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

                        {battleLogs.length === 0 && (
                            <div className="text-slate-600 text-center mt-32">Initialize parameters to begin simulation...</div>
                        )}

                        <div className="space-y-2 relative z-0">
                            {battleLogs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex gap-4 ${log.type === "victory" ? "text-amber-400 font-bold text-lg border-y border-amber-900 py-2 my-4" :
                                        log.type === "critical" ? "text-red-400" :
                                            log.type === "damage" ? "text-white" : "text-slate-400"
                                        }`}
                                >
                                    <span className="text-slate-600">[{log.timestamp}]</span>
                                    <span>{log.message}</span>
                                </motion.div>
                            ))}
                            <div id="log-end" />
                        </div>
                    </div>

                </div>
            </main >

        </>
    );
}

export default function SimulationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <SimulationPageContent />
        </Suspense>
    );
}
