import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function LehengaSection() {
  const navigate = useNavigate();
  const [lehengas, setLehengas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetchLehengaSection();
  }, []);

  const fetchLehengaSection = async () => {
    try {
      setLoading(true);

      const sectionsRes = await axios.get(`${API}/api/sections/active`);
      const lehengaSection = sectionsRes.data.find(section =>
        section.name === 'lehenga-collections' ||
        section.displayName.toLowerCase().includes('lehenga')
      );

      if (lehengaSection) {
        setSectionData(lehengaSection);

        try {
          const sectionDataRes = await axios.get(`${API}/api/sections/${lehengaSection._id}/data`);
          if (sectionDataRes.data && sectionDataRes.data.length > 0) {
            setLehengas(sectionDataRes.data.slice(0, 8));
            setLoading(false);
            return;
          }
        } catch (err) {
          console.log('No section data found, trying women products...');
        }
      }

      try {
        const res = await axios.get(`${API}/api/women-products?category=${encodeURIComponent('Wedding → Party Wear Lehengas')}`);
        if (res.data && res.data.length > 0) {
          setLehengas(res.data.slice(0, 8));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('No Party Wear Lehengas found, trying other categories...');
      }

      const fallbackCategories = [
        'Wedding → Bridal Lehengas',
        'Lehengas',
        'Bridal Lehengas'
      ];

      let allLehengas = [];
      for (const category of fallbackCategories) {
        try {
          const res = await axios.get(`${API}/api/women-products?category=${encodeURIComponent(category)}`);
          if (res.data && res.data.length > 0) {
            allLehengas = [...allLehengas, ...res.data];
          }
        } catch (err) {
          console.log(`No lehengas found for category: ${category}`);
        }
      }

      if (allLehengas.length > 0) {
        setLehengas(allLehengas.slice(0, 8));
      }
    } catch (err) {
      console.error("Error fetching lehenga section:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="py-20 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
      <p className="text-gray-500">Discovering royal lehengas...</p>
    </div>
  );

  if (!lehengas.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#de3cad' }}></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl" style={{ background: '#e854c1' }}></div>
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
            <span className="text-3xl">{sectionData?.icon || '👑'}</span>
            <span className="font-semibold text-sm uppercase tracking-widest text-pink-600">
              {sectionData?.description || 'Royal Collection'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {sectionData?.displayName || 'Lehenga'} <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exquisite lehengas crafted for your special moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lehengas.map((lehenga, idx) => (
            <ProductCard
              key={lehenga._id}
              product={lehenga}
              productType="Lehenga"
              index={idx}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() => navigate('/wedding/bridal-lehengas')}
            className="bg-[#de3cad] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#c42a94] hover:shadow-2xl hover:shadow-pink-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore Full Collection
          </button>
        </motion.div>
      </div>
    </section>
  );
}

