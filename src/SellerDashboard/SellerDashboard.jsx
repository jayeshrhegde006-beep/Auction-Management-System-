import React from "react";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
	return (
		<div className="min-h-screen bg-gray-50 font-poppins p-8">
			<div className="max-w-7xl mx-auto">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
					<p className="text-gray-500">Welcome back! Manage your inventory and track your sales.</p>
				</header>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
						<h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
						<div className="mt-2 flex items-baseline">
							<span className="text-3xl font-bold text-gray-900">₹1,24,500</span>
							<span className="ml-2 text-sm font-medium text-green-600">+12%</span>
						</div>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
						<h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Listings</h3>
						<div className="mt-2 flex items-baseline">
							<span className="text-3xl font-bold text-gray-900">8</span>
							<span className="ml-2 text-sm font-medium text-gray-500">Auctions live</span>
						</div>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
						<h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Items Sold</h3>
						<div className="mt-2 flex items-baseline">
							<span className="text-3xl font-bold text-gray-900">24</span>
							<span className="ml-2 text-sm font-medium text-blue-600">This month</span>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<Link to="/seller/add-product" className="group">
						<div className="bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 p-8 rounded-2xl text-white flex items-center justify-between shadow-lg">
							<div>
								<h3 className="text-2xl font-bold mb-2">Add New Product</h3>
								<p className="text-indigo-200">List a new item for auction</p>
							</div>
							<div className="bg-indigo-500 p-3 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
								</svg>
							</div>
						</div>
					</Link>

					<Link to="/seller/products" className="group">
						<div className="bg-white hover:bg-gray-50 transition-all transform hover:-translate-y-1 p-8 rounded-2xl border border-gray-200 text-gray-800 flex items-center justify-between shadow-sm">
							<div>
								<h3 className="text-2xl font-bold mb-2">Manage Inventory</h3>
								<p className="text-gray-500">View and edit your existing products</p>
							</div>
							<div className="bg-gray-100 p-3 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
								</svg>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SellerDashboard;
