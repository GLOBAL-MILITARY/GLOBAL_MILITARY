"use client";

import React from 'react';
import { Mail } from 'lucide-react';

export default function AuthButton() {
    return (
        <div className="flex items-center gap-3">
            {/* Contact Button - mailto link */}
            <a
                href="mailto:commonsensestory@gmail.com?subject=Global Military Platform 문의&body=문의 내용을 입력해주세요."
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all text-sm font-medium"
            >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
            </a>
        </div>
    );
}
