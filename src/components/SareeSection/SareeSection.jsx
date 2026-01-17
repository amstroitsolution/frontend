import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function SareeSection() {
  const navigate = useNavigate();
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetchSareeSection();
  }, []);

  const fetchSareeSection = async () => {
    try {
      setLoading(true);

      const sectionsRes = await axios.get(`${API}/api/sections/active`);
      const sareeSection = sectionsRes.data.find(section =>
        section.name === 'saree-collections' ||
        section.displayName.toLowerCase().includes('saree')
      );

      if (sareeSection) {
        setSectionData(sareeSection);

        try {
          const sectionDataRes = await axios.get(`${API}/api/sections/${sareeSection._id}/data`);
          if (sectionDataRes.data && sectionDataRes.data.length > 0) {
            setSarees(sectionDataRes.data.slice(0, 8));
            setLoading(false);
            return;
          }
        } catch (err) {
          console.log('No section data found, trying women products...');
        }
      }

      try {
        const res = await axios.get(`${API}/api/women-products?category=${encodeURIComponent('Wedding → Designer Sarees')}`);
        if (res.data && res.data.length > 0) {
          setSarees(res.data.slice(0, 8));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('No Designer Sarees found, trying other categories...');
      }

      const fallbackCategories = [
        'Wedding → Silk Sarees',
        'Wedding → Cotton Sarees',
        'Sarees',
        'Silk Sarees'
      ];

      let allSarees = [];
      for (const category of fallbackCategories) {
        try {
          const res = await axios.get(`${API}/api/women-products?category=${encodeURIComponent(category)}`);
          if (res.data && res.data.length > 0) {
            allSarees = [...allSarees, ...res.data];
          }
        } catch (err) {
          console.log(`No sarees found for category: ${category}`);
        }
      }

      if (allSarees.length > 0) {
        setSarees(allSarees.slice(0, 8));
      }
    } catch (err) {
      console.error("Error fetching saree section:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="py-20 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
      <p className="text-gray-500">Curating saree collection...</p>
    </div>
  );

  if (!sarees.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#de3cad' }}></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: '#e854c1' }}></div>
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
            <span className="text-3xl">{sectionData?.icon || '🌸'}</span>
            <span className="font-semibold text-sm uppercase tracking-widest text-pink-600">
              {sectionData?.description || 'Traditional Elegance'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {sectionData?.displayName || 'Saree'} <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Timeless sarees that celebrate tradition with modern elegance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sarees.map((saree, idx) => (
            <ProductCard
              key={saree._id}
              product={saree}
              productType="Saree"
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
            onClick={() => navigate('/wedding/designer-sarees')}
            className="bg-[#de3cad] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#c42a94] hover:shadow-2xl hover:shadow-pink-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore Full Collection
          </button>
        </motion.div>
      </div>
    </section>
  );
}

