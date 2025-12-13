import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function SlowFashion() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dummy data with more items for carousel
  const dummyItems = [
    {
      _id: "1",
      title: "Sustainable Cotton Collection",
      description: "Premium organic cotton garments",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
      category: "Sustainable",
      price: "₹2,499"
    },
    {
      _id: "2",
      title: "Artisan Handwoven Fabrics",
      description: "Traditional weaving techniques",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop",
      category: "Artisan",
      price: "₹3,299"
    },
    {
      _id: "3",
      title: "Zero Waste Fashion",
      description: "Innovative sustainable designs",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
      category: "Zero Waste",
      price: "₹1,899"
    },
    {
      _id: "4",
      title: "Vintage Revival Collection",
      description: "Timeless fashion pieces",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop",
      category: "Vintage",
      price: "₹2,799"
    },
    {
      _id: "5",
      title: "Ethical Denim Line",
      description: "Sustainable denim collection",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      category: "Denim",
      price: "₹3,499"
    },
    {
      _id: "6",
      title: "Natural Dye Workshop",
      description: "Plant-based color techniques",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      category: "Workshop",
      price: "₹1,299"
    },
    {
      _id: "7",
      title: "Organic Silk Collection",
      description: "Luxurious organic silk pieces",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
      category: "Silk",
      price: "₹4,299"
    },
    {
      _id: "8",
      title: "Upcycled Accessories",
      description: "Creative sustainable accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Accessories",
      price: "₹899"
    }
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/slow-fashion`);
        const data = Array.isArray(res.data) ? res.data : res.data.items || [];
        setItems(data.length > 0 ? data : dummyItems);
      } catch (err) {
        console.error("SlowFashion fetch error, using dummy data:", err);
        setItems(dummyItems);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (items.length > 4) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(items.length / 4));
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [items.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(items.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(items.length / 4)) % Math.ceil(items.length / 4));
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * 4;
    return items.slice(startIndex, startIndex + 4);
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600">Loading fashion finds...</div>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#de3cad' }}></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: '#e854c1' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="mb-8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 mb-4"
                style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                Slow Fashion <span className="bg-clip-text text-transparent font-black" style={{ backgroundImage: 'linear-gradient(135deg, #de3cad, #e854c1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Finds & Trendsetters</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Explore a curated collection of premium upcycled and sustainable slow fashion crafted by The Odd Factory and its partner sustainable brands. From innovative designs to timeless pieces, our platform offers consumers exclusive access to one-off and bulk purchases for resell too.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Shop consciously and redefine your style with trendsetting slow fashion that makes a positive impact. P.S-feel free to drop in a query for bulk or trade requisites of these lovely products.
            </p>

            {/* CTA Button */}
            <motion.button
              className="bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              INDULGE AND SHOP
            </motion.button>
          </motion.div>

          {/* Right Product Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* Product Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {getCurrentItems().map((item, index) => (
                  <motion.div
                    key={`${currentSlide}-${item._id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs opacity-90 mb-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-pink-400 font-bold text-sm">{item.price}</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{item.category}</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="text-white text-xs px-2 py-1 rounded-full font-semibold" style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}>
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Navigation Arrows */}
              {items.length > 4 && (
                <>
                  <motion.button
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                  >
                    <FaChevronLeft size={16} />
                  </motion.button>
                  <motion.button
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                  >
                    <FaChevronRight size={16} />
                  </motion.button>
                </>
              )}
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: Math.ceil(items.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-6'
                      : 'bg-slate-400 hover:bg-slate-600'
                  }`}
                  style={index === currentSlide ? { background: '#de3cad' } : {}}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}