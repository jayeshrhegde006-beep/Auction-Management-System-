import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddsellerProd = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [endTime, setEndTime] = useState("");
	const [auctionStartTime, setAuctionStartTime] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const navigate = useNavigate();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const img = new Image();
				img.onload = () => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');

					const MAX_SIZE = 500;
					let width = img.width;
					let height = img.height;

					if (width > height) {
						if (width > MAX_SIZE) {
							height *= MAX_SIZE / width;
							width = MAX_SIZE;
						}
					} else {
						if (height > MAX_SIZE) {
							width *= MAX_SIZE / height;
							height = MAX_SIZE;
						}
					}

					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);

					const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
					setImage(dataUrl);
				};
				img.src = event.target.result;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create new product object matching the structure used in Products.jsx
		const newProduct = {
			item_name: name,
			starting_price: parseFloat(price).toFixed(2),
			last_bidder: "None",
			seller_username: localStorage.getItem("username") || "You",
			last_bid: parseFloat(price).toFixed(2),
			auction_end_time: new Date(endTime).toISOString(),
			auction_status: 'Active',
			image: image || `https://picsum.photos/seed/${Date.now()}/100/100`, // Fallback validation
			description: description,
			category: category
		};

		// Save to localStorage
		try {
			const existingProducts = JSON.parse(localStorage.getItem("mock_added_products") || "[]");
			localStorage.setItem("mock_added_products", JSON.stringify([newProduct, ...existingProducts]));
		} catch (error) {
			console.error("Storage limit exceeded:", error);
			alert("Failed to save product! The image is too large for local storage. Please choose a smaller image (under 1MB).");
			return;
		}

		alert(`Product "${name}" added successfully!`);
		navigate("/seller/products");
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-poppins flex justify-center">
			<div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8">
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-900">List New Auction Item</h2>
					<p className="mt-2 text-gray-600">Fill in the details to add your product to the marketplace</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Product Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							placeholder="e.g. Vintage Rolex Watch"
							className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
						/>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							rows="4"
							placeholder="Describe your item in detail..."
							className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
						></textarea>
					</div>

					{/* Row 1: Price & Category */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Starting Price (₹)</label>
							<input
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								required
								min="0"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
							<input
								type="text"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								required
								placeholder="e.g. Electronics, Art"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
							/>
						</div>
					</div>

					{/* Row 2: Dates */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Auction Start Time</label>
							<input
								type="datetime-local"
								value={auctionStartTime}
								onChange={(e) => setAuctionStartTime(e.target.value)}
								required
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Auction End Time</label>
							<input
								type="datetime-local"
								value={endTime}
								onChange={(e) => setEndTime(e.target.value)}
								required
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
							/>
						</div>
					</div>

					{/* Image Upload Section */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
						/>
						{image && (
							<div className="mt-4 w-full h-64 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex justify-center items-center">
								<img src={image} alt="Preview" className="h-full object-contain" />
							</div>
						)}
					</div>

					{/* Submit Button */}
					<div className="pt-4">
						<button type="submit" className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg font-bold rounded-xl shadow-lg transform transition hover:-translate-y-0.5">
							List Item for Auction
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddsellerProd;
