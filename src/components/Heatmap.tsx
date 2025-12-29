"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { getAllCountries } from "@/lib/mockData";

// Using Natural Earth 50m resolution for better detail
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface GeoFeature {
    type: string;
    properties: {
        ISO_A3?: string;
        iso_a3?: string;
        ADM0_A3?: string;
        name?: string;
    };
    geometry: any;
    id?: string;
}

export default function Heatmap() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [geoData, setGeoData] = useState<any>(null);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const router = useRouter();
    const countries = getAllCountries();

    // Load GeoJSON data
    useEffect(() => {
        fetch(geoUrl)
            .then(res => res.json())
            .then(data => {
                // Convert TopoJSON to GeoJSON
                if (data.type === "Topology" && data.objects) {
                    const firstKey = Object.keys(data.objects)[0];
                    const geoJson = feature(data, data.objects[firstKey]);
                    setGeoData(geoJson);
                } else {
                    setGeoData(data);
                }
            })
            .catch(err => console.error("Failed to load map data:", err));
    }, []);

    // Create power index map for color coding with multiple ID formats
    const powerIndexMap = new Map();
    const countryMap = new Map();
    countries.forEach((c) => {
        const id = c.id.toUpperCase();
        powerIndexMap.set(id, c.powerIndex);
        countryMap.set(id, c);

        // Also map common variations
        const variations: { [key: string]: string } = {
            'US': 'USA', 'UK': 'GBR', 'CN': 'CHN', 'RU': 'RUS',
            'IN': 'IND', 'KR': 'KOR', 'JP': 'JPN', 'FR': 'FRA',
            'DE': 'DEU', 'IT': 'ITA', 'BR': 'BRA', 'CA': 'CAN',
            'AU': 'AUS', 'ES': 'ESP', 'TR': 'TUR'
        };

        if (variations[id]) {
            powerIndexMap.set(variations[id], c.powerIndex);
            countryMap.set(variations[id], c);
        }
    });

    // Get country ID from feature - prioritize ISO_A3
    const getCountryId = (feature: GeoFeature): string | null => {
        return feature.properties?.ISO_A3 ||
            feature.properties?.iso_a3 ||
            feature.properties?.ADM0_A3 ||
            null;
    };

    // Get color based on Power Index (blue gradient)
    const getCountryColor = (feature: GeoFeature, isHovered: boolean): string => {
        const geoId = getCountryId(feature);

        if (!geoId) return "#64748B";

        const id = geoId.toString().toUpperCase();
        const powerIndex = powerIndexMap.get(id);

        if (!powerIndex) return "#64748B";

        // If hovered and clickable, return yellow
        if (isHovered && countryMap.has(id)) {
            return "#FBBF24";
        }

        // Power Index ranges from ~0.0 (strongest) to ~2.0+ (weakest)
        if (powerIndex <= 0.1) return "#1e3a8a"; // Superpower
        if (powerIndex <= 0.3) return "#2563eb"; // Great Power
        if (powerIndex <= 0.6) return "#3b82f6"; // Regional Power
        if (powerIndex <= 1.0) return "#60a5fa"; // Middle Power
        return "#93c5fd"; // Weak Power
    };

    const handleCountryClick = (feature: GeoFeature) => {
        const geoId = getCountryId(feature);
        if (geoId) {
            const id = geoId.toString().toUpperCase();
            const country = countryMap.get(id);
            if (country) {
                console.log('Navigating to:', `/country/${country.id}`);
                setIsExpanded(false);
                router.push(`/country/${country.id}`);
            }
        }
    };

    const renderMap = (width: number, height: number, scale: number, isInteractive: boolean) => {
        if (!geoData) return null;

        const projection = geoMercator()
            .scale(scale)
            .translate([width / 2, height / 2]);

        const pathGenerator = geoPath().projection(projection);

        const features: GeoFeature[] = geoData.features || [];

        return (
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <g>
                    {features.map((feature, index) => {
                        const geoId = getCountryId(feature);
                        const id = geoId?.toString().toUpperCase();
                        const isClickable = id ? countryMap.has(id) : false;
                        const isHovered = hoveredCountry === geoId;
                        const pathData = pathGenerator(feature as any);

                        if (!pathData) return null;

                        return (
                            <path
                                key={index}
                                d={pathData}
                                fill={getCountryColor(feature, isHovered)}
                                stroke="#1e293b"
                                strokeWidth={0.5}
                                style={{
                                    cursor: isInteractive && isClickable ? "pointer" : "default",
                                    transition: "fill 0.2s ease",
                                    pointerEvents: "auto",
                                }}
                                onClick={(e) => {
                                    if (isInteractive && isClickable) {
                                        e.stopPropagation();
                                        handleCountryClick(feature);
                                    }
                                }}
                                onMouseEnter={() => {
                                    if (isInteractive && isClickable) {
                                        setHoveredCountry(geoId);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (isInteractive) {
                                        setHoveredCountry(null);
                                    }
                                }}
                            />
                        );
                    })}
                </g>
            </svg>
        );
    };

    return (
        <>
            {/* Compact Map */}
            <motion.div
                layoutId="heatmap"
                className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 cursor-pointer group"
                onClick={() => setIsExpanded(true)}
            >
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <h2 className="text-2xl font-bold text-slate-100">
                        Global Military Power Heatmap
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Click to explore countries • Dark Blue = Strongest
                    </p>
                </div>

                <div className="absolute top-4 right-4 z-10 bg-slate-800/80 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 group-hover:bg-slate-700/80 transition-colors pointer-events-none">
                    <ZoomIn className="w-4 h-4 text-slate-300" />
                    <span className="text-slate-300 text-sm">Expand</span>
                </div>

                <div className="h-[500px] pointer-events-none flex items-center justify-center">
                    {!geoData ? (
                        <div className="text-slate-400">Loading map...</div>
                    ) : (
                        renderMap(1000, 500, 130, false)
                    )}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm px-4 py-3 rounded-lg pointer-events-none">
                    <div className="text-slate-300 text-xs font-medium mb-2">
                        Military Power
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1e3a8a" }} />
                            <span className="text-slate-400 text-xs">Superpower</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#2563eb" }} />
                            <span className="text-slate-400 text-xs">Great Power</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#3b82f6" }} />
                            <span className="text-slate-400 text-xs">Regional</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#93c5fd" }} />
                            <span className="text-slate-400 text-xs">Middle</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#64748B" }} />
                            <span className="text-slate-400 text-xs">No Data</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm"
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div
                            layoutId="heatmap"
                            className="relative w-full h-full"
                        >
                            <div
                                className="absolute top-4 left-4 z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-3xl font-bold text-slate-100">
                                    Global Military Power Heatmap
                                </h2>
                                <p className="text-slate-400 mt-1">
                                    Click on a country to view details
                                </p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(false);
                                }}
                                className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-300" />
                            </button>

                            <div className="w-full h-full pt-20 flex items-center justify-center">
                                {!geoData ? (
                                    <div className="text-slate-400">Loading map...</div>
                                ) : (
                                    renderMap(1400, 700, 180, true)
                                )}
                            </div>

                            {/* Legend */}
                            <div
                                className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm px-4 py-3 rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-slate-300 text-sm font-medium mb-2">
                                    Military Power Legend
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded" style={{ backgroundColor: "#1e3a8a" }} />
                                        <span className="text-slate-400 text-sm">Superpower</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded" style={{ backgroundColor: "#2563eb" }} />
                                        <span className="text-slate-400 text-sm">Great Power</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded" style={{ backgroundColor: "#3b82f6" }} />
                                        <span className="text-slate-400 text-sm">Regional</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded" style={{ backgroundColor: "#93c5fd" }} />
                                        <span className="text-slate-400 text-sm">Middle</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded" style={{ backgroundColor: "#64748B" }} />
                                        <span className="text-slate-400 text-sm">No Data</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
