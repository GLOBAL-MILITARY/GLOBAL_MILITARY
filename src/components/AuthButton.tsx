"use client";

import React, { useState } from 'react';
import { LogIn, LogOut, User, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import ContactForm from '@/components/ContactForm';

export default function AuthButton() {
    const { user, signOut, loading, isConfigured } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);

    if (loading) {
        return (
            <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
        );
    }

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

                {/* Login Button - Only show if Firebase is configured */}
                {isConfigured && (
                    user ? (
                        // Logged In State
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || 'User'}
                                        className="w-6 h-6 rounded-full"
                                    />
                                ) : (
                                    <User className="w-5 h-5 text-slate-400" />
                                )}
                                <span className="text-slate-300 text-sm font-medium hidden md:inline">
                                    {user.displayName || user.email?.split('@')[0]}
                                </span>
                            </div>
                            <button
                                onClick={signOut}
                                className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        // Logged Out State
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-blue-600/20"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                        </button>
                    )
                )}
            </div>

            {/* Modals */}
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
            {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
        </>
    );
}
