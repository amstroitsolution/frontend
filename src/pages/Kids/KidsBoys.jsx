import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBolt, FaBaby, FaStar, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import InquiryForm from "../../components/InquiryForm/InquiryForm";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function KidsBoys() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API}/api/kids-products`);
                const boysProducts = res.data.filter(p => p.gender === "Boys");
                setProducts(boysProducts);
            } catch (err) {
                console.error("Error fetching boys products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleInquiry = (product) => {
        setSelectedProduct(product);
        setIsInquiryOpen(true);
    };

    const categories = [
        {
            title: "Ethnic Wear",
            icon: <FaBolt className="text-3xl" />,
            color: "from-blue-500 to-cyan-500",
            items: [
                { name: "Ethnic Jackets", link: "/kids/ethicjacket" },
                { name: "Ethnic Sets", link: "/kids/ethicsets" },
                { name: "Kurtas", link: "/kids/kurtaa" },
                { name: "Kurta Sherwani", link: "/kids/kurtasherwani" }
            ]
        },
        {
            title: "Baby Essentials",
            icon: <FaBaby className="text-3xl" />,
            color: "from-green-500 to-teal-500",
            items: [
                { name: "Bodysuits", link: "/kids/bodysuite" },
                { name: "Infant Clothing", link: "/kids/inflant" },
                { name: "Jhablas", link: "/kids/jhablas" },
                { name: "Swaddles", link: "/kids/swadless" }
            ]
        },
        {
            title: "Trending",
            icon: <FaStar className="text-3xl" />,
            color: "from-purple-500 to-indigo-500",
            items: [
                { name: "New Arrivals", link: "/kids/newarrivle" },
                { name: "Wedding Collection", link: "/kids/weddings" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-4"
                    >
                        Boys Collection
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/90"
                    >
                        Stylish kurtas, sherwanis & ethnic sets for your little champ
                    </motion.p>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}>
                                        {category.icon}
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-800">{category.title}</h2>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {category.items.map((item, itemIdx) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: itemIdx * 0.1 }}
                                            whileHover={{ y: -8, scale: 1.05 }}
                                        >
                                            <Link to={item.link}>
                                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300">
                                                    <h3 className="text-lg font-semibold text-slate-800 text-center">
                                                        {item.name}
                                                    </h3>
                                                    <div className={`mt-4 h-1 bg-gradient-to-r ${category.color} rounded-full`}></div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">
                            Featured <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Products</span>
                        </h2>
                        <p className="text-lg text-gray-600">Handpicked collection for boys</p>
                    </motion.div>

                    {loading ? (
                        <div className="text-center py-12">Loading products...</div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">No products available</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.slice(0, 8).map((product, idx) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0].startsWith('http') ? product.images[0] : `${API}${product.images[0]}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                        {product.category && (
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                    {product.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-slate-800 mb-2 line-clamp-2">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                        <div className="flex items-center justify-between">
                                            {product.price && (
                                                <p className="text-xl font-bold text-blue-600">₹{product.price.toLocaleString()}</p>
                                            )}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleInquiry(product)}
                                                style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
                className="text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 hover:opacity-90"
                                            >
                                                <FaEnvelope size={12} />
                                                <span>Inquire</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

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
                        title: selectedProduct.name,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        images: selectedProduct.images,
                        description: selectedProduct.description,
                        category: selectedProduct.category,
                        gender: selectedProduct.gender
                    }}
                    productType="KidsProduct"
                />
            )}
        </div>
    );
}
