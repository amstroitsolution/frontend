import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCrown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function FeaturedCollectionSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API}/api/featured-collections`);
        setItems(res.data || []);
      } catch (err) {
        console.error("FeaturedCollection fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (items.length > 3) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(items.length / 3));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [items.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(items.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(items.length / 3)) % Math.ceil(items.length / 3));
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * 3;
    return items.slice(startIndex, startIndex + 3);
  };

  if (loading) return <div className="py-10 text-center">Loading featured collections...</div>;
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
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
            <FaCrown className="text-amber-400 text-3xl" />
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">
              Curated For You
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Handpicked premium collections just for you
          </p>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getCurrentItems().map((item, idx) => (
              <ProductCard
                key={`${currentSlide}-${item._id}`}
                product={item}
                productType="FeaturedCollection"
                badgeText={item.badge}
                index={idx}
                className="bg-slate-800 border border-slate-700 text-white"
              />
            ))}
          </motion.div>

          {items.length > 3 && (
            <>
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              >
                <FaChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              >
                <FaChevronRight size={20} />
              </motion.button>
            </>
          )}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(items.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-amber-400 w-8' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
