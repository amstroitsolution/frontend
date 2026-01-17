import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

const ProductPage = ({
    category,
    title,
    description,
    productType = "WomenProduct",
    apiEndpoint = "/api/women-products/active"
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                <h1 className="text-5xl md:text-6xl font-bold text-pink-700 tracking-tight mb-4 drop-shadow-sm">
                    {title}
                </h1>
                {description && (
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        {description}
                    </p>
                )}
                <div className="w-24 h-1 bg-pink-500 mx-auto mt-6 rounded-full"></div>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {products.map((item, i) => (
                    <ProductCard
                        key={item._id}
                        product={item}
                        productType={productType}
                        index={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
