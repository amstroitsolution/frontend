import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const GownDressesSection = () => {
  const [featuredGowns, setFeaturedGowns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGowns = async () => {
      try {
        const response = await axios.get(`${API}/api/women-products/active`);
        // Filter for gowns and dresses category
        const gownsData = response.data.filter(product => 
          product.category?.toLowerCase().includes('gown') || 
          product.category?.toLowerCase().includes('dress')
        );
        setFeaturedGowns(gownsData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching gowns:", error);
        setFeaturedGowns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGowns();
  }, []);

  if (loading) {
    return (
      <section className="relative py-16 px-6 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#de3cad' }}></div>
          <p className="text-gray-600">Loading gowns collection...</p>
        </div>
      </section>
    );
  }

  if (featuredGowns.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-pink-200/20 rounded-full blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-pink-500"></div>
            <span className="text-pink-600 font-semibold uppercase tracking-widest text-sm">
              Elegance Redefined
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-pink-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Gowns & Dresses Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover stunning gowns and dresses that blend comfort, luxury, and artistry
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featuredGowns.map((item, index) => (
            <ProductCard
              key={item._id}
              product={item}
              productType="WomenProduct"
              badgeText={item.badge}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/dresses/gown-and-dresses"
            style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90"
          >
            View Full Collection
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GownDressesSection;
