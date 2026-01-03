"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    MapPin,
    Users,
    Ship,
    Plane,
    Shield,
    AlertTriangle,
    Radiation,
    ChevronDown,
    Swords,
} from "lucide-react";
import { CountryData } from "@/lib/mockData";
import { CountryDetail } from "@/lib/countryDetails";
import { getPowerColor, formatNumber } from "@/lib/utils";
import { ALL_TACTICS, Tactic, getPersonality, ScenarioType } from "@/lib/tacticsData";
import Footer from "@/components/Footer";


interface CountryDetailClientProps {
    country: CountryData | undefined;
    related: {
        allies: CountryData[];
        threats: CountryData[];
    };
    details?: CountryDetail;
    embedded?: boolean;
}

export default function CountryDetailClient({
    country,
    related,
    details,
    embedded = false,
}: CountryDetailClientProps) {
    // If no country data from mockData, bail out 
    if (!country) {
        return (
            <div className={`${embedded ? 'h-full' : 'min-h-screen'} bg-slate-950 flex items-center justify-center`}>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-100 mb-4">Select a Country</h1>
                    <p className="text-slate-400">Choose a country from the list to view details.</p>
                </div>
            </div>
        );
    }
    // Sort relations by rank (ascending) as requested
    const sortedAllies = [...related.allies].sort((a, b) => a.rank - b.rank);
    const sortedThreats = [...related.threats].sort((a, b) => a.rank - b.rank);

    return (
        <>
            <main className={`${embedded ? '' : 'min-h-screen'} bg-slate-950`}>
                <div className={`${embedded ? 'px-0 py-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
                    {/* Header Zone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-8"
                    >
                        <div className="relative h-80 bg-slate-900">



                            {/* Country Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6">
                                <div className="flex items-end gap-4">
                                    <img
                                        src={country.flagUrl}
                                        alt={country.name}
                                        className="w-24 h-18 object-cover rounded-lg shadow-2xl border-2 border-slate-700"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h1 className="text-4xl font-bold text-slate-100">
                                                {country.name}
                                            </h1>
                                            {country.nuclear.hasNuclear && (
                                                <div className="group relative">
                                                    <div className="px-3 py-1.5 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-red-500/30 transition-colors">
                                                        <Radiation className="w-5 h-5 text-red-400" />
                                                        <span className="text-red-400 font-medium text-sm">
                                                            Nuclear Power
                                                        </span>
                                                    </div>
                                                    {/* Nuclear Tooltip */}
                                                    <div className="absolute top-full mt-2 left-0 w-64 bg-slate-800 border border-slate-700 rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-2xl">
                                                        <div className="text-slate-300 text-sm space-y-2">
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-400">
                                                                    Total Stockpile:
                                                                </span>
                                                                <span className="font-semibold">
                                                                    {formatNumber(country.nuclear.stockpile)}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-400">Deployed:</span>
                                                                <span className="font-semibold">
                                                                    {formatNumber(country.nuclear.deployed)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-6 text-slate-300">
                                            <div
                                                className="px-4 py-2 rounded-lg font-bold text-lg"
                                                style={{
                                                    backgroundColor: getPowerColor(country.rank) + "20",
                                                    color: getPowerColor(country.rank),
                                                    border: `2px solid ${getPowerColor(country.rank)}40`,
                                                }}
                                            >
                                                Rank #{country.rank}
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-slate-400">Power Index:</span>{" "}
                                                <span className="font-semibold">
                                                    {country.powerIndex.toFixed(4)}
                                                </span>
                                            </div>
                                            <Link
                                                href={`/simulation?init=${country.id}`}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/50 rounded-lg transition-all font-semibold text-sm group"
                                            >
                                                <Swords className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                Simulate Combat
                                            </Link>
                                            <Link href={`/compare?target=${country.id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-power-gold/20 border border-power-gold/40 rounded-lg text-power-gold font-semibold text-sm hover:bg-power-gold/30 transition-colors"
                                                >
                                                    <Shield className="w-4 h-4" />
                                                    Compare Countries
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Country Info from Wikipedia */}
                    {details && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                {details.capital && details.capital !== "Unknown" && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-slate-400 text-sm">Capital</div>
                                            <div className="text-slate-100 font-semibold">{details.capital}</div>
                                        </div>
                                    </div>
                                )}
                                {details.population && details.population !== "Unknown" && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-slate-400 text-sm">Population</div>
                                            <div className="text-slate-100 font-semibold">{details.population}</div>
                                        </div>
                                    </div>
                                )}
                                {details.gdp && details.gdp !== "Unknown" && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-slate-400 text-sm">GDP</div>
                                            <div className="text-slate-100 font-semibold" dangerouslySetInnerHTML={{ __html: details.gdp }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Military Stats Zone */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Army Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                        >
                            <div className="w-full p-6 flex items-center justify-between border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <Users className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-slate-100">Army</h3>
                                        <p className="text-slate-400 text-sm">Ground Forces</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <StatRow
                                    label="Active Personnel"
                                    value={formatNumber(country.army.activePersonnel)}
                                    rawValue={country.army.activePersonnel}
                                />
                                <StatRow
                                    label="Reserve Personnel"
                                    value={formatNumber(country.army.reservePersonnel)}
                                    rawValue={country.army.reservePersonnel}
                                />
                                <StatRow
                                    label="Tanks"
                                    value={formatNumber(country.army.tanks)}
                                    rawValue={country.army.tanks}
                                />
                                <StatRow
                                    label="Armored Vehicles"
                                    value={formatNumber(country.army.afv)}
                                    rawValue={country.army.afv}
                                />
                                <StatRow
                                    label="Self-Propelled Artillery"
                                    value={formatNumber(country.army.selfPropelledArtillery)}
                                    rawValue={country.army.selfPropelledArtillery}
                                />
                                <StatRow
                                    label="Towed Artillery"
                                    value={formatNumber(country.army.towedArtillery)}
                                    rawValue={country.army.towedArtillery}
                                />
                                <StatRow
                                    label="Rocket Projectors"
                                    value={formatNumber(country.army.rocketProjectors)}
                                    rawValue={country.army.rocketProjectors}
                                />
                            </div>
                        </motion.div>

                        {/* Navy Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                        >
                            <div className="w-full p-6 flex items-center justify-between border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <Ship className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-slate-100">Navy</h3>
                                        <p className="text-slate-400 text-sm">Naval Forces</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <StatRow
                                    label="Total Ships"
                                    value={formatNumber(country.navy.totalShips)}
                                    rawValue={country.navy.totalShips}
                                />
                                <StatRow
                                    label="Aircraft Carriers"
                                    value={formatNumber(country.navy.aircraftCarriers)}
                                    rawValue={country.navy.aircraftCarriers}
                                />
                                <StatRow
                                    label="Submarines"
                                    value={formatNumber(country.navy.submarines)}
                                    rawValue={country.navy.submarines}
                                />
                                <StatRow
                                    label="Destroyers"
                                    value={formatNumber(country.navy.destroyers)}
                                    rawValue={country.navy.destroyers}
                                />
                                <StatRow
                                    label="Frigates"
                                    value={formatNumber(country.navy.frigates)}
                                    rawValue={country.navy.frigates}
                                />
                                <StatRow
                                    label="Corvettes"
                                    value={formatNumber(country.navy.corvettes)}
                                    rawValue={country.navy.corvettes}
                                />
                                <StatRow
                                    label="Patrol Vessels"
                                    value={formatNumber(country.navy.patrolVessels)}
                                    rawValue={country.navy.patrolVessels}
                                />
                            </div>
                        </motion.div>

                        {/* Air Force Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                        >
                            <div className="w-full p-6 flex items-center justify-between border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <Plane className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-slate-100">Air Force</h3>
                                        <p className="text-slate-400 text-sm">Aerial Forces</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <StatRow
                                    label="Total Aircraft"
                                    value={formatNumber(country.airforce.totalAircraft)}
                                    rawValue={country.airforce.totalAircraft}
                                />
                                <StatRow
                                    label="Fighters"
                                    value={formatNumber(country.airforce.fighters)}
                                    rawValue={country.airforce.fighters}
                                />
                                <StatRow
                                    label="Bombers"
                                    value={formatNumber(country.airforce.bombers)}
                                    rawValue={country.airforce.bombers}
                                />
                                <StatRow
                                    label="Attack Helicopters"
                                    value={formatNumber(country.airforce.attackHelicopters)}
                                    rawValue={country.airforce.attackHelicopters}
                                />
                                <StatRow
                                    label="Helicopters"
                                    value={formatNumber(country.airforce.helicopters)}
                                    rawValue={country.airforce.helicopters}
                                />
                                <StatRow
                                    label="Transport Aircraft"
                                    value={formatNumber(country.airforce.transports)}
                                    rawValue={country.airforce.transports}
                                />
                                <StatRow
                                    label="Trainers"
                                    value={formatNumber(country.airforce.trainers)}
                                    rawValue={country.airforce.trainers}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Tactics Zone */}
                    <div className="mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                        >
                            <div className="w-full p-6 flex items-center justify-between border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                                        <Swords className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-slate-100">Military Doctrine</h3>
                                        <p className="text-slate-400 text-sm">Strategic & Tactical Capabilities</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(['TOTAL_WAR', 'NAVAL_BLOCKADE', 'AIR_SUPERIORITY', 'BORDER_SKIRMISH'] as ScenarioType[]).map((scenario) => {
                                        const pType = getPersonality(country.id);
                                        const countryTactics = ALL_TACTICS.filter(t => t.personality === pType && t.scenario === scenario);

                                        if (countryTactics.length === 0) return null;

                                        return (
                                            <div key={scenario} className="space-y-3">
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700 pb-2 mb-3">
                                                    {scenario.replace(/_/g, " ")}
                                                </h4>
                                                {countryTactics.map(tactic => (
                                                    <div key={tactic.id} className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                                                        <div className="font-semibold text-slate-200 text-sm">{tactic.name}</div>
                                                        <div className="text-xs text-slate-500 mt-1">{tactic.description}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Relations Zone */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Allies */}
                        <CollapsibleRelationSection
                            title="Allies"
                            icon={<Shield className="w-5 h-5 text-green-400" />}
                            items={sortedAllies}
                        />

                        {/* Threats */}
                        <CollapsibleRelationSection
                            title="Potential Threats"
                            icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
                            items={sortedThreats}
                        />
                    </div>
                </div >
            </main >

        </>
    );
}

// Helper Component - only renders if value is meaningful
function StatRow({ label, value, rawValue }: { label: string; value: string; rawValue?: number }) {
    // Render even if value is 0
    if (value === "N/A" || !value) {
        return null;
    }

    return (
        <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">{label}</span>
            <span className="text-slate-100 font-semibold">{value}</span>
        </div>
    );
}

// Helper Component for Collapsible Relations
function CollapsibleRelationSection({ title, icon, items }: { title: string, icon: React.ReactNode, items: CountryData[] }) {
    const [expanded, setExpanded] = useState(false);
    const INITIAL_COUNT = 4;
    const hasMore = items.length > INITIAL_COUNT;
    const displayedItems = expanded ? items : items.slice(0, INITIAL_COUNT);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900 rounded-xl border border-slate-800 p-6"
        >
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="text-xl font-bold text-slate-100">{title}</h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">{items.length}</span>
            </div>

            <div className="space-y-2">
                {displayedItems.map((country) => (
                    <Link
                        key={country.id}
                        href={`/country/${country.id}`}
                        className="block p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={country.flagUrl}
                                alt={country.name}
                                className="w-8 h-6 object-cover rounded"
                            />
                            <span className="text-slate-200">{country.name}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-2 transition-colors border-t border-slate-800/50 pt-4"
                >
                    {expanded ? (
                        <>
                            Show Less <ChevronDown className="w-4 h-4 rotate-180" />
                        </>
                    ) : (
                        <>
                            Show All ({items.length}) <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}
        </motion.div>
    );
}
