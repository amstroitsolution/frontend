import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaEye } from 'react-icons/fa';
import InquiryForm from '../InquiryForm/InquiryForm';

const ProductCard = ({
  product,
  productType = 'WomenProduct',
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
    // Navigate based on product type
    if (productType === 'KidsProduct') {
      navigate(`/kids/product/${product._id}`);
    } else if (productType === 'SpecialOffer') {
      navigate(`/special-offer/${product._id}`);
    } else if (productType === 'NewArrival') {
      navigate(`/new-arrival/${product._id}`);
    } else if (productType === 'TrendingItem') {
      navigate(`/trending-item/${product._id}`);
    } else if (productType === 'WatchBuy') {
      navigate(`/watchbuy/${product._id}`);
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  const API = (import.meta.env.VITE_API_BASE_URL || 'https://api.yashper.com').replace(/\/$/, '');

  const getImageUrl = () => {
    if (product.images && product.images[0]) {
      return product.images[0].startsWith('http')
        ? product.images[0]
        : `${API}${product.images[0].startsWith('/') ? '' : '/'}${product.images[0]}`;
    }
    if (product.image) {
      return product.image.startsWith('http')
        ? product.image
        : `${API}${product.image.startsWith('/') ? '' : '/'}${product.image}`;
    }
    if (product.mediaUrl) {
      return product.mediaUrl.startsWith('http')
        ? product.mediaUrl
        : `${API}${product.mediaUrl.startsWith('/') ? '' : '/'}${product.mediaUrl}`;
    }
    return 'https://via.placeholder.com/400x500?text=Yashper+Product';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-transparent flex flex-col h-full ${className}`}
      >
        {/* Media Container */}
        <div className="relative h-[520px] overflow-hidden">
          {product.mediaType === 'video' || (getImageUrl() && getImageUrl().toLowerCase().endsWith('.mp4')) ? (
            <video
              src={getImageUrl()}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <img
              src={getImageUrl()}
              alt={product.title || product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600?text=Product+Image';
              }}
            />
          )}

          {/* Badge */}
          {showBadge && (badgeText || product.badge) && (
            <div className="absolute top-4 left-4 z-10">
              <span className="text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}>
                {badgeText || product.badge}
              </span>
            </div>
          )}

          {/* Action Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDetailsClick}
              className="bg-white text-gray-800 px-5 py-2.5 rounded-full font-semibold shadow-xl flex items-center gap-2 hover:bg-pink-50 transition-colors"
            >
              <FaEye /> <span className="text-sm">View Details</span>
            </motion.button>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col items-center text-center flex-grow">
          <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
            {product.title || product.name}
          </h3>

          {product.description && (
            <p className="text-gray-500 text-xs mb-2 font-medium">
              {product.description.includes('Code:') ? product.description : `Code: ${product.description}`}
            </p>
          )}

          <div className="mt-auto pt-1 w-full">
            <p className="text-xl font-bold text-pink-600 mb-3">
              {product.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : 'Price on Request'}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleInquiryClick}
              className="w-full py-2.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-200 transition-all"
              style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
            >
              <FaEnvelope />
              <span className="text-sm">Inquire Now</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

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

