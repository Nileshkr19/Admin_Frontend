import React, { useState } from 'react';
import { X } from 'lucide-react';

export function ForgotPasswordModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Implement your password reset logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setEmail('');
            }, 2000);
        } catch (error) {
            setStatus('error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-1">Reset Password</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {status === 'loading' ? 'Sending...' :
                            status === 'success' ? 'Email Sent!' :
                                'Send Reset Instructions'}
                    </button>

                    {status === 'error' && (
                        <p className="text-red-500 text-sm text-center">
                            Something went wrong. Please try again.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
