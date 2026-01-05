import React, { useState } from 'react';
import { CountryData } from '@/lib/mockData';
import { Plus, X, Search, Shield } from 'lucide-react';
import { PERSONALITY_INFO, getPersonality } from '@/lib/tacticsData';

interface TeamBuilderProps {
    teamName: string;
    teamColor: string; // "blue" or "red"
    countries: CountryData[]; // All available countries
    selectedCountries: CountryData[];
    onAdd: (country: CountryData) => void;
    onRemove: (countryId: string) => void;
    disabled: boolean;
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({
    teamName,
    teamColor,
    countries,
    selectedCountries,
    onAdd,
    onRemove,
    disabled
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedCountries.find(sc => sc.id === c.id)
    );

    const borderColor = teamColor === "blue" ? "border-blue-500" : "border-red-500";
    const bgColor = teamColor === "blue" ? "bg-blue-900/20" : "bg-red-900/20";
    const textColor = teamColor === "blue" ? "text-blue-500" : "text-red-500";

    return (
        <div className={`p-4 rounded-xl border ${borderColor} ${bgColor} relative min-h-[300px]`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className={`font-black text-xl uppercase flex items-center gap-2 ${textColor}`}>
                    <Shield className="w-5 h-5" />
                    {teamName}
                    <span className="text-sm bg-slate-800 px-2 py-1 rounded text-white ml-2">
                        {selectedCountries.length}/10
                    </span>
                </h3>
            </div>

            {/* Selected Countries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {selectedCountries.map(country => (
                    <div key={country.id} className="flex items-center justify-between bg-slate-800 p-2 rounded border border-slate-700 animate-fadeIn">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <img src={country.flagUrl} className="w-8 h-6 object-cover rounded" alt={country.name} />
                            <div className="leading-tight">
                                <span className="font-bold text-sm block truncate text-slate-200">{country.name}</span>
                                <span className={`text-[10px] uppercase font-bold ${PERSONALITY_INFO[getPersonality(country.id)].color}`}>
                                    {PERSONALITY_INFO[getPersonality(country.id)].label}
                                </span>
                            </div>
                        </div>
                        {!disabled && (
                            <button
                                onClick={() => onRemove(country.id)}
                                className="p-1 hover:bg-red-500/20 rounded text-slate-500 hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Button / Search Input */}
            {!disabled && selectedCountries.length < 10 && (
                <div className="relative">
                    {!isSearching ? (
                        <button
                            onClick={() => setIsSearching(true)}
                            className={`w-full py-2 border-2 border-dashed border-slate-700 rounded text-slate-500 font-bold hover:border-slate-500 hover:text-slate-300 transition-all flex items-center justify-center gap-2`}
                        >
                            <Plus className="w-4 h-4" /> ADD COUNTRY
                        </button>
                    ) : (
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 absolute top-0 left-0 right-0 z-20 shadow-xl">
                            <div className="flex items-center gap-2 bg-slate-800 p-2 rounded mb-2">
                                <Search className="w-4 h-4 text-slate-500" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search country..."
                                    className="bg-transparent text-white w-full outline-none text-sm"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                <button onClick={() => { setIsSearching(false); setSearchTerm(""); }}><X className="w-4 h-4 text-slate-500" /></button>
                            </div>
                            <div className="max-h-[200px] overflow-y-auto">
                                {filteredCountries.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => {
                                            onAdd(c);
                                            setSearchTerm("");
                                            setIsSearching(false);
                                        }}
                                        className="w-full text-left p-2 hover:bg-slate-800 rounded flex items-center gap-2 text-sm text-slate-300"
                                    >
                                        <img src={c.flagUrl} className="w-6 h-4 object-cover" />
                                        {c.name}
                                    </button>
                                ))}
                                {filteredCountries.length === 0 && (
                                    <div className="text-center text-slate-500 text-xs p-2">No countries found</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeamBuilder;
