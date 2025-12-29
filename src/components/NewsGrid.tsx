"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Newspaper, Clock, ExternalLink, Loader2, AlertCircle } from "lucide-react";

interface NewsItem {
    id: number;
    title: string;
    summary: string;
    category: string;
    time: string;
    image: string;
    link: string;
}

export default function NewsGrid() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) throw new Error('Failed to fetch news');
                const data = await response.json();
                setNews(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load latest news");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (error) {
        return (
            <div className="bg-slate-900/50 rounded-xl border border-red-900/30 p-8 text-center">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="text-slate-300">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-800/60 overflow-hidden">
            <div className="p-6 border-b border-slate-800/60 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Newspaper className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                            Global Defense Updates
                        </h2>
                    </div>
                    <p className="text-slate-400 text-sm mt-2 ml-1">
                        Real-time intelligence from global sources
                    </p>
                </div>
                <div className="hidden md:block">
                    <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-800 rounded border border-slate-700">
                        LIVE FEED
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {loading ? (
                    // Loading Skeletons
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 h-80 animate-pulse">
                            <div className="h-40 bg-slate-700/50" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                                <div className="h-4 bg-slate-700/50 rounded w-1/2" />
                                <div className="h-20 bg-slate-700/30 rounded w-full mt-4" />
                            </div>
                        </div>
                    ))
                ) : (
                    news.map((item, index) => (
                        <motion.a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-slate-800/40 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60" />
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-slate-950/70 backdrop-blur-md rounded-full border border-slate-700/50 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                                    {item.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-slate-100 font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                                    {item.summary}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-blue-500 text-xs font-bold uppercase tracking-wide group-hover:gap-2 transition-all">
                                        <span>Read Analysis</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))
                )}
            </div>
        </div>
    );
}
