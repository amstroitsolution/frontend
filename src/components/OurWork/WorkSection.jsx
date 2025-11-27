// client/frontend/src/components/OurWork/WorkSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import WorkItem from "./WorkItem";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function WorkSection({ title = "Our Work", limit = 6 }) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/works`);
      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      setWorks(items.slice(0, limit));
    } catch (err) {
      console.error("WorkSection fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Clean Background Effects */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-4"
            />
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Portfolio</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mt-4 mb-4 leading-tight">
              {title.split(' ').map((word, i) => 
                i === title.split(' ').length - 1 ? 
                <span key={i} className="bg-gradient-to-r from-red-800 via-red-600 to-amber-500 bg-clip-text text-transparent font-black">{word}</span> : 
                word + ' '
              )}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Showcasing our finest craftsmanship and projects
            </p>
          </motion.div>
        </div>

        {loading && (
          <div className="text-center text-gray-500 py-10">Loading portfolio...</div>
        )}

        {!loading && works.length === 0 && (
          <div className="text-center text-gray-500 py-10">No portfolio items to show yet.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((w) => (
            <WorkItem key={w._id} work={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
