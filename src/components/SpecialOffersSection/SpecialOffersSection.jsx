import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaTag, FaClock } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function SpecialOffersSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API}/api/special-offers`);
        setItems(res.data || []);
      } catch (err) {
        console.error("SpecialOffers fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading special offers...</div>;
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-amber-50 via-white to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-orange-500 rounded-full blur-3xl"></div>
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
            <FaTag className="text-amber-600 text-2xl" />
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">
              Limited Time Only
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Special <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Offers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Grab these amazing deals before they're gone!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, 6).map((item, idx) => (
            <ProductCard
              key={item._id}
              product={{
                ...item,
                price: item.offerPrice || item.price
              }}
              productType="SpecialOffer"
              badgeText={item.discount ? `${item.discount}% OFF` : item.badge}
              index={idx}
              className="border-2 border-amber-200"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
