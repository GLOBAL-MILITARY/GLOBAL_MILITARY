"use client";

import React from "react";
import { motion } from "framer-motion";

interface RadarChartProps {
    data1: {
        country: string;
        values: number[]; // 6 values normalized 0-100
    };
    data2: {
        country: string;
        values: number[]; // 6 values normalized 0-100
    };
    labels: string[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data1, data2, labels }) => {
    const size = 400;
    const center = size / 2;
    const radius = size / 2 - 60;
    const levels = 5;

    // Calculate hexagon points
    const getPoint = (value: number, index: number) => {
        const angle = (Math.PI / 3) * index - Math.PI / 2; // Hexagon: 60 degrees each
        const r = (value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle),
        };
    };

    // Generate hexagon grid lines
    const gridLines = Array.from({ length: levels }, (_, i) => {
        const scale = ((i + 1) / levels) * radius;
        const points = Array.from({ length: 6 }, (_, j) => {
            const angle = (Math.PI / 3) * j - Math.PI / 2;
            return `${center + scale * Math.cos(angle)},${center + scale * Math.sin(angle)}`;
        }).join(" ");
        return points;
    });

    // Generate axis lines
    const axisLines = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        return {
            x1: center,
            y1: center,
            x2: center + radius * Math.cos(angle),
            y2: center + radius * Math.sin(angle),
        };
    });

    // Generate data polygon
    const getPolygonPoints = (values: number[]) => {
        return values
            .map((value, index) => {
                const point = getPoint(value, index);
                return `${point.x},${point.y}`;
            })
            .join(" ");
    };

    // Label positions
    const labelPositions = labels.map((_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const labelRadius = radius + 40;
        return {
            x: center + labelRadius * Math.cos(angle),
            y: center + labelRadius * Math.sin(angle),
        };
    });

    return (
        <div className="flex items-center justify-center">
            <svg width={size} height={size} className="overflow-visible">
                {/* Grid hexagons */}
                {gridLines.map((points, i) => (
                    <polygon
                        key={`grid-${i}`}
                        points={points}
                        fill="none"
                        stroke="#334155"
                        strokeWidth="1"
                        opacity={0.3}
                    />
                ))}

                {/* Axis lines */}
                {axisLines.map((line, i) => (
                    <line
                        key={`axis-${i}`}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="#475569"
                        strokeWidth="1"
                    />
                ))}

                {/* Data polygons */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    points={getPolygonPoints(data1.values)}
                    fill="#EF4444"
                    stroke="#EF4444"
                    strokeWidth="2"
                />
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    points={getPolygonPoints(data2.values)}
                    fill="#3B82F6"
                    stroke="#3B82F6"
                    strokeWidth="2"
                />

                {/* Data points */}
                {data1.values.map((value, i) => {
                    const point = getPoint(value, i);
                    return (
                        <motion.circle
                            key={`point1-${i}`}
                            initial={{ opacity: 0, r: 0 }}
                            animate={{ opacity: 1, r: 5 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            cx={point.x}
                            cy={point.y}
                            fill="#EF4444"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    );
                })}
                {data2.values.map((value, i) => {
                    const point = getPoint(value, i);
                    return (
                        <motion.circle
                            key={`point2-${i}`}
                            initial={{ opacity: 0, r: 0 }}
                            animate={{ opacity: 1, r: 5 }}
                            transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                            cx={point.x}
                            cy={point.y}
                            fill="#3B82F6"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Labels */}
                {labels.map((label, i) => (
                    <text
                        key={`label-${i}`}
                        x={labelPositions[i].x}
                        y={labelPositions[i].y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-semibold fill-slate-300"
                    >
                        {label}
                    </text>
                ))}
            </svg>
        </div>
    );
};

export default RadarChart;
