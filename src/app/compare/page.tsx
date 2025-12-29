"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Shield, TrendingUp, TrendingDown, Minus, Search, Swords } from "lucide-react";
import { getAllCountries, getCountryById } from "@/lib/mockData";
import RadarChart from "@/components/RadarChart";
import Footer from "@/components/Footer";

function ComparePageContent() {
    const searchParams = useSearchParams();
    const targetId = searchParams.get("target");

    const countries = getAllCountries();
    const [country1Id, setCountry1Id] = useState<string>(targetId || "");
    const [country2Id, setCountry2Id] = useState<string>("");
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");

    // Filter countries based on search
    const filteredCountries1 = countries.filter(c =>
        c.name.toLowerCase().includes(search1.toLowerCase())
    );
    const filteredCountries2 = countries.filter(c =>
        c.name.toLowerCase().includes(search2.toLowerCase())
    );

    const country1 = country1Id ? getCountryById(country1Id) : null;
    const country2 = country2Id ? getCountryById(country2Id) : null;

    // Show selection prompt if no countries selected
    if (!country1 || !country2) {
        return (
            <>
                <main className="min-h-screen bg-slate-950 py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-20"></div>
                                    <Swords className="relative w-16 h-16 text-blue-400" />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold text-slate-100 mb-4">
                                Military Power Comparison
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Select two countries to compare their military capabilities
                            </p>
                        </motion.div>

                        {/* Country Selectors */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Country 1 Selector */}
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <label className="block text-slate-400 text-sm mb-2 font-semibold">
                                    Select First Country
                                </label>

                                {/* Search Input */}
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search country..."
                                        value={search1}
                                        onChange={(e) => setSearch1(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <select
                                    value={country1Id}
                                    onChange={(e) => setCountry1Id(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">-- Choose a country --</option>
                                    {filteredCountries1.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} (Rank #{c.rank})
                                        </option>
                                    ))}
                                </select>

                                {country1 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-4 flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-blue-500/30"
                                    >
                                        <img
                                            src={country1.flagUrl}
                                            alt={country1.name}
                                            className="w-16 h-12 object-cover rounded border border-slate-700"
                                        />
                                        <div>
                                            <div className="text-slate-100 font-semibold">{country1.name}</div>
                                            <div className="text-blue-400 text-sm">Rank #{country1.rank}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Country 2 Selector */}
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <label className="block text-slate-400 text-sm mb-2 font-semibold">
                                    Select Second Country
                                </label>

                                {/* Search Input */}
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search country..."
                                        value={search2}
                                        onChange={(e) => setSearch2(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <select
                                    value={country2Id}
                                    onChange={(e) => setCountry2Id(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">-- Choose a country --</option>
                                    {filteredCountries2.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} (Rank #{c.rank})
                                        </option>
                                    ))}
                                </select>

                                {country2 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-4 flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-purple-500/30"
                                    >
                                        <img
                                            src={country2.flagUrl}
                                            alt={country2.name}
                                            className="w-16 h-12 object-cover rounded border border-slate-700"
                                        />
                                        <div>
                                            <div className="text-slate-100 font-semibold">{country2.name}</div>
                                            <div className="text-purple-400 text-sm">Rank #{country2.rank}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Instruction */}
                        {(!country1 || !country2) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 text-center"
                            >
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                    <Shield className="w-5 h-5 text-slate-400" />
                                    <span className="text-slate-400">
                                        {!country1 && !country2 ? "Select both countries to begin comparison" :
                                            !country1 ? "Select the first country" :
                                                "Select the second country"}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </main>

            </>
        );
    }

    // Normalize data for radar chart (Logarithmic Scale)
    const normalize = (value: number, max: number) => {
        if (value <= 0) return 0;
        // Use Log10 to handle huge disparities (e.g. 10 vs 1000)
        // Add 1 to avoid log(0)
        const logValue = Math.log10(value + 1);
        const logMax = Math.log10(max + 1);
        return Math.min((logValue / logMax) * 100, 100);
    };

    // Calculate total scores for each branch
    const calculateArmyScore = (country: any) => {
        return (
            country.army.activePersonnel +
            country.army.reservePersonnel +
            country.army.tanks +
            country.army.afv +
            country.army.selfPropelledArtillery +
            country.army.towedArtillery +
            country.army.rocketProjectors
        );
    };

    const calculateNavyScore = (country: any) => {
        return (
            country.navy.totalShips +
            country.navy.aircraftCarriers * 100 + // Weight carriers more
            country.navy.submarines * 10 +
            country.navy.destroyers * 5 +
            country.navy.frigates * 3 +
            country.navy.corvettes * 2 +
            country.navy.patrolVessels
        );
    };

    const calculateAirforceScore = (country: any) => {
        return (
            country.airforce.totalAircraft +
            country.airforce.fighters * 2 + // Weight fighters more
            country.airforce.attackAircraft * 2 +
            country.airforce.bombers * 3 +
            country.airforce.attackHelicopters * 1.5 +
            country.airforce.helicopters +
            country.airforce.transports +
            country.airforce.trainers * 0.5
        );
    };

    // Calculate Modernization Score (1-10 based on Rank)
    // Rank 1 = 10 (Most modern), Rank 145 = 1 (Least modern)
    const calculateModernizationScore = (rank: number) => {
        // Linear interpolation: y = mx + c
        // 10 = m(1) + c
        // 1 = m(145) + c
        // m = -9/144 = -0.0625
        // c = 10.0625
        const score = 10.0625 - (0.0625 * rank);
        return Math.max(1, Math.min(10, score));
    };

    const maxBudget = 900000000000; // $900B
    const maxArmyScore = 5000000; // Adjusted for total army score
    const maxNavyScore = 5000; // Adjusted for weighted navy score
    const maxAirforceScore = 50000; // Adjusted for weighted airforce score
    const maxTanks = 15000;
    // const maxNuclear = 6000; // Removed

    const data1 = {
        country: country1.name,
        values: [
            normalize(500000000000, maxBudget),
            normalize(calculateArmyScore(country1), maxArmyScore),
            normalize(calculateAirforceScore(country1), maxAirforceScore),
            normalize(country1.army.tanks, maxTanks),
            normalize(calculateNavyScore(country1), maxNavyScore),
            calculateModernizationScore(country1.rank) * 10, // Scale 1-10 to 10-100 for chart
        ],
    };

    const data2 = {
        country: country2.name,
        values: [
            normalize(400000000000, maxBudget),
            normalize(calculateArmyScore(country2), maxArmyScore),
            normalize(calculateAirforceScore(country2), maxAirforceScore),
            normalize(country2.army.tanks, maxTanks),
            normalize(calculateNavyScore(country2), maxNavyScore),
            calculateModernizationScore(country2.rank) * 10, // Scale 1-10 to 10-100 for chart
        ],
    };

    const labels = ["Budget", "Army", "Air Force", "Tanks", "Navy", "Modernization"];

    // Calculate winner
    // Calculate winner based on Power Index (lower is better)
    const winner = country1.powerIndex < country2.powerIndex ? country1 : country2;
    const loser = winner.id === country1.id ? country2 : country1;

    return (
        <>
            <main className="min-h-screen bg-slate-950 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-bold text-slate-100 mb-4">
                            Military Power Comparison
                        </h1>
                        <p className="text-slate-400">
                            Compare military capabilities (Logarithmic Scale applied)
                        </p>
                    </motion.div>

                    {/* Country Selectors */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
                    >
                        {/* Country 1 Selector */}
                        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                            <label className="block text-slate-400 text-sm mb-2">Country 1</label>

                            {/* Search Input */}
                            <div className="relative mb-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search country..."
                                    value={search1}
                                    onChange={(e) => setSearch1(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-power-gold"
                                />
                            </div>

                            <select
                                value={country1Id}
                                onChange={(e) => setCountry1Id(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-power-gold"
                            >
                                <option value="">-- Choose a country --</option>
                                {filteredCountries1.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-4 flex items-center gap-3">
                                <img
                                    src={country1.flagUrl}
                                    alt={country1.name}
                                    className="w-16 h-12 object-cover rounded border border-slate-700"
                                />
                                <div>
                                    <div className="text-slate-100 font-semibold">{country1.name}</div>
                                    <div className="text-slate-400 text-sm">Rank #{country1.rank}</div>
                                </div>
                            </div>
                        </div>

                        {/* Country 2 Selector */}
                        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                            <label className="block text-slate-400 text-sm mb-2">Country 2</label>

                            {/* Search Input */}
                            <div className="relative mb-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search country..."
                                    value={search2}
                                    onChange={(e) => setSearch2(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-power-gold"
                                />
                            </div>

                            <select
                                value={country2Id}
                                onChange={(e) => setCountry2Id(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-power-gold"
                            >
                                <option value="">-- Choose a country --</option>
                                {filteredCountries2.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-4 flex items-center gap-3">
                                <img
                                    src={country2.flagUrl}
                                    alt={country2.name}
                                    className="w-16 h-12 object-cover rounded border border-slate-700"
                                />
                                <div>
                                    <div className="text-slate-100 font-semibold">{country2.name}</div>
                                    <div className="text-slate-400 text-sm">Rank #{country2.rank}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Radar Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8"
                    >
                        <RadarChart data1={data1} data2={data2} labels={labels} />

                        {/* Legend */}
                        <div className="flex justify-center gap-8 mt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded"></div>
                                <span className="text-slate-300">{country1.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                <span className="text-slate-300">{country2.name}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Winner Analysis */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-900 rounded-xl border border-slate-800 p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-power-gold" />
                            <h2 className="text-2xl font-bold text-slate-100">Analysis</h2>
                        </div>

                        {winner ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={winner.flagUrl}
                                        alt={winner.name}
                                        className="w-20 h-15 object-cover rounded border-2 border-power-gold"
                                    />
                                    <div>
                                        <div className="text-3xl font-bold text-power-gold mb-1">
                                            {winner.name}
                                        </div>
                                        <div className="text-slate-400">
                                            Has superior overall military capability
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                    {labels.map((label, i) => {
                                        const val1 = data1.values[i];
                                        const val2 = data2.values[i];
                                        const diff = val1 - val2;
                                        const isEqual = Math.abs(diff) < 5;

                                        return (
                                            <div
                                                key={label}
                                                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                                            >
                                                <div className="text-slate-400 text-sm mb-2">{label}</div>
                                                <div className="flex items-center gap-2">
                                                    {isEqual ? (
                                                        <>
                                                            <Minus className="w-4 h-4 text-slate-500" />
                                                            <span className="text-slate-500 font-semibold">Equal</span>
                                                        </>
                                                    ) : diff > 0 ? (
                                                        <>
                                                            <TrendingUp className="w-4 h-4 text-red-400" />
                                                            <span className="text-red-400 font-semibold">
                                                                {country1.name}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TrendingUp className="w-4 h-4 text-blue-400" />
                                                            <span className="text-blue-400 font-semibold">
                                                                {country2.name}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Minus className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                                <div className="text-2xl font-bold text-slate-300 mb-2">
                                    Evenly Matched
                                </div>
                                <div className="text-slate-400">
                                    Both countries have nearly identical military capabilities
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

        </>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <ComparePageContent />
        </Suspense>
    );
}
