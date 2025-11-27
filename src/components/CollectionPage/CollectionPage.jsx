import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEnvelope } from "react-icons/fa";
import InquiryForm from "../InquiryForm/InquiryForm";

const CollectionPage = ({ 
  category, 
  title, 
  description, 
  heroImage,
  badge = "COLLECTION"
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/women-products?category=${encodeURIComponent(category)}&limit=12`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = (product) => {
    setSelectedProduct(product);
    setIsInquiryOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {title}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-pink-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={fetchProducts}
            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-white to-rose-100 min-h-screen font-sans overflow-hidden">
      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-300/30 blur-3xl"
            style={{
              width: Math.random() * 60 + 40,
              height: Math.random() * 60 + 40,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      {heroImage && (
        <section
          className="relative h-[60vh] flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: `url('${heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 text-lg md:text-xl text-pink-100 mt-4 max-w-2xl px-4"
          >
            {description}
          </motion.p>
        </section>
      )}

      {/* Simple Header (if no hero image) */}
      {!heroImage && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-20 pb-12 px-6"
        >
          <h1 className="text-5xl font-semibold text-pink-700 tracking-wide mb-4 drop-shadow-sm">
            {title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            {description}
          </p>
        </motion.div>
      )}

      {/* Products Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products found in this collection.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((item, index) => (
              <motion.div
                key={item._id || index}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
              >
                <div className="relative w-full h-80 overflow-hidden">
                  <motion.img
                    src={item.images?.[0] || item.image || "https://via.placeholder.com/400"}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.name || item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    {item.price && (
                      <p className="text-pink-600 font-bold text-lg mb-3">
                        ₹{item.price.toLocaleString()}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleInquiry(item)}
                        className="bg-gradient-to-r from-red-800 to-amber-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 mx-auto hover:from-red-900 hover:to-amber-700 transition-all font-semibold"
                      >
                        <FaEnvelope /> Inquire Now
                      </button>
                      <button
                        onClick={() => setSelected(item)}
                        className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 mx-auto hover:bg-pink-700 transition"
                      >
                        <FaEye /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl p-5 max-w-md w-full"
          >
            <img
              src={selected.images?.[0] || selected.image || "https://via.placeholder.com/400"}
              alt={selected.name || selected.title}
              className="rounded-2xl w-full h-72 object-cover mb-4"
            />
            <h3 className="text-xl font-bold text-pink-700 mb-2 text-center">
              {selected.name || selected.title}
            </h3>
            <p className="text-gray-600 mb-2 text-center">{selected.description}</p>
            {selected.price && (
              <p className="text-pink-600 font-bold text-lg mb-4 text-center">
                ₹{selected.price.toLocaleString()}
              </p>
            )}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelected(null);
                  handleInquiry(selected);
                }}
                className="bg-gradient-to-r from-red-800 to-amber-600 text-white px-5 py-2 rounded-full hover:from-red-900 hover:to-amber-700 transition font-semibold"
              >
                Inquire Now
              </button>
              <button
                onClick={() => setSelected(null)}
                className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition"
              >
                Close
              </button>
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
            ...selectedProduct,
            badge: badge
          }}
          productType="WomenProduct"
        />
      )}
    </div>
  );
};

export default CollectionPage;
