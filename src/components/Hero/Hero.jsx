import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import slide1 from "../../assets/images/slide1.webp";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Fallback slides if API fails
const fallbackSlides = [
  {
    _id: "1",
    title: "Elevating Textile Stitching Across India",
    subtitle: "Welcome to Goodluck",
    description: "Precision craftsmanship meets modern innovation in textile manufacturing",
    backgroundImage: slide1,
    ctaText: "Meet With Us",
    ctaLink: "/contact",
    isActive: true,
    order: 1
  },
  {
    _id: "2",
    title: "Precision, Quality & Excellence",
    subtitle: "Our Commitment",
    description: "Delivering premium quality textile solutions with cutting-edge technology",
    backgroundImage: slide1,
    ctaText: "Discover More",
    ctaLink: "/about",
    isActive: true,
    order: 2
  },
  {
    _id: "3",
    title: "Empowering Fashion Manufacturing",
    subtitle: "Innovation Driven",
    description: "Transforming the textile industry with modern solutions",
    backgroundImage: slide1,
    ctaText: "Our Services",
    ctaLink: "/services",
    isActive: true,
    order: 3
  },
];

export default function Hero() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fetch hero slides from API
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/hero`);
        const data = Array.isArray(res.data) ? res.data : res.data.items || [];
        const activeSlides = data.filter(slide => slide.isActive).sort((a, b) => a.order - b.order);

        if (activeSlides.length > 0) {
          setSlides(activeSlides);
        }
      } catch (err) {
        console.error("Hero fetch error, using fallback slides:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroSlides();
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
      <div className="relative w-full h-[300vh] sm:h-[350vh] md:h-[400vh] overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100vh] sm:h-[100vh] md:h-[100vh] overflow-hidden bg-black">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-pink-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
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
            src={slides[current].backgroundImage?.startsWith('http')
              ? slides[current].backgroundImage
              : slides[current].backgroundImage
                ? `${API}${slides[current].backgroundImage}`
                : slide1}
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
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-0.5" style={{ background: '#de3cad' }}></div>
                <span className="text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                  {slides[current].subtitle || "Welcome to Excellence"}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-snug sm:leading-tight"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl leading-relaxed"
              >
                {slides[current].description || "Precision craftsmanship meets modern innovation in textile manufacturing"}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <Link
                  to="/about"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                >
                  Learn More →
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
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/10 text-white p-3 sm:p-4 rounded-xl border border-white/20 z-10 transition-all"
        style={{ '&:hover': { background: '#de3cad' } }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#de3cad'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
      >
        <FaChevronLeft size={16} className="sm:size-20" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        whileHover={{ scale: 1.1, x: 5 }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/10 text-white p-3 sm:p-4 rounded-xl border border-white/20 z-10 transition-all"
        onMouseEnter={(e) => e.currentTarget.style.background = '#de3cad'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
      >
        <FaChevronRight size={16} />
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-500 ${index === current
              ? "w-8 sm:w-12 h-2.5"
              : "bg-white/40 w-2.5 h-2.5 hover:bg-white/60"
              }`}
            style={index === current ? { background: '#de3cad' } : {}}
          />
        ))}
      </div>
    </div>
  );
}
