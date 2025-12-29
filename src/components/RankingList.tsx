"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, ChevronRight, Shield } from "lucide-react";
import { allCountriesRanking } from "@/lib/rankingData";
import Link from "next/link";

interface RankingListProps {
    onSelectCountry?: (id: string) => void;
    selectedId?: string;
}

export default function RankingList({ onSelectCountry, selectedId }: RankingListProps) {
    const router = useRouter();
    // Sort by rank (strongest first) and take top 15
    const topCountries = allCountriesRanking.slice(0, 15);

    const getRankBadgeStyle = (rank: number) => {
        if (rank === 1) return "bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-950 shadow-yellow-500/20";
        if (rank === 2) return "bg-gradient-to-br from-slate-300 to-slate-500 text-slate-900 shadow-slate-500/20";
        if (rank === 3) return "bg-gradient-to-br from-orange-300 to-orange-600 text-orange-950 shadow-orange-500/20";
        return "bg-slate-800 text-slate-400 border border-slate-700";
    };

    return (
        <div className="bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-800/60 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800/60 bg-slate-900/40">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                <Trophy className="w-6 h-6 text-amber-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                                Global Military Rankings
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm mt-2 ml-1">
                            Top 15 countries by military power index
                        </p>
                    </div>
                    <Link href="/rankings">
                        <motion.button
                            className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 font-medium text-sm hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View All
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </div>
            </div>

            <div className="divide-y divide-slate-800/60">
                {topCountries.map((country, index) => {
                    const isSelected = selectedId === country.id;
                    return (
                        <motion.button
                            key={country.id}
                            onClick={() => {
                                if (onSelectCountry) {
                                    onSelectCountry(country.id);
                                } else {
                                    router.push(`/country/${country.id.toLowerCase()}`);
                                }
                            }}
                            className={`w-full px-6 py-5 transition-all text-left group relative overflow-hidden ${isSelected
                                ? "bg-slate-800/80 border-l-4 border-blue-500"
                                : "hover:bg-slate-800/40 border-l-4 border-transparent"
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {/* Hover Highlight */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="flex items-center gap-5 relative z-10">
                                {/* Rank Badge */}
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg ${getRankBadgeStyle(country.rank)}`}
                                >
                                    {country.rank}
                                </div>

                                {/* Flag */}
                                <div className="relative">
                                    <img
                                        src={country.flagUrl}
                                        alt={country.name}
                                        className="w-14 h-10 object-cover rounded shadow-md ring-1 ring-slate-700/50"
                                    />
                                    <div className="absolute inset-0 rounded ring-1 ring-inset ring-black/10" />
                                </div>

                                {/* Country Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-slate-100 font-bold text-lg group-hover:text-blue-400 transition-colors tracking-tight">
                                            {country.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1.5 text-sm text-slate-500 font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            Index: <span className="text-slate-400">{country.powerIndex.toFixed(4)}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Trend Indicator */}
                                <div className="flex-shrink-0 pl-4 border-l border-slate-800/60">
                                    {country.rank <= 3 ? (
                                        <div className="flex flex-col items-end gap-0.5">
                                            <div className="flex items-center gap-1 text-green-500">
                                                <TrendingUp className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Dominant</span>
                                            </div>
                                        </div>
                                    ) : country.rank <= 10 ? (
                                        <div className="flex flex-col items-end gap-0.5">
                                            <div className="flex items-center gap-1 text-blue-500">
                                                <TrendingUp className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Elite</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-end gap-0.5">
                                            <div className="flex items-center gap-1 text-slate-500">
                                                <TrendingDown className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Stable</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
