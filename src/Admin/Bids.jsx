import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Bids = () => {
	const [bids, setBids] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [bidsPerPage] = useState(15);

	useEffect(() => {
		// Fetch products to base bids on
		const storedProducts = JSON.parse(localStorage.getItem("mock_added_products") || "[]");

		let mockBids = [];

		// Generate bids for stored products
		storedProducts.forEach((product, index) => {
			const numBids = Math.floor(Math.random() * 5) + 1; // 1-5 bids per product
			for (let i = 0; i < numBids; i++) {
				mockBids.push({
					bid_id: `BID-${index}-${i}`,
					bidder_name: `User${Math.floor(Math.random() * 100)}`,
					item_name: product.item_name,
					bid_amount: (parseFloat(product.starting_price || 100) + (i + 1) * 50).toFixed(2),
					bid_time: new Date(Date.now() - Math.random() * 86400000).toISOString(),
					status: i === numBids - 1 ? 'Leading' : 'Outbid'
				});
			}
		});

		// Add some random historical bids
		for (let i = 0; i < 20; i++) {
			mockBids.push({
				bid_id: `HIST-BID-${i}`,
				bidder_name: `User${Math.floor(Math.random() * 500)}`,
				item_name: `Historic Item ${i}`,
				bid_amount: (Math.random() * 1000).toFixed(2),
				bid_time: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
				status: Math.random() > 0.5 ? 'Won' : 'Outbid'
			});
		}

		// Sort by time (newest first)
		mockBids.sort((a, b) => new Date(b.bid_time) - new Date(a.bid_time));

		setBids(mockBids);
		setLoading(false);
	}, []);

	const indexOfLastBid = currentPage * bidsPerPage;
	const indexOfFirstBid = indexOfLastBid - bidsPerPage;
	const currentBids = bids.slice(indexOfFirstBid, indexOfLastBid);

	const nextPage = () => setCurrentPage(currentPage + 1);
	const prevPage = () => setCurrentPage(currentPage - 1);

	return (
		<div className="font-poppins min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold text-gray-900">Bid Activity Log</h2>
					<span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full">Total Bids: {bids.length}</span>
				</div>

				<div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
					<table className="w-full text-left">
						<thead className="bg-gray-50 border-b border-gray-100">
							<tr>
								<th className="py-4 px-6 font-semibold text-gray-600">Bid ID</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Bidder</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Item</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Amount</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Time</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{loading ? (
								<tr>
									<td colSpan="6" className="py-12 text-center text-gray-500">Loading bids...</td>
								</tr>
							) : currentBids.length === 0 ? (
								<tr>
									<td colSpan="6" className="py-12 text-center text-gray-500">No bids recorded.</td>
								</tr>
							) : (
								currentBids.map((bid, index) => (
									<tr key={index} className="hover:bg-gray-50 transition-colors">
										<td className="py-4 px-6 text-gray-500 font-mono text-xs">
											{bid.bid_id}
										</td>
										<td className="py-4 px-6 font-medium text-gray-900">
											{bid.bidder_name}
										</td>
										<td className="py-4 px-6 text-indigo-600 font-medium">
											{bid.item_name}
										</td>
										<td className="py-4 px-6 font-bold text-gray-800">
											₹{bid.bid_amount}
										</td>
										<td className="py-4 px-6 text-gray-500 text-sm">
											{new Date(bid.bid_time).toLocaleString()}
										</td>
										<td className="py-4 px-6">
											<span className={`px-3 py-1 rounded-full text-xs font-semibold ${bid.status === 'Leading' || bid.status === 'Won'
												? 'bg-green-100 text-green-700'
												: 'bg-yellow-100 text-yellow-700'
												}`}>
												{bid.status}
											</span>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

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
						disabled={currentBids.length < bidsPerPage}
					>
						<FiChevronRight className="w-5 h-5 text-gray-600" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Bids;