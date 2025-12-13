import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaEye } from 'react-icons/fa';
import InquiryForm from '../InquiryForm/InquiryForm';

const ProductCard = ({ 
  product, 
  productType = 'KidsProduct',
  className = '',
  showBadge = true,
  badgeText = '',
  index = 0 
}) => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleInquiryClick = (e) => {
    e.stopPropagation();
    setIsInquiryOpen(true);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    setIsDetailsOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={
              product.images && product.images[0]
                ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${product.images[0]}`
                : product.image || 'https://via.placeholder.com/300x400'
            }
            alt={product.title || product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge */}
          {showBadge && (badgeText || product.badge) && (
            <div className="absolute top-3 left-3">
              <span className="text-white text-xs px-3 py-1 rounded-full font-bold" style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}>
                {badgeText || product.badge}
              </span>
            </div>
          )}

          {/* Action Buttons Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          >
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDetailsClick}
                className="bg-white text-slate-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                title="View Product Details"
              >
                <FaEye size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleInquiryClick}
                style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
                className="text-white p-3 rounded-full shadow-lg transition-all hover:opacity-90"
                title="Inquire About Product"
              >
                <FaEnvelope size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="p-4">
          <h3 className={`font-bold mb-2 line-clamp-2 ${className?.includes('text-white') ? 'text-white' : 'text-slate-800'}`}>
            {product.title || product.name}
          </h3>
          
          {product.description && (
            <p className={`text-sm mb-2 line-clamp-2 ${className?.includes('text-white') ? 'text-gray-300' : 'text-gray-600'}`}>
              {product.description}
            </p>
          )}
          
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <p className={`text-xl font-bold ${className?.includes('text-white') ? 'text-white' : ''}`}
                 style={!className?.includes('text-white') ? { color: '#de3cad' } : {}}>
                {product.price ? `₹${product.price}` : 'Price on Request'}
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDetailsClick}
                className="flex-1 bg-white border-2 border-slate-300 text-slate-700 px-4 py-3 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <FaEye size={14} />
                <span>View Details</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInquiryClick}
                style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
                className="flex-1 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:opacity-90"
              >
                <FaEnvelope size={14} />
                <span>Inquire</span>
              </motion.button>
            </div>
          </div>

          {/* Additional Product Info */}
          <div className="mt-3 flex flex-wrap gap-2">
            {product.category && (
              <span className={`text-xs px-2 py-1 rounded-full ${className?.includes('text-white') ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                {product.category}
              </span>
            )}
            {product.gender && (
              <span className={`text-xs px-2 py-1 rounded-full ${className?.includes('text-white') ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                {product.gender}
              </span>
            )}
            {product.ageGroup && (
              <span className={`text-xs px-2 py-1 rounded-full ${className?.includes('text-white') ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'}`}>
                {product.ageGroup}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Product Details Modal */}
      {isDetailsOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setIsDetailsOpen(false)}
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
                  src={
                    product.images && product.images[0]
                      ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${product.images[0]}`
                      : product.image || 'https://via.placeholder.com/400x500'
                  }
                  alt={product.title || product.name}
                  className="w-full h-80 md:h-96 object-cover rounded-2xl"
                />
              </div>
              
              {/* Product Details */}
              <div className="md:w-1/2 flex flex-col">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                    {product.title || product.name}
                  </h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {product.category && (
                      <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    )}
                    {product.gender && (
                      <span className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full">
                        {product.gender}
                      </span>
                    )}
                    {product.ageGroup && (
                      <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                        {product.ageGroup}
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-3xl font-bold mb-2" style={{ color: '#de3cad' }}>
                      {product.price ? `₹${product.price}` : 'Price on Request'}
                    </p>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <p className="text-lg text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </p>
                    )}
                  </div>
                  
                  {product.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-700 mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Additional Details */}
                  <div className="space-y-3 mb-6">
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Available Sizes:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Available Colors:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map((color, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.material && (
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Material:</h4>
                        <p className="text-gray-600">{product.material}</p>
                      </div>
                    )}
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
                    style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
                    className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:opacity-90"
                  >
                    <FaEnvelope size={16} />
                    <span>Inquire About This Product</span>
                  </motion.button>
                  
                  <button
                    onClick={() => setIsDetailsOpen(false)}
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
      <InquiryForm
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={product}
        productType={productType}
      />
    </>
  );
};

export default ProductCard;