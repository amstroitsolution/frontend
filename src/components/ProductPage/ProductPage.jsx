import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaEye } from "react-icons/fa";
import axios from "axios";
import InquiryForm from "../InquiryForm/InquiryForm";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const ProductPage = ({
    category,
    title,
    description,
    productType = "WomenProduct",
    apiEndpoint = "/api/women-products/active"
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [selectedForView, setSelectedForView] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API}${apiEndpoint}`);

                // Filter by category if provided
                let filtered = response.data;
                if (category) {
                    filtered = response.data.filter(p =>
                        p.category?.toLowerCase().includes(category.toLowerCase()) ||
                        p.subcategory?.toLowerCase().includes(category.toLowerCase())
                    );
                }

                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, apiEndpoint]);

    const handleInquiry = (product) => {
        setSelectedProduct(product);
        setIsInquiryOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading products...</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">No Products Found</h2>
                    <p className="text-gray-600">Products for this category will be available soon.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-pink-50 via-white to-rose-50 min-h-screen py-20 px-6">
            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-semibold text-pink-700 tracking-wide mb-4 drop-shadow-sm">
                    {title}
                </h1>
                {description && (
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                        {description}
                    </p>
                )}
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {products.map((item, i) => (
                    <motion.div
                        key={item._id}
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="relative bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl hover:shadow-pink-100 transition-shadow duration-500"
                    >
                        <div className="h-[420px] overflow-hidden">
                            <motion.img
                                src={
                                    item.images && item.images.length > 0
                                        ? item.images[0].startsWith("http")
                                            ? item.images[0]
                                            : `${API}${item.images[0]}`
                                        : "https://via.placeholder.com/400"
                                }
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex flex-col gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleInquiry(item)}
                                    className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg flex items-center gap-2"
                                >
                                    <FaEnvelope /> Inquire Now
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedForView(item)}
                                    className="bg-white text-pink-700 px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition-all flex items-center gap-2"
                                >
                                    <FaEye /> View Details
                                </motion.button>
                            </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                {item.description || item.subtitle}
                            </p>
                            <p className="text-pink-600 font-bold text-lg mt-2">₹{item.price}</p>
                            {item.badge && (
                                <span className="inline-block mt-2 bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleInquiry(item)}
                                className="w-full mt-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                            >
                                <FaEnvelope size={14} />
                                <span>Inquire Now</span>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View Details Modal */}
            {selectedForView && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    onClick={() => setSelectedForView(null)}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
                    >
                        <img
                            src={
                                selectedForView.images && selectedForView.images.length > 0
                                    ? selectedForView.images[0].startsWith("http")
                                        ? selectedForView.images[0]
                                        : `${API}${selectedForView.images[0]}`
                                    : "https://via.placeholder.com/400"
                            }
                            alt={selectedForView.title}
                            className="rounded-2xl w-full h-80 object-cover mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-pink-700 mb-2 text-center">
                            {selectedForView.title}
                        </h3>
                        <p className="text-pink-600 font-bold text-xl mb-2 text-center">
                            ₹{selectedForView.price}
                        </p>
                        <p className="text-gray-600 mb-4 text-center">
                            {selectedForView.description || selectedForView.subtitle}
                        </p>
                        {selectedForView.category && (
                            <p className="text-sm text-gray-500 mb-4 text-center">
                                Category: {selectedForView.category}
                            </p>
                        )}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    setSelectedForView(null);
                                    handleInquiry(selectedForView);
                                }}
                                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white px-5 py-2 rounded-full hover:from-pink-700 hover:to-rose-700 transition-all font-semibold flex items-center justify-center gap-2"
                            >
                                <FaEnvelope /> Inquire Now
                            </button>
                            <button
                                onClick={() => setSelectedForView(null)}
                                className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Inquiry Form Modal */}
            {selectedProduct && (
                <InquiryForm
                    isOpen={isInquiryOpen}
                    onClose={() => {
                        setIsInquiryOpen(false);
                        setSelectedProduct(null);
                    }}
                    product={{
                        _id: selectedProduct._id,
                        title: selectedProduct.title,
                        name: selectedProduct.title,
                        price: selectedProduct.price,
                        images: selectedProduct.images || [],
                        image:
                            selectedProduct.images && selectedProduct.images.length > 0
                                ? selectedProduct.images[0].startsWith("http")
                                    ? selectedProduct.images[0]
                                    : `${API}${selectedProduct.images[0]}`
                                : "https://via.placeholder.com/400",
                        description: selectedProduct.description || selectedProduct.subtitle,
                        category: selectedProduct.category || category,
                        badge: selectedProduct.badge || "NEW"
                    }}
                    productType={productType}
                />
            )}
        </div>
    );
};

export default ProductPage;
