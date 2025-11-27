import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        // Try to fetch from best-sellers API first
        let response;
        try {
          response = await axios.get(`${API}/api/best-sellers/active`);
        } catch (err) {
          // If best-sellers API fails, fetch from women-products
          console.log("Fetching from women-products instead...");
          response = await axios.get(`${API}/api/women-products?limit=8&sort=-createdAt`);
        }
        
        // Map the data to include image field for compatibility
        const mappedProducts = response.data.map(product => ({
          ...product,
          image: product.images && product.images.length > 0 
            ? (product.images[0].startsWith('http') ? product.images[0] : `${API}${product.images[0]}`)
            : "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
          badge: product.badge || 'BESTSELLER'
        }));
        setProducts(mappedProducts.slice(0, 8)); // Show max 8 products
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
        // Fallback to empty array on error
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading bestsellers...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-1 bg-gradient-to-r from-red-600 to-amber-600 w-20 mx-auto mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Best <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">Sellers</span>
          </h2>
          <p className="text-lg text-gray-600">Most loved by our customers</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard
              key={product._id}
              product={product}
              productType="BestSeller"
              badgeText={product.badge}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
