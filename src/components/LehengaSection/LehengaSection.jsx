import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import InquiryForm from "../InquiryForm/InquiryForm";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function LehengaSection() {
  const navigate = useNavigate();
  const [lehengas, setLehengas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetchLehengaSection();
  }, []);

  const fetchLehengaSection = async () => {
    try {
      setLoading(true);
      
      // First, try to get the "Lehenga Collections" section from admin
      const sectionsRes = await axios.get(`${API}/api/sections/active`);
      const lehengaSection = sectionsRes.data.find(section => 
        section.name === 'lehenga-collections' || 
        section.displayName.toLowerCase().includes('lehenga')
      );
      
      if (lehengaSection) {
        setSectionData(lehengaSection);
        
        // Get section data items
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
      
      // Primary: Fetch from "Wedding → Party Wear Lehengas" category
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
      
      // Fallback: Try other lehenga categories
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
      
      // If we found products, use them
      if (allLehengas.length > 0) {
        setLehengas(allLehengas.slice(0, 8));
      } else {
        // Use fallback data if no products found
        setLehengas([
          {
            _id: "1",
            title: "Royal Bridal Lehenga",
            price: 45999,
            images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80"],
            description: "Stunning red bridal lehenga with heavy embroidery and zari work",
            category: "Bridal Lehengas"
          },
          {
            _id: "2", 
            title: "Pink Party Wear Lehenga",
            price: 28999,
            images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=500&q=80"],
            description: "Beautiful pink lehenga perfect for parties and celebrations",
            category: "Party Wear Lehengas"
          },
          {
            _id: "3",
            title: "Golden Designer Lehenga", 
            price: 52999,
            images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80"],
            description: "Elegant golden lehenga with intricate mirror work",
            category: "Designer Lehengas"
          },
          {
            _id: "4",
            title: "Maroon Velvet Lehenga",
            price: 38999,
            images: ["https://images.unsplash.com/photo-1583391733981-24c4ec8d8d4f?auto=format&fit=crop&w=500&q=80"],
            description: "Rich maroon velvet lehenga with gold embellishments",
            category: "Velvet Lehengas"
          }
        ]);
      }
    } catch (err) {
      console.error("Error fetching lehenga section:", err);
      // Use fallback data on error
      setLehengas([
        {
          _id: "1",
          title: "Royal Bridal Lehenga",
          price: 45999,
          images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80"],
          description: "Stunning red bridal lehenga with heavy embroidery",
          category: "Bridal Lehengas"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = (product) => {
    setSelectedProduct(product);
    setIsInquiryOpen(true);
  };

  if (loading) return <div className="py-10 text-center">Loading lehengas...</div>;
  if (!lehengas.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#de3cad' }}></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl" style={{ background: '#e854c1' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
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

        {/* Lehenga Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lehengas.map((lehenga, idx) => (
            <motion.div
              key={lehenga._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={lehenga.images?.[0] || lehenga.image || lehenga.product_image}
                  alt={lehenga.title || lehenga.product_name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Inquiry Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleInquiry(lehenga)}
                    className="bg-white/90 text-pink-600 px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 hover:bg-white hover:scale-105"
                  >
                    <FaEnvelope size={14} />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                  {lehenga.title || lehenga.product_name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {lehenga.description || lehenga.product_description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-pink-600 font-bold text-xl">
                    ₹{typeof lehenga.price === 'number' ? lehenga.price.toLocaleString('en-IN') : (lehenga.price || lehenga.product_price || '0')}
                  </span>
                  <button
                    onClick={() => navigate(`/product/${lehenga._id}`)}
                    className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors duration-200"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button 
            onClick={() => navigate('/wedding/party-wear-lehengas')}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Lehengas
          </button>
        </motion.div>
      </div>

      {/* Inquiry Form Modal */}
      {selectedProduct && (
        <InquiryForm
          isOpen={isInquiryOpen}
          onClose={() => {
            setIsInquiryOpen(false);
            setSelectedProduct(null);
          }}
          product={{
            _id: selectedProduct._id,
            title: selectedProduct.title || selectedProduct.product_name,
            name: selectedProduct.title || selectedProduct.product_name,
            price: selectedProduct.price || selectedProduct.product_price,
            images: selectedProduct.images || [selectedProduct.image || selectedProduct.product_image],
            image: selectedProduct.images?.[0] || selectedProduct.image || selectedProduct.product_image,
            description: selectedProduct.description || selectedProduct.product_description,
            category: selectedProduct.category || 'Lehengas',
            badge: 'LEHENGA'
          }}
          productType="Lehenga"
        />
      )}
    </section>
  );
}
