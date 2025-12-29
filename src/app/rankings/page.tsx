"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, TrendingUp, Shield, ArrowUpDown } from "lucide-react";
import { allCountriesRanking } from "@/lib/rankingData";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

type SortOption = "rank" | "name-asc" | "name-desc" | "power-asc" | "power-desc";

export default function RankingsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("rank");

    const filteredAndSortedCountries = useMemo(() => {
        // First filter
        let countries = allCountriesRanking.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Then sort
        switch (sortBy) {
            case "rank":
                return countries.sort((a, b) => a.rank - b.rank);
            case "name-asc":
                return countries.sort((a, b) => a.name.localeCompare(b.name));
            case "name-desc":
                return countries.sort((a, b) => b.name.localeCompare(a.name));
            case "power-asc":
                return countries.sort((a, b) => a.powerIndex - b.powerIndex);
            case "power-desc":
                return countries.sort((a, b) => b.powerIndex - a.powerIndex);
            default:
                return countries;
        }
    }, [searchTerm, sortBy]);

    return (
        <>
            <main className="min-h-screen bg-slate-950 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-400 blur-2xl opacity-20"></div>
                                <Trophy className="relative w-16 h-16 text-yellow-500" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-100 mb-4 font-oswald tracking-wide">
                            2025 GLOBAL MILITARY RANKINGS
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Complete list of 145 countries ranked by military strength.
                            Lower PowerIndex (PwrIndx) score indicates greater power.
                        </p>
                    </motion.div>

                    {/* Search and Sort Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-4xl mx-auto mb-12"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search country..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-full pl-12 pr-6 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
                                />
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="appearance-none bg-slate-900/50 border border-slate-700 rounded-full pl-12 pr-10 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all cursor-pointer min-w-[200px]"
                                >
                                    <option value="rank">Sort by Rank</option>
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="power-asc">Power Index (Low-High)</option>
                                    <option value="power-desc">Power Index (High-Low)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rankings Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left table-fixed">
                                <thead>
                                    <tr className="bg-slate-950/50 border-b border-slate-800">
                                        <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider w-24 text-center">Rank</th>
                                        <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">Country</th>
                                        <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider w-40 text-right">Power Index</th>
                                        <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider w-32 text-right">Trend</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {filteredAndSortedCountries.map((country, index) => (
                                        <tr
                                            key={country.id}
                                            onClick={() => router.push(`/country/${country.id.toLowerCase()}`)}
                                            className="hover:bg-slate-800/50 transition-colors group cursor-pointer border-b border-slate-800/50"
                                        >
                                            <td className="px-6 py-4 text-center w-24">
                                                <span className={`
                                                    inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                                                    ${country.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                                                        country.rank === 2 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/30' :
                                                            country.rank === 3 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/30' :
                                                                'text-slate-500 bg-slate-900 border border-slate-800'}
                                                `}>
                                                    {country.rank}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={country.flagUrl}
                                                        alt={country.name}
                                                        className="w-10 h-7 object-cover rounded shadow-sm border border-slate-700"
                                                    />
                                                    <div>
                                                        <div className="text-slate-200 font-semibold group-hover:text-yellow-500 transition-colors">
                                                            {country.name}
                                                        </div>
                                                        <div className="text-slate-500 text-xs font-mono">
                                                            {country.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right w-40">
                                                <div className="font-mono text-slate-300">
                                                    {country.powerIndex.toFixed(4)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right w-32">
                                                <div className="flex items-center justify-end gap-2 text-slate-500 text-sm group-hover:text-blue-400 transition-colors">
                                                    <Shield className="w-4 h-4" />
                                                    <span>View</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredAndSortedCountries.length === 0 && (
                            <div className="p-12 text-center text-slate-500">
                                No countries found matching "{searchTerm}"
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

        </>
    );
}
