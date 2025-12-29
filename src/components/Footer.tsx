"use client";

import { Github, Twitter, Linkedin, Mail, Globe, Crosshair } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
                                <Globe className="w-5 h-5 text-slate-400 relative z-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Crosshair className="w-8 h-8 text-slate-600/50 rotate-45" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 leading-none">
                                    <span className="text-slate-100 font-bold text-lg tracking-tight">
                                        GLOBAL
                                    </span>
                                    <span className="text-blue-500 font-bold text-lg tracking-tight">
                                        MILITARY
                                    </span>
                                </div>
                                <span className="text-slate-500 text-[10px] font-medium tracking-widest uppercase">
                                    Intelligence Platform
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Comprehensive analysis platform for global military power rankings,
                            capabilities, and defense statistics. Providing insights into the
                            world's military forces.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="text-slate-400 hover:text-slate-200 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-slate-200 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-slate-200 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:commonsensestory@gmail.com"
                                className="text-slate-400 hover:text-slate-200 transition-colors"
                                aria-label="Email Contact"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-slate-100 font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    Rankings
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    Compare
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-slate-100 font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    API
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Global Military Power. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-sm mt-2 md:mt-0">
                        Data updated regularly for accuracy
                    </p>
                </div>

                {/* Global Disclaimer */}
                <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-600 text-xs leading-relaxed max-w-4xl mx-auto">
                        <strong>DISCLAIMER:</strong> The content provided on this platform regarding military power, rankings, and capabilities is based on publicly available data, estimates, and theoretical models. It may not reflect the current operational status or classified information of any nation.
                        <br />
                        <strong>주의:</strong> 본 사이트에서 제공하는 군사력 데이터와 랭킹은 공개된 정보와 추정치에 기반합니다. 실제 기밀 정보나 실시간 작전 능력을 반영하지 않을 수 있습니다.
                    </p>
                </div>
            </div>
        </footer>
    );
}
