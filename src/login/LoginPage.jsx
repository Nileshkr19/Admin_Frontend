import React, { useContext, useState } from 'react';
import { KeyRound, ChefHat } from 'lucide-react';
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate, Navigate } from "react-router-dom";
import { ForgotPasswordModal } from '../components/ForgetPasswordModal.jsx';

function LoginPage() {
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const isLoggedIn = await login(phone, password);
            if (isLoggedIn) {
                navigate('/admin');
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred during login");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-[400px]">
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
                                <ChefHat className="h-8 w-8 text-blue-600" />
                            </div>
                            <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
                            <p className="text-sm text-gray-500">Sign in to your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="+91 9709108923"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                            placeholder="Enter your password"
                                        />
                                        <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                                    <p className="text-sm text-red-600 text-center">{error}</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsForgotPasswordOpen(true)}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Sign in
                            </button>
                        </form>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-center text-xs text-gray-500">
                                Protected by enterprise-grade security
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
            />
        </>
    );
}

export default LoginPage;