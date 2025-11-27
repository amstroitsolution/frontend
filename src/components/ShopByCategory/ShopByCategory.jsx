import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API}/api/shop-categories/active`);
        // Map the data to include proper image URLs
        const mappedCategories = response.data.map(cat => ({
          ...cat,
          id: cat._id,
          color: cat.colorGradient || "from-pink-500 to-rose-500",
          items: cat.itemsCount || "0 Items",
          image: cat.image 
            ? (cat.image.startsWith('http') ? cat.image : `${API}${cat.image}`)
            : "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop"
        }));
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Shop by <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed for every occasion
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.6 }}
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider mb-2 block opacity-90">
                      {category.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.items}</p>
                    
                    <Link
                      to={category.link}
                      className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 group-hover:gap-3"
                    >
                      Shop Now <FaArrowRight className="text-sm" />
                    </Link>
                  </motion.div>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`bg-gradient-to-r ${category.color} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                    NEW
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Collections <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
