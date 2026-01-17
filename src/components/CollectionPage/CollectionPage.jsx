import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard";

const CollectionPage = ({
  category,
  title,
  description,
  heroImage,
  badge = "COLLECTION"
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.yashper.com';
      const url = `${apiBaseUrl}/api/women-products?category=${encodeURIComponent(category)}&t=${Date.now()}`;

      console.log('🔍 Fetching products from:', url);
      console.log('📦 Category:', category);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log('✅ API Response:', data);
      console.log('📊 Products count:', data.products?.length || data.length || 0);

      setProducts(data.products || data || []);
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((item, index) => (
              <ProductCard
                key={item._id || index}
                product={item}
                productType="WomenProduct"
                index={index}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default CollectionPage;
