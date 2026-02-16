import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Auctions = () => {
	const [auctions, setAuctions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [auctionsPerPage] = useState(15);

	useEffect(() => {
		// Fetch from LocalStorage
		const storedProducts = JSON.parse(localStorage.getItem("mock_added_products") || "[]");

		// Generate some mock history for the admin view
		const mockProducts = Array.from({ length: 50 }, (_, i) => ({
			item_id: `HST-${i + 1000}`,
			item_name: `Historic Auction Item ${i + 1}`,
			description: "Sample auction history item",
			starting_price: (Math.random() * 5000).toFixed(2),
			auction_end_time: new Date(Date.now() - Math.random() * 10000000000).toISOString(), // Past items
			auction_status: Math.random() > 0.2 ? 'Closed' : 'Active',
			category: ["Electronics", "Art", "Vehicles", "Real Estate"][Math.floor(Math.random() * 4)]
		}));

		// Combine: Prioritize real added items at top
		setAuctions([...storedProducts, ...mockProducts]);
		setLoading(false);
	}, []);

	const indexOfLastAuction = currentPage * auctionsPerPage;
	const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
	const currentAuctions = auctions.slice(indexOfFirstAuction, indexOfLastAuction);

	const nextPage = () => setCurrentPage(currentPage + 1);
	const prevPage = () => setCurrentPage(currentPage - 1);

	return (
		<div className="font-poppins min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold text-gray-900">Auctions Management</h2>
					<span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full">Total Records: {auctions.length}</span>
				</div>

				<div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
					<table className="w-full text-left">
						<thead className="bg-gray-50 border-b border-gray-100">
							<tr>
								<th className="py-4 px-6 font-semibold text-gray-600">ID</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Item Name</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Starting Price</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Auction End</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{loading ? (
								<tr>
									<td colSpan="5" className="py-12 text-center text-gray-500">Loading records...</td>
								</tr>
							) : currentAuctions.length === 0 ? (
								<tr>
									<td colSpan="5" className="py-12 text-center text-gray-500">No auctions found.</td>
								</tr>
							) : (
								currentAuctions.map((auction, index) => (
									<tr key={index} className="hover:bg-gray-50 transition-colors">
										<td className="py-4 px-6 text-gray-500 font-mono text-xs">
											{auction.item_id || `ADDED-${index}`}
										</td>
										<td className="py-4 px-6">
											<div className="font-medium text-gray-900">{auction.item_name}</div>
											<div className="text-xs text-gray-400">{auction.category || 'General'}</div>
										</td>
										<td className="py-4 px-6 font-medium text-gray-700">
											₹{auction.starting_price}
										</td>
										<td className="py-4 px-6 text-gray-500 text-sm">
											{new Date(auction.auction_end_time).toLocaleString()}
										</td>
										<td className="py-4 px-6">
											<span className={`px-3 py-1 rounded-full text-xs font-semibold ${(auction.auction_status || 'Active') === 'Active'
													? 'bg-green-100 text-green-700'
													: 'bg-gray-100 text-gray-600'
												}`}>
												{auction.auction_status || 'Active'}
											</span>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="flex justify-center mt-8 gap-4">
					<button
						className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
						onClick={prevPage}
						disabled={currentPage === 1}
					>
						<FiChevronLeft className="w-5 h-5 text-gray-600" />
					</button>
					<span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-600 font-medium shadow-sm">
						Page {currentPage}
					</span>
					<button
						className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
						onClick={nextPage}
						disabled={currentAuctions.length < auctionsPerPage}
					>
						<FiChevronRight className="w-5 h-5 text-gray-600" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Auctions;