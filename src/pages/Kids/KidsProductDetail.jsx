import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHeart, FaShoppingCart, FaShare, FaChevronLeft } from 'react-icons/fa';
import InquiryForm from '../../components/InquiryForm/InquiryForm';

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com").replace(/\/$/, "");

export default function KidsProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/api/kids-products/${id}`);
        setProduct(res.data);
        if (res.data.images?.length > 0) setSelectedImage(0);
        if (res.data.sizes?.length > 0) setSelectedSize(res.data.sizes[0]);
        if (res.data.colors?.length > 0) setSelectedColor(res.data.colors[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/kids" className="text-pink-600 hover:underline">
          ← Back to Kids Collection
        </Link>
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/kids" className="hover:text-pink-600">Kids</Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>

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
                src={getImageUrl(product.images?.[selectedImage])}
                alt={product.title}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-150"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {product.badge}
                </span>
              )}
              {product.discount > 0 && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {product.discount}% OFF
                </span>
              )}
              
              {/* Carousel Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                </>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <motion.img
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    src={getImageUrl(img)}
                    alt={`${product.title} ${idx + 1}`}
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
                {product.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
                <span className="text-gray-600 bg-blue-100 px-3 py-1 rounded-full text-sm">
                  {product.gender}
                </span>
                {product.ageGroup && (
                  <span className="text-gray-600 bg-purple-100 px-3 py-1 rounded-full text-sm">
                    {product.ageGroup}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-pink-600">
                ₹{product.price?.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description || 'No description available.'}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Size:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-pink-500 text-white border-pink-500 shadow-lg'
                          : 'border-gray-300 hover:border-pink-500 hover:bg-pink-50'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Color:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2.5 border-2 rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-pink-500 text-white border-pink-500 shadow-lg'
                          : 'border-gray-300 hover:border-pink-500 hover:bg-pink-50'
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
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
                <FaShoppingCart /> Inquire Now
              </motion.button>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.material && (
                  <div>
                    <span className="text-gray-600">Material:</span>
                    <span className="ml-2 font-medium">{product.material}</span>
                  </div>
                )}
                {product.ageGroup && (
                  <div>
                    <span className="text-gray-600">Age Group:</span>
                    <span className="ml-2 font-medium">{product.ageGroup}</span>
                  </div>
                )}
                {product.gender && (
                  <div>
                    <span className="text-gray-600">Gender:</span>
                    <span className="ml-2 font-medium">{product.gender}</span>
                  </div>
                )}
                {product.category && (
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium">{product.category}</span>
                  </div>
                )}
              </div>
              {product.tags && product.tags.length > 0 && (
                <div className="pt-3 border-t">
                  <span className="text-gray-600 text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded-full text-xs text-gray-700 border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {product && (
        <InquiryForm
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          product={{
            _id: product._id,
            title: product.title,
            name: product.title,
            price: product.price,
            images: product.images || [],
            image: getImageUrl(product.images?.[0]),
            description: product.description,
            category: product.category,
            badge: product.badge || 'KIDS',
            selectedSize,
            selectedColor
          }}
          productType="KidsProduct"
        />
      )}
    </div>
  );
}
