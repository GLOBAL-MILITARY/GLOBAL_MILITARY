
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility functions

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(num: number | undefined | null): string {
    if (num === undefined || num === null) return "N/A";
    // Ensure 0 is formatted as "0"
    return new Intl.NumberFormat('en-US').format(num);
}

export function getPowerColor(rank: number): string {
    if (!rank) return "#94a3b8"; // Slate-400 equivalent for unknown

    if (rank <= 3) return "#ef4444"; // Red-500: Top 3 Superpowers
    if (rank <= 10) return "#f97316"; // Orange-500: Top 10 Major Powers
    if (rank <= 30) return "#eab308"; // Yellow-500: Regional Powers
    if (rank <= 50) return "#84cc16"; // Lime-500: Established Militaries
    return "#3b82f6"; // Blue-500: Others
}
