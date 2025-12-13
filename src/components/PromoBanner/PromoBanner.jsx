import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaGift, FaTruck, FaUndo, FaShieldAlt } from "react-icons/fa";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function PromoBanner() {
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default features (fallback)
  const defaultFeatures = [
    {
      icon: <FaTruck className="text-3xl" />,
      title: "Free Shipping",
      description: "On orders above ₹999",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaUndo className="text-3xl" />,
      title: "Easy Returns",
      description: "7 days return policy",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure Payment",
      description: "100% secure transactions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaGift className="text-3xl" />,
      title: "Special Offers",
      description: "Exclusive deals daily",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const [features, setFeatures] = useState(defaultFeatures);

  useEffect(() => {
    const fetchPromoBanner = async () => {
      try {
        // Try to fetch promo banner data from services or a dedicated endpoint
        const response = await axios.get(`${API}/api/services/active`);
        // Filter for promo/feature services
        const promoFeatures = response.data
          .filter(service => service.category === 'feature' || service.isFeature)
          .slice(0, 4);
        
        if (promoFeatures.length > 0) {
          const mappedFeatures = promoFeatures.map(feature => ({
            icon: <FaGift className="text-3xl" />, // Default icon
            title: feature.title,
            description: feature.description || feature.subtitle,
            color: feature.colorGradient || "from-blue-500 to-cyan-500"
          }));
          setFeatures(mappedFeatures);
        }
      } catch (error) {
        console.error("Error fetching promo banner:", error);
        // Keep default features
      } finally {
        setLoading(false);
      }
    };
    fetchPromoBanner();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: -20 }}
            animate={{ y: window.innerHeight + 20 }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Banner */}
        <motion.div
          className="rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1, #ffffff)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Mega Sale! Up to 50% OFF
              </motion.h2>
              <motion.p
                className="text-white/90 text-lg mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Limited time offer on all collections. Don't miss out!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/gallery"
                  className="inline-block bg-white px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  style={{ color: '#de3cad' }}
                >
                  Shop Now →
                </Link>
              </motion.div>
            </div>
            <div className="hidden md:flex justify-center">
              <motion.div
                className="relative"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold">50%</div>
                    <div className="text-xl">OFF</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
