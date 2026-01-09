import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import InquiryForm from "../InquiryForm/InquiryForm";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function SareeSection() {
  const navigate = useNavigate();
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetchSareeSection();
  }, []);

  const fetchSareeSection = async () => {
    try {
      setLoading(true);
      
      // First, try to get the "Saree Collections" section from admin
      const sectionsRes = await axios.get(`${API}/api/sections/active`);
      const sareeSection = sectionsRes.data.find(section => 
        section.name === 'saree-collections' || 
        section.displayName.toLowerCase().includes('saree')
      );
      
      if (sareeSection) {
        setSectionData(sareeSection);
        
        // Get section data items
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
      
      // Primary: Fetch from "Wedding → Designer Sarees" category
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
      
      // Fallback: Try other saree categories
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
      
      // If we found products, use them
      if (allSarees.length > 0) {
        setSarees(allSarees.slice(0, 8));
      } else {
        // Use fallback data if no products found
        setSarees([
          {
            _id: "1",
            title: "Banarasi Silk Saree",
            price: 18999,
            images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80"],
            description: "Traditional Banarasi silk saree with gold zari work",
            category: "Silk Sarees"
          },
          {
            _id: "2",
            title: "Designer Georgette Saree",
            price: 12999,
            images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80"],
            description: "Elegant georgette saree with contemporary design",
            category: "Designer Sarees"
          },
          {
            _id: "3",
            title: "Cotton Handloom Saree",
            price: 8999,
            images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=500&q=80"],
            description: "Pure cotton handloom saree with traditional motifs",
            category: "Cotton Sarees"
          },
          {
            _id: "4",
            title: "Kanjivaram Silk Saree",
            price: 25999,
            images: ["https://images.unsplash.com/photo-1583391733981-24c4ec8d8d4f?auto=format&fit=crop&w=500&q=80"],
            description: "Authentic Kanjivaram silk saree with temple border",
            category: "Silk Sarees"
          }
        ]);
      }
    } catch (err) {
      console.error("Error fetching saree section:", err);
      // Use fallback data on error
      setSarees([
        {
          _id: "1",
          title: "Banarasi Silk Saree",
          price: 18999,
          images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80"],
          description: "Traditional Banarasi silk saree with gold zari work",
          category: "Silk Sarees"
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

  if (loading) return <div className="py-10 text-center">Loading sarees...</div>;
  if (!sarees.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#de3cad' }}></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: '#e854c1' }}></div>
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

        {/* Saree Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sarees.map((saree, idx) => (
            <motion.div
              key={saree._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={saree.images?.[0] || saree.image || saree.product_image}
                  alt={saree.title || saree.product_name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Inquiry Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleInquiry(saree)}
                    className="bg-white/90 text-pink-600 px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 hover:bg-white hover:scale-105"
                  >
                    <FaEnvelope size={14} />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                  {saree.title || saree.product_name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {saree.description || saree.product_description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-pink-600 font-bold text-xl">
                    ₹{typeof saree.price === 'number' ? saree.price.toLocaleString('en-IN') : (saree.price || saree.product_price || '0')}
                  </span>
                  <button
                    onClick={() => navigate(`/product/${saree._id}`)}
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
            onClick={() => navigate('/wedding/designer-sarees')}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Sarees
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
            category: selectedProduct.category || 'Sarees',
            badge: 'SAREE'
          }}
          productType="Saree"
        />
      )}
    </section>
  );
}
