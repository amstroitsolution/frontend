import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback stats
  const fallbackStats = [
    { _id: "1", value: 25, label: "Years Experience", suffix: "+", order: 1 },
    { _id: "2", value: 500, label: "Projects Completed", suffix: "+", order: 2 },
    { _id: "3", value: 98, label: "Client Satisfaction", suffix: "%", order: 3 },
    { _id: "4", value: 50, label: "Expert Team Members", suffix: "+", order: 4 }
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API}/api/stats/active`);
        if (response.data && response.data.length > 0) {
          setStats(response.data);
        } else {
          setStats(fallbackStats);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stats...</p>
        </div>
      </section>
    );
  }

  if (stats.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-600 font-medium text-sm uppercase tracking-wider">Our Impact</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="relative inline-block">
                <motion.h3 
                  className="text-5xl md:text-6xl font-bold text-gray-900 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                  <span className="text-red-600">{stat.suffix}</span>
                </motion.h3>
                {/* Decorative line */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-500"></div>
              </div>
              <p className="text-gray-600 font-medium mt-4">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
