// src/components/KidsHero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const API = (import.meta.env.VITE_API_BASE_URL || "https://api.yashper.com/").replace(/\/$/, "");

const fallbackSlides = [
  {
    _id: "1",
    image:
      "https://static.vecteezy.com/system/resources/previews/043/340/916/non_2x/3d-new-collection-autumn-clothing-store-ads-banner-concept-poster-card-vector.jpg",
    title: "Adorable Ethnic Wear for Kids",
    subtitle: "DISCOVER YOUR STYLE",
    description: "Festive looks crafted with love for your little ones",
    ctaText: "Shop Now",
    ctaLink: "/kids",
    isActive: true,
    order: 1
  },
  {
    _id: "2",
    image:
      "https://img.freepik.com/premium-vector/kids-fashion-banner_78532-345.jpg",
    title: "Trendy Party Outfits",
    subtitle: "PERFECT FOR CELEBRATIONS",
    description: "Perfect styles for every celebration and special moment",
    ctaText: "Explore Collection",
    ctaLink: "/kids",
    isActive: true,
    order: 2
  },
  {
    _id: "3",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/065/954/622/small/bright-and-cheerful-kids-fashion-sale-banner-featuring-stylish-children-in-vibrant-clothing-against-a-sunny-background-for-summer-promotions-photo.jpeg",
    title: "Comfort Meets Style",
    subtitle: "PLAYFUL MOMENTS",
    description: "Soft fabrics and vibrant designs for active kids",
    ctaText: "Shop Now",
    ctaLink: "/kids",
    isActive: true,
    order: 3
  },
];

const KidsHero = () => {
  const [slides, setSlides] = useState(fallbackSlides);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fetch hero slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/api/kids-hero/active`);
        const data = Array.isArray(response.data) ? response.data : response.data.items || [];
        const activeSlides = data.filter(slide => slide.isActive).sort((a, b) => a.order - b.order);

        if (activeSlides.length > 0) {
          setSlides(activeSlides);
        }
      } catch (error) {
        console.error("Error fetching kids hero slides, using fallback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (loading) {
    return (
      <div className="relative w-full h-[50vh] md:h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-screen overflow-hidden bg-black">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-pink-500/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              scale: [null, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current]._id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={slides[current].image?.startsWith('http')
              ? slides[current].image
              : slides[current].image
                ? `${API}${slides[current].image}`
                : fallbackSlides[0].image}
            alt={slides[current].title}
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-4 sm:px-8 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl md:max-w-4xl"
            >
              <div className="flex items-center gap-1.5 sm:gap-3 mb-2 sm:mb-6">
                <div className="w-6 sm:w-12 h-0.5 bg-pink-500"></div>
                <span className="text-pink-400 text-[10px] sm:text-sm font-semibold uppercase tracking-widest">
                  {slides[current].subtitle || "Kids Collection"}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-white text-xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-6 leading-tight sm:leading-tight"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-white/90 text-xs sm:text-lg md:text-xl mb-3 sm:mb-10 max-w-2xl leading-relaxed"
              >
                {slides[current].description || "Adorable styles for your little ones"}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap gap-2 sm:gap-4"
              >
                <Link
                  to={slides[current].ctaLink || "/kids"}
                  className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-all shadow-lg"
                >
                  {slides[current].ctaText || "Shop Now"} →
                </Link>
                <Link
                  to="/kids"
                  className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                >
                  Explore More →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <motion.button
        onClick={prevSlide}
        whileHover={{ scale: 1.1, x: -5 }}
        className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 z-10 transition-all hover:bg-pink-500"
      >
        <FaChevronLeft size={14} className="sm:w-4 sm:h-4" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        whileHover={{ scale: 1.1, x: 5 }}
        className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 z-10 transition-all hover:bg-pink-500"
      >
        <FaChevronRight size={14} className="sm:w-4 sm:h-4" />
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-500 ${
              index === current
                ? "w-6 sm:w-12 h-2 bg-pink-500"
                : "bg-white/40 w-2 h-2 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default KidsHero;
