import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const Profile = () => {
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// Bank Connection States
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentDetails, setPaymentDetails] = useState({
		amount: "",
		bankName: "HDFC Bank",
		accountNumber: "",
		ifsc: ""
	});

	useEffect(() => {
		const fetchProfile = () => {
			const username = localStorage.getItem("username") || "MockUser";
			const savedBalance = localStorage.getItem(`balance_${username}`);

			setProfile({
				username: username,
				email: "user@example.com",
				address: "123 Mock Lane, Tech City",
				account_balance: savedBalance ? Number(savedBalance) : 50000.00,
				userType: localStorage.getItem("userType") || "Buyer"
			});
			setLoading(false);
		};

		fetchProfile();
	}, []);

	const handleAddFunds = (e) => {
		e.preventDefault();
		if (!paymentDetails.amount || !paymentDetails.accountNumber) return;

		setIsProcessing(true);

		// Simulate Bank Transaction Processing
		setTimeout(() => {
			const currentBalance = Number(profile.account_balance);
			const newBalance = currentBalance + Number(paymentDetails.amount);

			localStorage.setItem(`balance_${profile.username}`, newBalance);
			setProfile({ ...profile, account_balance: newBalance });

			setIsProcessing(false);
			setShowPaymentModal(false);
			setPaymentDetails({ ...paymentDetails, amount: "", accountNumber: "", ifsc: "" });
			alert(`Bank Transaction Successful! ₹${Number(paymentDetails.amount).toLocaleString()} added to wallet.`);
		}, 3000);
	};

	if (loading) {
		return <div className="text-center mt-4">Loading...</div>;
	}

	if (error) {
		return <div className="text-center mt-4">{error}</div>;
	}

	let formattedAccountBalance = '';
	const accountBalance = profile.account_balance ? Number(profile.account_balance) : 0;
	if (!isNaN(accountBalance)) {
		formattedAccountBalance = accountBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} else {
		formattedAccountBalance = 'N/A';
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-poppins relative">
			{/* Payment Gateway Modal */}
			{showPaymentModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
					<div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
						<div className="bg-blue-600 p-6 text-white text-center">
							<h2 className="text-xl font-bold">Secure Bank Transfer</h2>
							<p className="text-blue-100 text-xs mt-1 italic">Authorized Gateway Connect</p>
						</div>

						<form onSubmit={handleAddFunds} className="p-8 space-y-4">
							<div>
								<label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Select Your Bank</label>
								<select
									className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
									value={paymentDetails.bankName}
									onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
								>
									<option>HDFC Bank</option>
									<option>SBI Bank</option>
									<option>ICICI Bank</option>
									<option>Axis Bank</option>
								</select>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Account Number</label>
									<input
										type="password"
										required
										placeholder="XXXX-XXXX"
										className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
										value={paymentDetails.accountNumber}
										onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase mb-1">IFSC Code</label>
									<input
										type="text"
										placeholder="IFSC1234"
										className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
										value={paymentDetails.ifsc}
										onChange={(e) => setPaymentDetails({ ...paymentDetails, ifsc: e.target.value })}
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Amount to Add (₹)</label>
								<input
									type="number"
									required
									min="1"
									placeholder="e.g. 5000"
									className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-bold"
									value={paymentDetails.amount}
									onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
								/>
							</div>

							<div className="pt-4 flex gap-4">
								<button
									type="button"
									onClick={() => setShowPaymentModal(false)}
									className="flex-1 py-3 px-4 border border-gray-200 text-gray-400 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isProcessing}
									className="flex-2 py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
								>
									{isProcessing ? (
										<>
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
											Processing...
										</>
									) : (
										"Transfer Funds"
									)}
								</button>
							</div>
						</form>

						{isProcessing && (
							<div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center space-y-4">
								<div className="relative">
									<div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
									<div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
								</div>
								<div className="text-center">
									<h3 className="font-bold text-gray-800">Connecting to Bank Server</h3>
									<p className="text-sm text-gray-500">Securely authenticating account details...</p>
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
				{/* Header with Gradient */}
				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 md:h-48 relative">
					<div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
						<img
							className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
							src={`https://ui-avatars.com/api/?name=${profile.username || 'User'}&background=random&size=128`}
							alt="Profile Avatar"
						/>
					</div>
				</div>

				{/* Profile Content */}
				<div className="pt-20 pb-8 px-8 text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.username}</h1>
					<p className="text-gray-500 text-sm mb-6 uppercase tracking-wide">{profile.userType}</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mt-8">
						{/* Info Card */}
						<div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
							<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Contact Information</h3>
							<div className="space-y-3">
								<div>
									<label className="text-xs text-gray-500 block">Email</label>
									<p className="font-medium text-gray-800">{profile.email}</p>
								</div>
								<div>
									<label className="text-xs text-gray-500 block">Address</label>
									<p className="font-medium text-gray-800">{profile.address}</p>
								</div>
							</div>
						</div>

						{/* Balance Card */}
						<div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
							<h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-4">Wallet</h3>
							<div className="flex flex-col justify-between h-full">
								<div>
									<label className="text-xs text-indigo-500 block">Current Balance</label>
									<p className="text-3xl font-bold text-indigo-700">₹{formattedAccountBalance}</p>
								</div>
								<button
									onClick={() => setShowPaymentModal(true)}
									className="mt-4 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95 transform"
								>
									Add Funds
								</button>
							</div>
						</div>
					</div>

					{/* Stats or Recent Activity Placeholder */}
					<div className="mt-10 border-t border-gray-100 pt-8">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">Account Overview</h3>
						<div className="grid grid-cols-3 gap-4 text-center">
							<div className="p-4 rounded-lg bg-gray-50">
								<span className="block text-2xl font-bold text-gray-700">12</span>
								<span className="text-xs text-gray-500">Bids Placed</span>
							</div>
							<div className="p-4 rounded-lg bg-gray-50">
								<span className="block text-2xl font-bold text-gray-700">3</span>
								<span className="text-xs text-gray-500">Auctions Won</span>
							</div>
							<div className="p-4 rounded-lg bg-gray-50">
								<span className="block text-2xl font-bold text-green-600">Active</span>
								<span className="text-xs text-gray-500">Status</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
