"use client";

import { useState, useRef, useEffect } from "react";
import { Search, TrendingUp, Globe, Crosshair } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockCountries, getRelatedCountries } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/AuthButton";

const TRENDING_SEARCHES = ["USA", "Ukraine", "Korea", "Russia", "China"];

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
                setIsSearchFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCountries = mockCountries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCountryClick = (countryId: string) => {
        router.push(`/country/${countryId}`);
        setShowDropdown(false);
        setSearchQuery("");
    };

    const handleTrendingClick = (trending: string) => {
        const country = mockCountries.find((c) =>
            c.name.toLowerCase().includes(trending.toLowerCase())
        );
        if (country) {
            handleCountryClick(country.id);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => router.push("/")}
                    >
                        <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 rounded-xl border border-slate-700 shadow-lg overflow-hidden group-hover:border-blue-500/50 transition-colors duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-colors" />
                            <Globe className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors relative z-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Crosshair className="w-8 h-8 text-slate-600/50 group-hover:text-blue-500/30 rotate-45 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 leading-none">
                                <span className="text-slate-100 font-bold text-lg tracking-tight group-hover:text-white transition-colors">
                                    GLOBAL
                                </span>
                                <span className="text-blue-500 font-bold text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                                    MILITARY
                                </span>
                            </div>
                            <span className="text-slate-500 text-[10px] font-medium tracking-widest uppercase group-hover:text-slate-400 transition-colors">
                                Intelligence Platform
                            </span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl mx-4" ref={searchRef}>
                        <div className="relative">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search Country..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => {
                                        setIsSearchFocused(true);
                                        setShowDropdown(true);
                                    }}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Dropdown */}
                            {showDropdown && (
                                <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
                                    {/* Trending Searches (when not typing) */}
                                    {searchQuery === "" && (
                                        <div className="p-3">
                                            <div className="flex items-center gap-2 mb-2 text-slate-400 text-sm">
                                                <TrendingUp className="w-4 h-4" />
                                                <span>Trending Searches</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {TRENDING_SEARCHES.map((trending) => (
                                                    <button
                                                        key={trending}
                                                        onClick={() => handleTrendingClick(trending)}
                                                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-sm transition-colors"
                                                    >
                                                        #{trending}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Filtered Results */}
                                    {searchQuery !== "" && (
                                        <div className="max-h-96 overflow-y-auto">
                                            {filteredCountries.length > 0 ? (
                                                filteredCountries.map((country) => {
                                                    const related = getRelatedCountries(country);
                                                    return (
                                                        <div key={country.id} className="border-b border-slate-800 last:border-0">
                                                            {/* Main Country */}
                                                            <button
                                                                onClick={() => handleCountryClick(country.id)}
                                                                className="w-full px-4 py-3 hover:bg-slate-800 transition-colors text-left"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <img
                                                                        src={country.flagUrl}
                                                                        alt={country.name}
                                                                        className="w-8 h-6 object-cover rounded"
                                                                    />
                                                                    <div className="flex-1">
                                                                        <div className="text-slate-100 font-medium">
                                                                            {country.name}
                                                                        </div>
                                                                        <div className="text-slate-400 text-sm">
                                                                            Rank #{country.rank} • Power Index:{" "}
                                                                            {country.powerIndex.toFixed(4)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </button>

                                                            {/* Related Countries */}
                                                            {(related.allies.length > 0 ||
                                                                related.threats.length > 0) && (
                                                                    <div className="px-4 pb-3 bg-slate-900/50">
                                                                        <div className="text-slate-500 text-xs mb-2">
                                                                            Militarily Related:
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            {related.allies.slice(0, 2).map((ally) => (
                                                                                <button
                                                                                    key={ally.id}
                                                                                    onClick={() => handleCountryClick(ally.id)}
                                                                                    className="w-full flex items-center gap-2 px-2 py-1 hover:bg-slate-800 rounded text-left"
                                                                                >
                                                                                    <img
                                                                                        src={ally.flagUrl}
                                                                                        alt={ally.name}
                                                                                        className="w-5 h-4 object-cover rounded"
                                                                                    />
                                                                                    <span className="text-slate-300 text-sm">
                                                                                        {ally.name}
                                                                                    </span>
                                                                                    <span className="text-green-500 text-xs ml-auto">
                                                                                        Ally
                                                                                    </span>
                                                                                </button>
                                                                            ))}
                                                                            {related.threats.slice(0, 2).map((threat) => (
                                                                                <button
                                                                                    key={threat.id}
                                                                                    onClick={() =>
                                                                                        handleCountryClick(threat.id)
                                                                                    }
                                                                                    className="w-full flex items-center gap-2 px-2 py-1 hover:bg-slate-800 rounded text-left"
                                                                                >
                                                                                    <img
                                                                                        src={threat.flagUrl}
                                                                                        alt={threat.name}
                                                                                        className="w-5 h-4 object-cover rounded"
                                                                                    />
                                                                                    <span className="text-slate-300 text-sm">
                                                                                        {threat.name}
                                                                                    </span>
                                                                                    <span className="text-red-500 text-xs ml-auto">
                                                                                        Threat
                                                                                    </span>
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="px-4 py-8 text-center text-slate-500">
                                                    No countries found
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/rankings")}
                            className="text-slate-300 hover:text-slate-100 transition-colors text-sm font-medium"
                        >
                            Rankings
                        </button>
                        <button
                            onClick={() => router.push("/compare")}
                            className="text-slate-300 hover:text-slate-100 transition-colors text-sm font-medium"
                        >
                            Compare
                        </button>
                        <button
                            onClick={() => router.push("/simulation")}
                            className="text-slate-300 hover:text-slate-100 transition-colors text-sm font-medium"
                        >
                            Simulation
                        </button>
                        <div className="w-px h-6 bg-slate-800 mx-2" />
                        <AuthButton />
                    </div>
                </div>
            </div>
        </header>
    );
}
