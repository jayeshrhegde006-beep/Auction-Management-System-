import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("buyer");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            email,
            userType
        };

        const existingUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        existingUsers.push(newUser);
        localStorage.setItem("mockUsers", JSON.stringify(existingUsers));

        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{ backgroundImage: `url('/auth-bg.jpg'), linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)` }}>

            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-[2px]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

            <div className="relative z-10 w-full max-w-md px-6 py-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl transition-all hover:shadow-purple-500/10">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                        Join Us
                    </h2>
                    <p className="text-gray-300">Create your futuristic auction account</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider ml-1">Username</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium"
                            type="text"
                            placeholder="Pick a unique username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider ml-1">Email Address</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider ml-1">Password</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium"
                            type="password"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider ml-1">Account Type</label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer font-medium"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="buyer" className="bg-slate-900">Buyer</option>
                            <option value="seller" className="bg-slate-900">Seller</option>
                        </select>
                    </div>

                    <button
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-900/40 transform transition-all active:scale-[0.98] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                        type="submit"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Already part of the future?{" "}
                        <button
                            className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

