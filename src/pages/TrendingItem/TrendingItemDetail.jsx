import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaFire } from 'react-icons/fa';
import InquiryForm from '../../components/InquiryForm/InquiryForm';

const API = (import.meta.env.VITE_API_BASE_URL || 'https://api.yashper.com').replace(/\/$/, '');

export default function TrendingItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API}/api/trending-items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error('Error fetching trending item:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Item Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  const images = item.images && item.images.length > 0 ? item.images : [item.image];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-6 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            <div>
              <motion.div
                className="relative rounded-xl overflow-hidden mb-4 bg-gray-100 group cursor-zoom-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img
                  src={images[selectedImage]?.startsWith('http') ? images[selectedImage] : `${API}${images[selectedImage]}`}
                  alt={item.title}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-150"
                />
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.badge}
                  </span>
                )}
                
                {/* Carousel Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </>
                )}
              </motion.div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-pink-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={img?.startsWith('http') ? img : `${API}${img}`}
                        alt={`${item.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <FaFire className="text-pink-600" />
                <span className="text-pink-600 font-semibold text-sm uppercase tracking-wide">
                  Trending This Week
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {item.title}
              </h1>

              {item.description && (
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.price && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-pink-600">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <button
                  onClick={() => setShowInquiry(true)}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Inquire Now
                </button>
              </div>

              {item.category && (
                <div className="border-t pt-6">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Category:</span> {item.category}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showInquiry && (
        <InquiryForm
          productId={item._id}
          productType="TrendingItem"
          productTitle={item.title}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  );
}
