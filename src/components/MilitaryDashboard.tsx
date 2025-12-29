"use client";

import { useState, useEffect } from "react";
import RankingList from "@/components/RankingList";
import CountryDetailClient from "@/app/country/[id]/CountryDetailClient";
import { getCountryById, getRelatedCountries } from "@/lib/mockData";
import { countryDetails } from "@/lib/countryDetails";
import { allCountriesRanking } from "@/lib/rankingData";
import { CountryData } from "@/lib/mockData";

export default function MilitaryDashboard() {
    const [selectedCountryId, setSelectedCountryId] = useState<string>("usa");
    const [countryData, setCountryData] = useState<CountryData | undefined>(undefined);
    const [relatedData, setRelatedData] = useState<{ allies: CountryData[], threats: CountryData[] }>({ allies: [], threats: [] });

    useEffect(() => {
        // Load data for selected country
        const data = getCountryById(selectedCountryId);
        if (data) {
            setCountryData(data);
            setRelatedData(getRelatedCountries(data));
        } else {
            // Fallback if not found in mockData (shouldn't happen with 145 countries generated)
            const rankingData = allCountriesRanking.find(c => c.id.toLowerCase() === selectedCountryId.toLowerCase());
            if (rankingData) {
                // Creating a minimal CountryData object if needed, or handle gracefull
                // For now, we expect 145 countries to be in mockData
            }
        }
    }, [selectedCountryId]);

    const details = countryDetails[selectedCountryId.toUpperCase()];

    return (
        <div className="flex h-[calc(100vh-6rem)] gap-6 overflow-hidden">
            {/* Left Sidebar: Ranking List */}
            <div className="w-1/3 min-w-[350px] overflow-y-auto pr-2 custom-scrollbar">
                <RankingList
                    onSelectCountry={setSelectedCountryId}
                    selectedId={selectedCountryId}
                />
            </div>

            {/* Right Main Panel: Country Details */}
            <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-800 overflow-y-auto custom-scrollbar relative">
                <CountryDetailClient
                    country={countryData}
                    related={relatedData}
                    details={details}
                    embedded={true}
                />
            </div>
        </div>
    );
}
