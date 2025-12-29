import { notFound } from "next/navigation";
import {
    MapPin,
    Users,
    Ship,
    Plane,
    Shield,
    AlertTriangle,
    Radiation,
} from "lucide-react";
import { getCountryById, getRelatedCountries } from "@/lib/mockData";
import { getPowerColor, formatNumber } from "@/lib/utils";
import { countryDetails } from "@/lib/countryDetails";
import { allCountriesRanking } from "@/lib/rankingData";
import CountryDetailClient from "./CountryDetailClient";

// Generate static params for all countries
export async function generateStaticParams() {
    return allCountriesRanking.map((country) => ({
        id: country.id.toLowerCase(),
    }));
}

export default async function CountryDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Try to get country from mockData first, then fallback to ranking data
    let country = getCountryById(id);

    if (!country) {
        // Try to find in allCountriesRanking
        const rankingCountry = allCountriesRanking.find(c => c.id === id);
        if (!rankingCountry) {
            notFound();
        }
        // We'll handle this case in the client
    }

    const related = country ? getRelatedCountries(country) : { allies: [], threats: [] };
    // Convert ID to uppercase to match countryDetails format
    const details = countryDetails[id.toUpperCase()];

    return <CountryDetailClient country={country} related={related} details={details} />;
}
