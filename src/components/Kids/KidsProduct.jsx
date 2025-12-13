// src/components/KidsProduct.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaEye } from "react-icons/fa";
import axios from "axios";
import InquiryForm from "../InquiryForm/InquiryForm";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const KidsProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/api/kids-products`);
        setProducts(response.data.slice(0, 8)); // Show first 8 products
      } catch (error) {
        console.error("Error fetching kids products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInquiry = (product) => {
    setSelectedProduct(product);
    setIsInquiryOpen(true);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  if (loading) {
    return (
      <div className="px-6 md:px-12 py-10 bg-gradient-to-b from-pink-50 to-white">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="px-6 md:px-12 py-10 bg-gradient-to-b from-pink-50 to-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-700 mb-10">
        Kids Collection 💖
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <div className="overflow-hidden relative">
              <img
                src={item.images && item.images.length > 0 
                  ? (item.images[0].startsWith('http') ? item.images[0] : `${API}${item.images[0]}`)
                  : item.image || "https://via.placeholder.com/400"}
                alt={item.title || item.name}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleViewDetails(item)}
                    className="bg-white text-slate-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                    title="View Product Details"
                  >
                    <FaEye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleInquiry(item)}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-3 rounded-full shadow-lg hover:from-pink-700 hover:to-rose-700 transition-all"
                    title="Inquire About Product"
                  >
                    <FaEnvelope size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-2 line-clamp-2">
                {item.title || item.name}
              </h3>
              <p className="text-green-600 font-bold mb-2">₹{item.price}</p>
              <p className="text-gray-500 text-sm mb-2">{item.category || 'Kids Wear'}</p>
              <div className="flex items-center justify-between mb-3">
                {item.badge && (
                  <span className="inline-block bg-pink-100 text-pink-600 text-xs font-medium px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleViewDetails(item)}
                  className="flex-1 bg-white border-2 border-slate-300 text-slate-700 px-3 py-2 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center space-x-1"
                >
                  <FaEye size={12} />
                  <span>Details</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInquiry(item)}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-2 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all flex items-center justify-center space-x-1"
                >
                  <FaEnvelope size={12} />
                  <span>Inquire</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && isDetailsOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => {
            setIsDetailsOpen(false);
            setSelectedProduct(null);
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="md:w-1/2">
                <img
                  src={selectedProduct.images && selectedProduct.images.length > 0 
                    ? (selectedProduct.images[0].startsWith('http') ? selectedProduct.images[0] : `${API}${selectedProduct.images[0]}`)
                    : selectedProduct.image || "https://via.placeholder.com/400"}
                  alt={selectedProduct.title || selectedProduct.name}
                  className="w-full h-80 md:h-96 object-cover rounded-2xl"
                />
              </div>
              
              {/* Product Details */}
              <div className="md:w-1/2 flex flex-col">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                    {selectedProduct.title || selectedProduct.name}
                  </h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full">
                      Kids Collection
                    </span>
                    {selectedProduct.badge && (
                      <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-red-700 mb-2">
                      ₹{selectedProduct.price}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Product Details</h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {selectedProduct.description || selectedProduct.title || selectedProduct.name}
                    </p>
                    <div className="space-y-2">
                      {selectedProduct.category && (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Category:</span> {selectedProduct.category}
                        </p>
                      )}
                      {selectedProduct.gender && (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Gender:</span> {selectedProduct.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsDetailsOpen(false);
                      setIsInquiryOpen(true);
                    }}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FaEnvelope size={16} />
                    <span>Inquire About This Product</span>
                  </motion.button>
                  
                  <button
                    onClick={() => {
                      setIsDetailsOpen(false);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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
            title: selectedProduct.title || selectedProduct.name,
            name: selectedProduct.title || selectedProduct.name,
            price: selectedProduct.price,
            images: selectedProduct.images || [],
            image: selectedProduct.images && selectedProduct.images.length > 0 
              ? (selectedProduct.images[0].startsWith('http') ? selectedProduct.images[0] : `${API}${selectedProduct.images[0]}`)
              : selectedProduct.image || "https://via.placeholder.com/400",
            description: selectedProduct.description || selectedProduct.title || selectedProduct.name,
            category: selectedProduct.category || 'Kids Collection',
            badge: selectedProduct.badge || 'KIDS'
          }}
          productType="KidsProduct"
        />
      )}
    </div>
  );
};

export default KidsProduct;
