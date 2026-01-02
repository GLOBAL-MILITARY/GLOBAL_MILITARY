"use client";

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function AuthButton() {
    const [showContactForm, setShowContactForm] = useState(false);

    return (
        <>
            <div className="flex items-center gap-3">
                {/* Contact Button */}
                <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all text-sm font-medium"
                >
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">Contact</span>
                </button>
            </div>

            {/* Modals */}
            {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
        </>
    );
}
