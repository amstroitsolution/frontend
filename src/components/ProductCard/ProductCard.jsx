import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleInquiryClick = (e) => {
    e.stopPropagation();
    setIsInquiryOpen(true);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    // Navigate to appropriate product detail page based on product type
    if (productType === 'KidsProduct') {
      navigate(`/kids/product/${product._id}`);
    } else if (productType === 'SpecialOffer') {
      navigate(`/special-offer/${product._id}`);
    } else if (productType === 'NewArrival') {
      navigate(`/new-arrival/${product._id}`);
    } else if (productType === 'TrendingItem') {
      navigate(`/trending-item/${product._id}`);
    } else {
      navigate(`/product/${product._id}`);
    }
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
                ? product.images[0].startsWith('http') 
                  ? product.images[0]
                  : `${(import.meta.env.VITE_API_BASE_URL || 'https://api.yashper.com').replace(/\/$/, '')}${product.images[0].startsWith('/') ? '' : '/'}${product.images[0]}`
                : product.image 
                  ? product.image.startsWith('http')
                    ? product.image
                    : `${(import.meta.env.VITE_API_BASE_URL || 'https://api.yashper.com').replace(/\/$/, '')}${product.image.startsWith('/') ? '' : '/'}${product.image}`
                  : 'https://via.placeholder.com/300x400'
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

          {/* Action Buttons Overlay - Always visible on mobile, hover on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300"
          >
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDetailsClick}
                className="bg-white text-slate-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                title="View Product Details"
              >
                <FaEye size={16} />
                <span className="text-sm font-semibold">View</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleInquiryClick}
                style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
                className="text-white px-4 py-2 rounded-full shadow-lg transition-all hover:opacity-90 flex items-center gap-2"
                title="Inquire About Product"
              >
                <FaEnvelope size={16} />
                <span className="text-sm font-semibold">Inquire</span>
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
