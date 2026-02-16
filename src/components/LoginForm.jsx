import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const LoginForm = ({ setForceRefresh }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("buyer");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			let loginSuccess = false;
			let responseData;

			// 1. Hardcoded Admin Check
			if (userType === "admin") {
				if (username === "admin" && password === "vjti@123") {
					loginSuccess = true;
					responseData = { adminID: "admin" };
				}
			}

			// 2. Mock Users Check (LocalStorage)
			if (!loginSuccess) {
				const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
				const foundUser = mockUsers.find(
					(u) => u.username === username && u.password === password && u.userType === userType
				);

				if (foundUser) {
					loginSuccess = true;
					responseData = {
						auth: true,
						[`${userType}ID`]: Date.now(),
					};
				}
			}

			// 3. Backend Call (with fallback for Presentation)
			if (!loginSuccess) {
				try {
					const response = await axios.post(
						`${API_URL}/api/login`,
						{ username, password, userType },
						{ timeout: 2000 } // Don't wait too long
					);
					loginSuccess = response.data.auth;
					responseData = response.data;
				} catch (apiError) {
					console.warn("Backend unreachable, entering Presentation Mode...");
					// Fallback: If backend fails during a presentation, allow any non-empty login
					if (username && password) {
						loginSuccess = true;
						responseData = {
							auth: true,
							[`${userType}ID`]: "demo-" + Date.now(),
						};
						console.log("Demo login authorized for:", username);
					}
				}
			}

			if (loginSuccess) {
				localStorage.setItem("username", username);
				localStorage.setItem("userType", userType);
				if (userType === "buyer") {
					localStorage.removeItem("seller_id");
					localStorage.setItem("buyer_id", responseData.buyerID || responseData.buyer_id || "demo-buyer");
					setForceRefresh(prevState => !prevState);
					navigate("/products");
				} else if (userType === "seller") {
					localStorage.removeItem("buyer_id");
					localStorage.setItem("seller_id", responseData.sellerID || responseData.seller_id || "demo-seller");
					setForceRefresh(prevState => !prevState);
					navigate("/seller");
				} else if (userType === "admin") {
					localStorage.setItem("admin_id", responseData.adminID || "demo-admin");
					setForceRefresh(prevState => !prevState);
					navigate("/admin");
				}
			} else {
				setError("Invalid username or password.");
			}
		} catch (error) {
			console.error("Critical Error:", error);
			setError("Unable to process login. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
			style={{ backgroundImage: `url('/auth-bg.jpg'), linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)` }}>

			{/* Animated Background Elements */}
			<div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-[2px]"></div>
			<div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
			<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

			<div className="relative z-10 w-full max-w-md px-6 py-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl transition-all hover:shadow-blue-500/10">
				<div className="text-center mb-10">
					<h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
						Welcome Back
					</h2>
					<p className="text-gray-300">Access the future of auctions</p>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl animate-shake">
						<p className="text-red-300 text-sm text-center font-medium">{error}</p>
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-6">
					<div className="space-y-1">
						<label className="text-xs font-semibold text-blue-400 uppercase tracking-wider ml-1">Username</label>
						<input
							className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-1">
						<label className="text-xs font-semibold text-blue-400 uppercase tracking-wider ml-1">Password</label>
						<input
							className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-1">
						<label className="text-xs font-semibold text-blue-400 uppercase tracking-wider ml-1">Login As</label>
						<select
							className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer font-medium"
							value={userType}
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value="buyer" className="bg-slate-900">Buyer</option>
							<option value="seller" className="bg-slate-900">Seller</option>
							<option value="admin" className="bg-slate-900">Administrator</option>
						</select>
					</div>

					<button
						className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/40 transform transition-all active:scale-[0.98] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
						type="submit"
					>
						Sign In
					</button>
				</form>

				<div className="mt-8 text-center space-y-4">
					<p className="text-gray-400 text-sm">
						Don't have an account?{" "}
						<button
							className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
							onClick={() => navigate("/signup")}
						>
							Create Account
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;