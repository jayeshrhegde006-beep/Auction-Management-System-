import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [transactionsPerPage] = useState(15);

	useEffect(() => {
		// Fetch products to generate transactions from
		const storedProducts = JSON.parse(localStorage.getItem("mock_added_products") || "[]");

		let mockTransactions = [];

		// Generate completed transactions for some random products
		storedProducts.forEach((product, index) => {
			// 50% chance a product was sold
			if (Math.random() > 0.5) {
				mockTransactions.push({
					transaction_id: `TXN-${index}-SOLD`,
					buyer_name: `User${Math.floor(Math.random() * 100)}`,
					seller_name: product.seller_username || "You",
					amount: (parseFloat(product.starting_price || 100) * (1 + Math.random())).toFixed(2),
					transaction_time: new Date(Date.now() - Math.random() * 864000000).toISOString(),
					payment_method: Math.random() > 0.5 ? "Credit Card" : "PayPal",
					status: "Completed"
				});
			}
		});

		// Add history
		for (let i = 0; i < 20; i++) {
			mockTransactions.push({
				transaction_id: `HIST-TXN-${i}`,
				buyer_name: `User${Math.floor(Math.random() * 500)}`,
				seller_name: `Seller${Math.floor(Math.random() * 100)}`,
				amount: (Math.random() * 5000 + 1000).toFixed(2),
				transaction_time: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
				payment_method: ["Credit Card", "Bank Transfer", "Crypto"][Math.floor(Math.random() * 3)],
				status: "Completed"
			});
		}

		mockTransactions.sort((a, b) => new Date(b.transaction_time) - new Date(a.transaction_time));
		setTransactions(mockTransactions);
		setLoading(false);
	}, []);

	const indexOfLastTransaction = currentPage * transactionsPerPage;
	const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
	const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

	const nextPage = () => setCurrentPage(currentPage + 1);
	const prevPage = () => setCurrentPage(currentPage - 1);

	return (
		<div className="font-poppins min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold text-gray-900">Transaction History</h2>
					<span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full">Total Volume: ₹{transactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toFixed(0)}</span>
				</div>

				<div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
					<table className="w-full text-left">
						<thead className="bg-gray-50 border-b border-gray-100">
							<tr>
								<th className="py-4 px-6 font-semibold text-gray-600">Txn ID</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Buyer</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Seller</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Amount</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Time</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Method</th>
								<th className="py-4 px-6 font-semibold text-gray-600">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{loading ? (
								<tr>
									<td colSpan="7" className="py-12 text-center text-gray-500">Loading transactions...</td>
								</tr>
							) : currentTransactions.length === 0 ? (
								<tr>
									<td colSpan="7" className="py-12 text-center text-gray-500">No transactions recorded.</td>
								</tr>
							) : (
								currentTransactions.map((transaction, index) => (
									<tr key={index} className="hover:bg-gray-50 transition-colors">
										<td className="py-4 px-6 text-gray-500 font-mono text-xs">
											{transaction.transaction_id}
										</td>
										<td className="py-4 px-6 font-medium text-gray-900">
											{transaction.buyer_name}
										</td>
										<td className="py-4 px-6 text-gray-600">
											{transaction.seller_name}
										</td>
										<td className="py-4 px-6 font-bold text-gray-800">
											₹{transaction.amount}
										</td>
										<td className="py-4 px-6 text-gray-500 text-sm">
											{new Date(transaction.transaction_time).toLocaleString()}
										</td>
										<td className="py-4 px-6 text-gray-600">
											{transaction.payment_method}
										</td>
										<td className="py-4 px-6">
											<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
												{transaction.status}
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
						disabled={currentTransactions.length < transactionsPerPage}
					>
						<FiChevronRight className="w-5 h-5 text-gray-600" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Transactions;