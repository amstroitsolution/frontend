import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

export default function TrendingKids() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data for demo
  const fallbackItems = [
    {
      _id: 1,
      title: "Floral Lehenga Set",
      price: 2499,
      images: [],
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=300&h=400&fit=crop",
      badge: "TRENDING",
      category: "Ethnic Wear",
      gender: "Girls"
    },
    {
      _id: 2,
      title: "Ethnic Kurta Set",
      price: 1799,
      images: [],
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&h=400&fit=crop",
      badge: "HOT",
      category: "Traditional",
      gender: "Boys"
    },
    {
      _id: 3,
      title: "Designer Gown",
      price: 3299,
      images: [],
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=400&fit=crop",
      badge: "NEW",
      category: "Party Wear",
      gender: "Girls"
    },
    {
      _id: 4,
      title: "Party Dress",
      price: 1999,
      images: [],
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=400&fit=crop",
      badge: "BESTSELLER",
      category: "Casual",
      gender: "Girls"
    }
  ];

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/kids-products?featured=true');
        if (response.ok) {
          const data = await response.json();
          setTrendingItems(data.length > 0 ? data.slice(0, 4) : fallbackItems);
        } else {
          setTrendingItems(fallbackItems);
        }
      } catch (error) {
        console.error('Error fetching trending items:', error);
        setTrendingItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingItems();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaFire className="text-red-500 text-3xl" />
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">
              What's Hot
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Trending <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Now</span>
          </h2>
          <p className="text-lg text-gray-600">Most loved by parents & kids</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trendingItems.map((item, idx) => (
            <ProductCard
              key={item._id}
              product={item}
              productType="KidsProduct"
              badgeText={item.badge}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
