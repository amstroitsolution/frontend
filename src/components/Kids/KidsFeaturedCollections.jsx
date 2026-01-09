import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaHeart, FaEye } from "react-icons/fa";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com/").replace(/\/$/, "");

export default function KidsFeaturedCollections() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API}/api/kids-products?featured=true`);
        setItems(res.data.slice(0, 6));
      } catch (err) {
        console.error("Kids Featured Collections fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading featured collections...</div>;
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <FaHeart className="text-purple-500 text-xl md:text-2xl" />
            <span className="text-purple-600 font-semibold text-xs md:text-sm uppercase tracking-widest">
              Handpicked for You
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Our most loved kids fashion pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="relative overflow-hidden h-80">
                <img
                  src={item.images?.[0]?.startsWith('http') ? item.images[0] : `${API}${item.images?.[0]}` || 'https://via.placeholder.com/400'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {item.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <Link to={`/kids/product/${item._id}`}>
                    <button className="bg-white text-slate-800 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 flex items-center gap-2 font-semibold">
                      <FaEye /> View Details
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-purple-600 font-bold text-xl">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-400 text-sm line-through ml-2">₹{item.originalPrice}</span>
                    )}
                  </div>
                  {item.discount > 0 && (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {item.discount}% OFF
                    </span>
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
