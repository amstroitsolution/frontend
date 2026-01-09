import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaTag, FaEye } from "react-icons/fa";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com/").replace(/\/$/, "");

export default function KidsSpecialOffers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API}/api/kids-products`);
        const offers = res.data
          .filter(p => p.discount > 0 || p.badge === 'SALE')
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 8);
        setItems(offers);
      } catch (err) {
        console.error("Kids Special Offers fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading special offers...</div>;
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-pink-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-orange-500 rounded-full blur-3xl"></div>
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
            <FaTag className="text-red-500 text-xl md:text-2xl" />
            <span className="text-red-600 font-semibold text-xs md:text-sm uppercase tracking-widest">
              Limited Time Deals
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            Special{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Offers
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Amazing discounts on kids fashion
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group relative"
            >
              {item.discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  {item.discount}% OFF
                </div>
              )}
              <div className="relative overflow-hidden">
                <img
                  src={item.images?.[0]?.startsWith('http') ? item.images[0] : `${API}${item.images?.[0]}` || 'https://via.placeholder.com/300'}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
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
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600 font-bold text-lg">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-gray-400 text-sm line-through">₹{item.originalPrice}</span>
                  )}
                </div>
                {item.originalPrice && (
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full inline-block">
                    Save ₹{item.originalPrice - item.price}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
