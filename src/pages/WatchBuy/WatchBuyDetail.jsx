import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaShare, FaChevronLeft, FaPlay } from 'react-icons/fa';
import InquiryForm from '../../components/InquiryForm/InquiryForm';

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function WatchBuyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API}/api/watchbuy/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error('Error fetching watch & buy item:', error);
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
        <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-pink-600 hover:underline flex items-center gap-2">
          <FaChevronLeft /> Go Back
        </button>
      </div>
    );
  }

  const getMediaUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${API}${url}`;
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
          {/* Media Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg group cursor-zoom-in"
            >
              {item.mediaType === 'video' ? (
                <video
                  src={getMediaUrl(item.mediaUrl)}
                  controls
                  autoPlay
                  loop
                  className="w-full h-auto object-contain"
                  poster={item.thumbnailUrl ? getMediaUrl(item.thumbnailUrl) : ''}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={getMediaUrl(item.mediaUrl)}
                  alt={item.title}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-150"
                />
              )}
              <span className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                WATCH & BUY
              </span>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {item.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  Watch & Buy Collection
                </span>
                {item.mediaType && (
                  <span className="text-gray-600 bg-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {item.mediaType === 'video' ? <FaPlay size={10} /> : null}
                    {item.mediaType === 'video' ? 'Video' : 'Image'}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            {item.price && (
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-pink-600">
                  ₹{item.price?.toLocaleString()}
                </span>
              </div>
            )}

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
                <FaEnvelope /> Inquire Now
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Collection:</span>
                  <span className="ml-2 font-medium">Watch & Buy</span>
                </div>
                <div>
                  <span className="text-gray-600">Media Type:</span>
                  <span className="ml-2 font-medium capitalize">{item.mediaType}</span>
                </div>
                {item.published !== undefined && (
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium">{item.published ? 'Published' : 'Draft'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Why Choose This?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Exclusive Watch & Buy Collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Premium Quality Guaranteed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Fast Inquiry Response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span>Customization Available</span>
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
            price: item.price,
            images: item.mediaUrl ? [item.mediaUrl] : [],
            image: getMediaUrl(item.mediaUrl),
            description: item.description || `Watch & Buy Collection - ${item.title}`,
            category: 'Watch & Buy',
            badge: 'FEATURED'
          }}
          productType="WatchBuy"
        />
      )}
    </div>
  );
}
