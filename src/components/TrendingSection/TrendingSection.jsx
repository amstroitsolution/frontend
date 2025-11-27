import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaFire } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function TrendingSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API}/api/trending-items`);
        setItems(res.data || []);
      } catch (err) {
        console.error("TrendingSection fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading trending items...</div>;
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-pink-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaFire className="text-red-600 text-3xl" />
            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">
              Hot Right Now
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Trending <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">This Week</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what's hot and happening in fashion right now
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 8).map((item, idx) => (
            <ProductCard
              key={item._id}
              product={item}
              productType="TrendingItem"
              badgeText={item.badge}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
