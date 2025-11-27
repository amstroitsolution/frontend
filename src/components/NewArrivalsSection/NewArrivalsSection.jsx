import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function NewArrivalsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API}/api/new-arrivals`);
        setItems(res.data || []);
      } catch (err) {
        console.error("NewArrivals fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading new arrivals...</div>;
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <FaStar className="text-amber-500 text-xl md:text-2xl" />
            <span className="text-purple-600 font-semibold text-xs md:text-sm uppercase tracking-widest">
              Fresh Arrivals
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            New{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Arrivals
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Be the first to explore our latest collection
          </p>
        </motion.div>

        {/* FINAL FIXED RESPONSIVE GRID */}
        <div className="
            grid
            grid-cols-2
            xs:grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-3 sm:gap-4 md:gap-5
        ">
          {items.slice(0, 6).map((item, idx) => (
            <ProductCard
              key={item._id}
              product={item}
              productType="NewArrival"
              badgeText={item.badge}
              index={idx}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
