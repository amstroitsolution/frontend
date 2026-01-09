import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStar, FaEye, FaEnvelope } from "react-icons/fa";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com/").replace(/\/$/, "");

export default function KidsNewArrivals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch products with NEW badge or recent products
        const res = await axios.get(`${API}/api/kids-products`);
        const newArrivals = res.data
          .filter(p => p.badge === 'NEW' || p.isActive)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);
        setItems(newArrivals);
      } catch (err) {
        console.error("Kids New Arrivals fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading new arrivals...</div>;
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-pink-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <FaStar className="text-pink-500 text-xl md:text-2xl" />
            <span className="text-pink-600 font-semibold text-xs md:text-sm uppercase tracking-widest">
              Fresh Kids Collection
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            New{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Arrivals
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Latest styles for your little ones
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.images?.[0]?.startsWith('http') ? item.images[0] : `${API}${item.images?.[0]}` || 'https://via.placeholder.com/300'}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.badge && (
                  <span className="absolute top-2 left-2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to={`/kids/product/${item._id}`}>
                    <button className="bg-white text-slate-800 p-3 rounded-full shadow-lg hover:bg-gray-100">
                      <FaEye size={16} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-pink-600 font-bold">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-gray-400 text-sm line-through">₹{item.originalPrice}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
