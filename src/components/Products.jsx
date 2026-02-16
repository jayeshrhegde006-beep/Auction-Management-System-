import React, { useEffect, useState } from "react";
import EditButton from "./EditButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Products = () => {
	console.log("Rendering Products Component");
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(15);

	useEffect(() => {
		const fetchProducts = async () => {
			// Immediately load mock data for presentation
			const storedProducts = JSON.parse(localStorage.getItem("mock_added_products") || "[]");
			const mockProducts = Array.from({ length: 1000 }, (_, i) => ({
				item_name: `Premium Item ${i + 1}`,
				starting_price: (Math.random() * 1000).toFixed(2),
				last_bidder: Math.random() > 0.5 ? `User${Math.floor(Math.random() * 100)}` : "None",
				seller_username: `Seller${Math.floor(Math.random() * 50)}`,
				last_bid: (Math.random() * 1000 + 50).toFixed(2),
				auction_end_time: new Date(Date.now() + Math.random() * 1000000000).toISOString(),
				auction_status: 'Active',
				image: `https://picsum.photos/seed/${i + 1}/100/100`
			}));
			setProducts([...storedProducts, ...mockProducts]);
			setLoading(false);
		};

		// const pollingInterval = setInterval(fetchProducts, 1000); 
		fetchProducts();

		return () => {
			// clearInterval(pollingInterval);
		};
	}, []);

	const displayCountdown = (endTime) => {
		const now = new Date();
		const end = new Date(endTime);
		const diff = end - now;
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		if (diff <= 900000) {
			return <span style={{ color: "red" }}>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</span>;
		} else {
			return `${days}d ${hours}h ${minutes}m ${seconds}s`;
		}
	};

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

	const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

	const calculateCountdown = (endTime) => {
		const now = new Date();
		const end = new Date(endTime);
		const diff = end - now;
		return diff;
	};
	currentProducts.sort((a, b) => calculateCountdown(a.auction_end_time) - calculateCountdown(b.auction_end_time));

	const nextPage = () => setCurrentPage(currentPage + 1);
	const prevPage = () => setCurrentPage(currentPage - 1);

	return (
		<div className="font-poppins min-h-screen bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 pt-5">Product List</h2>
				</div>

				<div className="overflow-x-auto shadow-md rounded-lg">
					<table className="w-full table-auto border-collapse">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								<th className="py-3 px-6 text-left">Image</th>
								<th className="py-3 px-6 text-left">Title</th>
								<th className="py-3 px-6 text-left">Base Price</th>
								<th className="py-3 px-6 text-left">Last Bidder</th>
								<th className="py-3 px-6 text-left">Seller</th>
								<th className="py-3 px-6 text-left">Last Bid</th>
								<th className="py-3 px-6 text-left">Countdown</th>
								<th className="py-3 px-6 text-left">BID</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{loading ? (
								<tr>
									<td colSpan="8" className="py-4 px-6 text-center">
										Loading...
									</td>
								</tr>
							) : error && products.length === 0 ? (
								<tr>
									<td colSpan="8" className="py-4 px-6 text-center">
										Error: {error}
									</td>
								</tr>
							) : currentProducts.length === 0 ? (
								<tr>
									<td colSpan="8" className="py-4 px-6 text-center">
										No products available
									</td>
								</tr>
							) : (
								currentProducts.map((product, index) => (
									<tr
										key={index}
										className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
									>
										<td className="py-4 px-6 border-b border-gray-200">
											<img src={product.image} alt={product.item_name} className="w-16 h-16 object-cover rounded" />
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											{product.item_name}
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											{product.starting_price}
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											{product.last_bidder || "None"}
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											{product.seller_username}
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											{product.last_bid || product.starting_price}
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											{displayCountdown(product.auction_end_time)}
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											<EditButton product={product} />
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className="flex justify-center mt-4">
					<button
						className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 mr-2 focus:outline-none"
						onClick={prevPage}
						disabled={currentPage === 1}
					>
						<FiChevronLeft />
					</button>
					<span className="px-3 py-1 rounded bg-gray-200 text-gray-600 mr-2">
						{currentPage}
					</span>
					<button
						className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
						onClick={nextPage}
						disabled={indexOfLastProduct >= products.length}
					>
						<FiChevronRight />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Products;
