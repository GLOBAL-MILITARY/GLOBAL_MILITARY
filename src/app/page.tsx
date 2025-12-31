"use client";

import Link from "next/link";
import { Scale, ArrowRight, Crosshair } from "lucide-react";
import AntiGravityGlobe from "@/components/AntiGravityGlobe";
import RankingList from "@/components/RankingList";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-[500px] bg-indigo-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        {/* Globe Section */}
        <div className="mb-12 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
          <AntiGravityGlobe />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
        </div>

        {/* Action Bar */}
        <div className="flex justify-center gap-6 mb-12">
          <Link href="/compare">
            <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] flex items-center gap-3">
              <Scale className="w-6 h-6" />
              Compare Countries
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link href="/simulation">
            <button className="group relative px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-lg rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] flex items-center gap-3">
              <Crosshair className="w-6 h-6" />
              Run Simulation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Rankings Section */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto">
            <RankingList />
          </div>
        </div>

      </div>
    </main>
  );
}

