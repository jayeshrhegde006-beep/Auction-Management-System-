import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ViewProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(15);

	useEffect(() => {
		const fetchProducts = () => {
			const storedProducts = JSON.parse(localStorage.getItem("mock_added_products") || "[]");

			// Map stored products to ensure they have required IDs
			const mappedStored = storedProducts.map((p, i) => ({
				...p,
				item_id: p.item_id || `ADDED-${i}`,
				seller_id: p.seller_id || `ME`
			}));

			setProducts(mappedStored);
			setLoading(false);
		};

		fetchProducts();
	}, []);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

	console.log("Current products:", currentProducts);

	const nextPage = () => setCurrentPage(currentPage + 1);
	const prevPage = () => setCurrentPage(currentPage - 1);

	const handleDelete = (indexWithinPage) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			const globalIndex = indexOfFirstProduct + indexWithinPage;
			const storedProducts = JSON.parse(localStorage.getItem("mock_added_products") || "[]");

			// Remove from storage
			const updatedProducts = storedProducts.filter((_, i) => i !== globalIndex);
			localStorage.setItem("mock_added_products", JSON.stringify(updatedProducts));

			// Remove from state
			const newProducts = products.filter((_, i) => i !== globalIndex);
			// Re-map IDs just in case, or simpler just set new state
			// Re-fetching or re-mapping isn't strictly necessary for visual if we just remove it,
			// but to keep IDs consistent with next reload:
			const mappedStored = updatedProducts.map((p, i) => ({
				...p,
				item_id: p.item_id || `ADDED-${i}`,
				seller_id: p.seller_id || `ME`
			}));
			setProducts(mappedStored);
		}
	};

	return (
		<div className="font-poppins">
			<div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-2xl font-semibold">Product List</h2>
				</div>
				<div className="overflow-x-auto">
					<table className="w-95p table-auto border border-gray-700 mx-auto border-collapse">
						<thead>
							<tr className="bg-gray-200">
								<th className="px-4 py-2 text-left border border-gray-700">Image</th>
								<th className="px-4 py-2 text-left border border-gray-700">Product ID</th>
								<th className="px-4 py-2 text-left border border-gray-700">Seller ID</th>
								<th className="px-4 py-2 text-left border border-gray-700">Product Name</th>
								<th className="px-4 py-2 text-left border border-gray-700">Description</th>
								<th className="px-4 py-2 text-left border border-gray-700">Starting Price</th>
								<th className="px-4 py-2 text-left border border-gray-700">Auction End Time</th>
								<th className="px-4 py-2 text-left border border-gray-700">Category</th>
								<th className="px-4 py-2 text-left border border-gray-700">Last Bidder</th>
								<th className="px-4 py-2 text-left border border-gray-700">Last Bid</th>
								<th className="px-4 py-2 text-left border border-gray-700">Action</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan="10">Loading...</td>
								</tr>
							) : error ? (
								<tr>
									<td colSpan="10">Error: {error}</td>
								</tr>
							) : currentProducts.length === 0 ? (
								<tr>
									<td colSpan="10">No products found</td>
								</tr>
							) : (
								currentProducts.map((product, index) => {
									console.log("Rendering product:", product);
									return (
										<tr key={`${product.item_id}-${product.seller_id}`}>
											<td className="px-4 py-2 border border-gray-700">
												<img
													src={product.image || `https://picsum.photos/seed/${encodeURIComponent(product.item_name)}/100/100`}
													alt={product.item_name}
													className="w-16 h-16 object-cover rounded"
													onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(product.item_name)}/100/100`; }}
												/>
											</td>
											<td className="px-4 py-2 border border-gray-700">{product.item_id}</td>
											<td className="px-4 py-2 border border-gray-700">{product.seller_id}</td>
											<td className="px-4 py-2 border border-gray-700">{product.item_name}</td>
											<td className="px-4 py-2 border border-gray-700">{product.description}</td>
											<td className="px-4 py-2 border border-gray-700">{product.starting_price}</td>
											<td className="px-4 py-2 border border-gray-700">{new Date(product.auction_end_time).toLocaleString()}</td>
											<td className="px-4 py-2 border border-gray-700">{product.category}</td>
											<td className="px-4 py-2 border border-gray-700">{product.last_bidder || "None"}</td>
											<td className="px-4 py-2 border border-gray-700">{product.last_bid || "None"}</td>
											<td className="px-4 py-2 border border-gray-700">
												<button
													onClick={() => handleDelete(index)}
													className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
				<div className="flex justify-center mt-4">
					<button
						className="px-3 py-1 rounded bg-gray-100 mr-2"
						onClick={prevPage}
						disabled={currentPage === 1}
					>
						<FiChevronLeft />
					</button>
					<span className="px-3 py-1 rounded bg-gray-100 mr-2">
						{currentPage}
					</span>
					<button
						className="px-3 py-1 rounded bg-gray-100"
						onClick={nextPage}
						disabled={currentProducts.length < productsPerPage}
					>
						<FiChevronRight />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ViewProducts;
