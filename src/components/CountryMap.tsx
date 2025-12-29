"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography as GeographyOriginal, ZoomableGroup } from "react-simple-maps";
import { X, Maximize2 } from "lucide-react";
import { getAllCountries } from "@/lib/mockData";
import { getPowerColor } from "@/lib/utils";

// Cast Geography to any to avoid missing prop types (onMouseEnter, etc.)
const Geography = GeographyOriginal as any;

// World map topojson source
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryMapProps {
    countryCode?: string;
    zoomToCountry?: boolean;
    interactive?: boolean;
}

const CountryMap: React.FC<CountryMapProps> = ({
    countryCode = "",
    zoomToCountry = false,
    interactive = true,
}) => {
    const router = useRouter();
    const countries = getAllCountries();
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Helper maps for fast lookup
    const rankMap = new Map(countries.map((c) => [c.id.toUpperCase(), c.rank]));
    const isoMap = new Map(countries.map((c) => [c.id.toUpperCase(), c.id.toLowerCase()]));

    const getCountryColor = (iso: string | undefined) => {
        if (!iso) return "#475569";
        const rank = rankMap.get(iso.toUpperCase());
        return rank ? getPowerColor(rank) : "#475569";
    };

    const handleCountryClick = (iso: string | undefined) => {
        if (!interactive || !iso) return;

        const code = isoMap.get(iso.toUpperCase());
        console.log("Interactive Click on:", iso, "->", code);

        if (code) {
            const url = `/country/${code}`;
            try {
                router.push(url);
            } catch (e) {
                console.error("Router navigation failed, using fallback:", e);
                window.location.href = url;
            }
        }
    };

    const getCountryName = (iso: string | undefined) => {
        if (!iso) return null;
        const country = countries.find((c) => c.id.toUpperCase() === iso.toUpperCase());
        return country?.name;
    };

    const MapContent = () => {
        // Track mouse down for custom click detection (bypassing sticky drag issues)
        const [mouseDownPos, setMouseDownPos] = useState<{ x: number; y: number } | null>(null);

        const handleMouseDown = (e: React.MouseEvent) => {
            setMouseDownPos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseUp = (e: React.MouseEvent, iso: string | undefined) => {
            if (!mouseDownPos || !iso) return;

            // Calculate distance
            const dx = e.clientX - mouseDownPos.x;
            const dy = e.clientY - mouseDownPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If moved less than 5 pixels, consider it a click
            if (dist < 5) {
                handleCountryClick(iso);
            }
            setMouseDownPos(null);
        };

        return (
            <div className="w-full h-full relative">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 147, center: [0, 20] }}
                    width={1000}
                    height={500}
                >
                    <ZoomableGroup center={[0, 20]} zoom={1}>
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const iso = geo.properties?.ISO_A3 || geo.id;
                                    const fill = getCountryColor(iso);
                                    const hasData = rankMap.has(iso?.toUpperCase() ?? "");
                                    const isHover = hoveredCountry === iso;
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={isHover && hasData ? "#1e40af" : fill}
                                            stroke={isHover && hasData ? "#60a5fa" : "#0f172a"}
                                            strokeWidth={isHover && hasData ? 2 : 0.5}
                                            onMouseEnter={() => {
                                                if (hasData) setHoveredCountry(iso);
                                            }}
                                            onMouseLeave={() => setHoveredCountry(null)}
                                            // Use custom mouse up/down for robust click detection
                                            onMouseDown={handleMouseDown}
                                            onMouseUp={(e: React.MouseEvent) => handleMouseUp(e, iso)}
                                            // Keep standard onClick as backup
                                            onClick={() => handleCountryClick(iso)}
                                            style={{
                                                default: { outline: "none", cursor: hasData ? "pointer" : "default" },
                                                hover: { outline: "none", cursor: hasData ? "pointer" : "default" },
                                                pressed: { outline: "none", cursor: hasData ? "pointer" : "default" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>

                {hoveredCountry && getCountryName(hoveredCountry) && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <div className="bg-slate-950/95 px-4 py-2 rounded-lg border border-blue-500/50 shadow-xl backdrop-blur-sm">
                            <div className="text-blue-400 font-semibold text-sm whitespace-nowrap">
                                {getCountryName(hoveredCountry)}
                            </div>
                            <div className="text-slate-400 text-xs mt-1">Click to view details</div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div className="w-full h-[500px] bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 relative group">
                <MapContent />
                <div className="absolute top-4 left-4 bg-slate-950/80 px-3 py-1 rounded border border-slate-800 text-xs text-slate-400 pointer-events-none z-10 hidden sm:block">
                    INTERACTIVE WORLD MAP
                </div>

                {/* Fallback Navigation Dropdown */}
                <div className="absolute top-4 left-4 sm:left-auto sm:right-16 bg-slate-950/90 rounded border border-slate-700 z-20">
                    <select
                        className="bg-transparent text-slate-300 text-xs py-1 px-2 focus:outline-none cursor-pointer"
                        onChange={(e) => {
                            if (e.target.value) handleCountryClick(isoMap.get(e.target.value.toUpperCase()));
                        }}
                        defaultValue=""
                    >
                        <option value="">Jump to Country...</option>
                        {[...rankMap.entries()].sort((a, b) => a[1] - b[1]).map(([iso, rank]) => {
                            const name = getCountryName(iso);
                            return <option key={iso} value={iso}>#{rank} {name}</option>;
                        })}
                    </select>
                </div>

                <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-900 px-3 py-2 rounded border border-slate-800 text-slate-400 hover:text-blue-400 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-slate-950/90 px-3 py-2 rounded border border-slate-800 text-xs pointer-events-none z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-3 bg-yellow-500 border border-slate-700"></div>
                        <span className="text-slate-400">Top 5</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-3 bg-red-500 border border-slate-700"></div>
                        <span className="text-slate-400">6-10</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-3 bg-orange-500 border border-slate-700"></div>
                        <span className="text-slate-400">11-20</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-3 bg-blue-500 border border-slate-700"></div>
                        <span className="text-slate-400">21-30</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-3 bg-green-500 border border-slate-700"></div>
                        <span className="text-slate-400">31-50</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-3 bg-slate-600 border border-slate-700"></div>
                        <span className="text-slate-400">51+</span>
                    </div>
                </div>
            </div>

            {/* Fullscreen modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full h-full max-w-7xl max-h-screen bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden relative">
                        <MapContent />
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="absolute top-4 right-4 bg-slate-950/90 hover:bg-slate-900 px-4 py-3 rounded-lg border border-slate-700 text-slate-400 hover:text-red-400 transition-colors z-20"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="absolute top-4 left-4 bg-slate-950/90 px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-300 z-20 pointer-events-none">
                            <div className="font-semibold">Fullscreen World Map</div>
                            <div className="text-xs text-slate-400 mt-1">Click countries to view details</div>
                        </div>
                        {/* Legend (fullscreen) */}
                        <div className="absolute bottom-4 right-4 bg-slate-950/90 px-4 py-3 rounded-lg border border-slate-700 text-xs z-20 pointer-events-none">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-5 h-4 bg-yellow-500 border border-slate-700"></div>
                                <span className="text-slate-300">Top 5</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-5 h-4 bg-red-500 border border-slate-700"></div>
                                <span className="text-slate-300">6-10</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-5 h-4 bg-orange-500 border border-slate-700"></div>
                                <span className="text-slate-300">11-20</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-5 h-4 bg-blue-500 border border-slate-700"></div>
                                <span className="text-slate-300">21-30</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-5 h-4 bg-green-500 border border-slate-700"></div>
                                <span className="text-slate-300">31-50</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-4 bg-slate-600 border border-slate-700"></div>
                                <span className="text-slate-300">51+</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CountryMap;
