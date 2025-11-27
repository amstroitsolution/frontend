import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaCrown, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import InquiryForm from "../../components/InquiryForm/InquiryForm";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function KidsGirls() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/kids-products`);
        const girlsProducts = res.data.filter(p => p.gender === "Girls");
        setProducts(girlsProducts);
      } catch (err) {
        console.error("Error fetching girls products:", err);
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

  const categories = [
    {
      title: "Ethnic Wear",
      icon: <FaStar className="text-3xl" />,
      color: "from-pink-500 to-rose-500",
      items: [
        { name: "Ethnic Wear", link: "/kids/ethinics" },
        { name: "Dhoties & Patiala", link: "/kids/dhotiespatiala" },
        { name: "Lehengas & Ghagra", link: "/kids/lehngaghagra" },
        { name: "Kurties & Jumpsuits", link: "/kids/kurtiesjums" },
        { name: "Pants & Salwar", link: "/kids/paintsalwar" },
        { name: "Palazzo & Sharara", link: "/kids/plazosharara" },
        { name: "Saree & Anarkali", link: "/kids/sareeanarkali" }
      ]
    },
    {
      title: "Dresses & Gowns",
      icon: <FaHeart className="text-3xl" />,
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "Dresses", link: "/kids/girldresses" },
        { name: "Gowns", link: "/kids/Gowns" },
        { name: "Jumpsuits", link: "/kids/jumpsuite" },
        { name: "Sets", link: "/kids/sets" }
      ]
    },
    {
      title: "Trending",
      icon: <FaCrown className="text-3xl" />,
      color: "from-amber-500 to-orange-500",
      items: [
        { name: "New Arrivals", link: "/kids/girlnew" },
        { name: "Wedding Collection", link: "/kids/girlwedding" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Girls Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Beautiful dresses, lehengas & ethnic wear for your little princess
          </motion.p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {categories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}>
                    {category.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">{category.title}</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                    >
                      <Link to={item.link}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 hover:border-pink-300">
                          <h3 className="text-lg font-semibold text-slate-800 text-center">
                            {item.name}
                          </h3>
                          <div className={`mt-4 h-1 bg-gradient-to-r ${category.color} rounded-full`}></div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Featured <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-lg text-gray-600">Handpicked collection for girls</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No products available</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].startsWith('http') ? product.images[0] : `${API}${product.images[0]}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                          {product.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      {product.price && (
                        <p className="text-xl font-bold text-pink-600">₹{product.price.toLocaleString()}</p>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleInquiry(product)}
                        className="bg-gradient-to-r from-red-800 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-900 hover:to-amber-700 transition-all flex items-center space-x-2"
                      >
                        <FaEnvelope size={12} />
                        <span>Inquire</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
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
            title: selectedProduct.name,
            name: selectedProduct.name,
            price: selectedProduct.price,
            images: selectedProduct.images,
            description: selectedProduct.description,
            category: selectedProduct.category,
            gender: selectedProduct.gender
          }}
          productType="KidsProduct"
        />
      )}
    </div>
  );
}
