import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com/").replace(/\/$/, "");

const KidsProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/api/kids-products`);
        setProducts(response.data.slice(0, 8)); // Show first 8 products
      } catch (error) {
        console.error("Error fetching kids products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="px-6 md:px-12 py-10 bg-gradient-to-b from-pink-50 to-white">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading kids products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="px-6 md:px-12 py-10 bg-gradient-to-b from-pink-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center text-pink-700 mb-4 tracking-tight">
          Kids Collection 💖
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Adorable and stylish outfits for your little ones, crafted with love and care.
        </p>
        <div className="w-20 h-1 bg-pink-500 mx-auto mt-6 rounded-full opacity-50"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item, idx) => (
          <ProductCard
            key={item._id}
            product={item}
            productType="KidsProduct"
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default KidsProduct;
