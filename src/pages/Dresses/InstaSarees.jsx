import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import InquiryForm from "../../components/InquiryForm/InquiryForm";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const InstaSarees = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSarees();
  }, []);

  const fetchSarees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/women-products?category=Insta Sarees`);
      const products = res.data;
      
      // If no products, use fallback data
      if (products.length === 0) {
        setSarees([
          {
            _id: "1",
            title: "Blush Silk Saree 🌸",
            price: 3499,
            images: ["https://wforwoman.com/cdn/shop/files/22AUW18360-119214_1_600x.jpg?v=1721323589"],
            description: "Soft pink silk with delicate zari border — a timeless Insta favourite.",
            category: "Insta Sarees"
          },
          {
            _id: "2",
            title: "Royal Banarasi Gold ✨",
            price: 5499,
            images: ["https://wforwoman.com/cdn/shop/files/23AUS11464-122670_1_600x.jpg?v=1721317029"],
            description: "Handwoven Banarasi saree dipped in golden grace.",
            category: "Insta Sarees"
          },
          {
            _id: "3",
            title: "Midnight Blue Charm 💙",
            price: 3999,
            images: ["https://wforwoman.com/cdn/shop/files/22AUSP11227-117751_1_600x.jpg?v=1721318138"],
            description: "A luxe satin saree for your evening glow-ups.",
            category: "Insta Sarees"
          },
          {
            _id: "4",
            title: "Pastel Dream Saree 💫",
            price: 4299,
            images: ["https://wforwoman.com/cdn/shop/files/22AUW18360-119969_600x.jpg?v=1753188638"],
            description: "Sheer pastel tones that flow like poetry in motion.",
            category: "Insta Sarees"
          },
          {
            _id: "5",
            title: "Crimson Embroidered Elegance ❤️",
            price: 4799,
            images: ["https://wforwoman.com/cdn/shop/files/22AUW18050-120234_1_600x.jpg?v=1721297145"],
            description: "Bold crimson embroidered with shimmering threads.",
            category: "Insta Sarees"
          },
          {
            _id: "6",
            title: "Ivory Organza Saree 🤍",
            price: 3699,
            images: ["https://wforwoman.com/cdn/shop/files/23FES11359-120787_1_600x.jpg?v=1721322338"],
            description: "Lightweight elegance for brunches and day festivities.",
            category: "Insta Sarees"
          },
        ]);
      } else {
        setSarees(products);
      }
    } catch (err) {
      console.error("Error fetching sarees:", err);
      // Use fallback data on error
      setSarees([
        {
          _id: "1",
          title: "Blush Silk Saree 🌸",
          price: 3499,
          images: ["https://wforwoman.com/cdn/shop/files/22AUW18360-119214_1_600x.jpg?v=1721323589"],
          description: "Soft pink silk with delicate zari border — a timeless Insta favourite.",
          category: "Insta Sarees"
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = (product) => {
    setSelectedProduct(product);
    setIsInquiryOpen(true);
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 min-h-screen font-sans overflow-hidden">
      {/* Floating Lights */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-pink-300/20 rounded-full blur-3xl"
            style={{
              width: Math.random() * 50 + 30,
              height: Math.random() * 50 + 30,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 9 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center h-[65vh]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613514785945-15a37c57ff19?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
          Insta Sarees ✨
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="z-10 mt-4 text-pink-100 text-lg md:text-xl max-w-2xl"
        >
          Drapes that trend on hearts — luxury meets tradition in every weave.
        </motion.p>
      </section>

      {/* Saree Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-10 mt-[-50px]">
        <h2 className="text-4xl font-bold text-center text-pink-700 mb-10">
          Trending Now 💕
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="text-pink-600 mt-4">Loading sarees...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gradient-to-br from-white/70 via-pink-50/60 to-rose-100/70 p-8 rounded-3xl shadow-inner">
            {sarees.map((item, index) => (
              <motion.div
                key={item._id || index}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-white/80 backdrop-blur-sm transition duration-300"
              >
                <div className="relative w-full h-72 overflow-hidden">
                  <motion.img
                    src={item.images?.[0] || item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {item.description || item.desc}
                  </p>
                  <p className="text-pink-600 font-bold text-lg mb-4">
                    ₹{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInquiry(item)}
                    className="w-full bg-gradient-to-r from-red-800 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-900 hover:to-amber-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <FaEnvelope size={12} />
                    <span>Inquire Now</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Section */}
      <section className="bg-white/90 backdrop-blur-md py-16 text-center">
        <h3 className="text-3xl font-semibold text-pink-700 mb-4">
          Sarees that Capture Hearts ❤️
        </h3>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          Every drape narrates a story — a blend of tradition and modern charm,
          curated for the woman who shines in every era.
        </p>
      </section>

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
            title: selectedProduct.title,
            name: selectedProduct.title,
            price: typeof selectedProduct.price === 'number' ? selectedProduct.price : selectedProduct.price.replace('₹', '').replace(',', ''),
            images: selectedProduct.images || [selectedProduct.img],
            image: selectedProduct.images?.[0] || selectedProduct.img,
            description: selectedProduct.description || selectedProduct.desc,
            category: selectedProduct.category || 'Insta Sarees',
            badge: selectedProduct.badge || 'SAREE'
          }}
          productType="InstaSaree"
        />
      )}
    </div>
  );
};

export default InstaSarees;
