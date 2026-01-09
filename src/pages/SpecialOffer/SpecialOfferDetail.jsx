import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaShare, FaChevronLeft, FaTag, FaClock } from 'react-icons/fa';
import InquiryForm from '../../components/InquiryForm/InquiryForm';

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function SpecialOfferDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API}/api/special-offers/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error('Error fetching special offer:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Special Offer Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-pink-600 hover:underline flex items-center gap-2">
          <FaChevronLeft /> Go Back
        </button>
      </div>
    );
  }

  const getImageUrl = (img) => {
    if (!img) return 'https://via.placeholder.com/600';
    return img.startsWith('http') ? img : `${API}${img}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-6 transition-colors"
        >
          <FaChevronLeft /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg group cursor-zoom-in"
            >
              <img
                src={getImageUrl(item.images?.[selectedImage])}
                alt={item.title}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-150"
              />
              <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                <FaTag /> SPECIAL OFFER
              </span>
              {item.discount && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {item.discount}% OFF
                </span>
              )}
              
              {/* Carousel Navigation Arrows */}
              {item.images && item.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImage + 1} / {item.images.length}
                  </div>
                </>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {item.images && item.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {item.images.map((img, idx) => (
                  <motion.img
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    src={getImageUrl(img)}
                    alt={`${item.title} ${idx + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                      selectedImage === idx
                        ? 'ring-4 ring-pink-500 shadow-lg'
                        : 'ring-2 ring-gray-200 hover:ring-pink-300'
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {item.title}
              </h1>
              {item.subtitle && (
                <p className="text-lg text-gray-600 mb-3">{item.subtitle}</p>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-gray-600 bg-pink-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <FaTag size={12} /> Special Offer
                </span>
                {item.validUntil && (
                  <span className="text-gray-600 bg-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FaClock size={12} /> Valid Until: {new Date(item.validUntil).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {item.offerPrice && (
                <>
                  <span className="text-4xl font-bold text-pink-600">
                    ₹{item.offerPrice?.toLocaleString()}
                  </span>
                  {item.originalPrice && item.originalPrice > item.offerPrice && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Save ₹{(item.originalPrice - item.offerPrice).toLocaleString()}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            {item.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsInquiryOpen(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaEnvelope /> Grab This Offer
              </motion.button>
            </div>

            {/* Offer Details */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 space-y-3 border-2 border-pink-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <FaTag className="text-pink-600" /> Offer Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {item.discount && (
                  <div>
                    <span className="text-gray-600">Discount:</span>
                    <span className="ml-2 font-bold text-green-600">{item.discount}% OFF</span>
                  </div>
                )}
                {item.validUntil && (
                  <div>
                    <span className="text-gray-600">Valid Until:</span>
                    <span className="ml-2 font-medium">{new Date(item.validUntil).toLocaleDateString()}</span>
                  </div>
                )}
                {item.category && (
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium">{item.category}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Why This Offer */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Why Grab This Offer?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Limited Time Special Offer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Exclusive Discount Available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Premium Quality Guaranteed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Fast Inquiry Response</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {item && (
        <InquiryForm
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          product={{
            _id: item._id,
            title: item.title,
            name: item.title,
            price: item.offerPrice || item.originalPrice,
            images: item.images || [],
            image: getImageUrl(item.images?.[0]),
            description: item.description || item.subtitle,
            category: item.category || 'Special Offer',
            badge: item.discount ? `${item.discount}% OFF` : 'SPECIAL OFFER'
          }}
          productType="SpecialOffer"
        />
      )}
    </div>
  );
}
