import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-poppins p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Manage the entire auction platform.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Users</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">1,250</span>
                            <span className="ml-2 text-sm font-medium text-green-600">+5%</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Auctions</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">142</span>
                            <span className="ml-2 text-sm font-medium text-blue-600">Live now</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Completed Sales</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">3,420</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Platform Revenue</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">₹8,45,000</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-gray-800 mb-6">Management Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Link to="/admin/auctions" className="group">
                        <div className="bg-blue-600 hover:bg-blue-700 transition-all p-8 rounded-2xl text-white shadow-lg h-full">
                            <h3 className="text-xl font-bold mb-2">Auctions</h3>
                            <p className="text-blue-100 text-sm">Monitor and manage all active/closed auctions.</p>
                        </div>
                    </Link>

                    <Link to="/admin/transactions" className="group">
                        <div className="bg-teal-600 hover:bg-teal-700 transition-all p-8 rounded-2xl text-white shadow-lg h-full">
                            <h3 className="text-xl font-bold mb-2">Transactions</h3>
                            <p className="text-teal-100 text-sm">Review all platform payments and transactions.</p>
                        </div>
                    </Link>

                    <Link to="/admin/bids" className="group">
                        <div className="bg-purple-600 hover:bg-purple-700 transition-all p-8 rounded-2xl text-white shadow-lg h-full">
                            <h3 className="text-xl font-bold mb-2">Bid History</h3>
                            <p className="text-purple-100 text-sm">Track all bidding activity across the platform.</p>
                        </div>
                    </Link>

                    <Link to="/admin/net-banking" className="group">
                        <div className="bg-orange-600 hover:bg-orange-700 transition-all p-8 rounded-2xl text-white shadow-lg h-full">
                            <h3 className="text-xl font-bold mb-2">Net Banking</h3>
                            <p className="text-orange-100 text-sm">Monitor bank settlements and API health.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
