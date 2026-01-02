"use client";

import React, { useState } from 'react';
import { X, Send, Mail, User as UserIcon, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReactDOM from 'react-dom';

interface ContactFormProps {
    onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Check if EmailJS is configured
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS not configured. Keys:', { serviceId, templateId, publicKey });
            setStatus('error');
            setErrorMessage('Email service not configured. Please check .env.local file.');
            return;
        }

        try {
            const result = await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_email: 'commonsensestory@gmail.com',
                },
                publicKey
            );

            if (result.status === 200) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error: any) {
            console.error('Error sending email:', error);
            setStatus('error');
            setErrorMessage(error.text || 'Failed to send message. Please try again.');
        }
    };

    // Prevent hydration mismatch
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!mounted) return null;

    return (
        // Use Portal to render outside of Header context (which might have filters/transforms)
        ReactDOM.createPortal(
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Send us a message and we'll get back to you soon.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Name
                            </label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Message
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Your message..."
                                />
                            </div>
                        </div>

                        {/* Status Messages */}
                        {status === 'error' && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm">
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === 'sending' || status === 'success'}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                            {status === 'sending' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : status === 'success' ? (
                                'Sent!'
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>,
            document.body
        )
    );
}
