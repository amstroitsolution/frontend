// src/components/KidsHero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const fallbackSlides = [
  {
    _id: "1",
    image:
      "https://static.vecteezy.com/system/resources/previews/043/340/916/non_2x/3d-new-collection-autumn-clothing-store-ads-banner-concept-poster-card-vector.jpg",
    title: "Adorable Ethnic Wear for Kids",
    subtitle: "Festive looks crafted with love 💖",
    order: 1
  },
  {
    _id: "2",
    image:
      "https://img.freepik.com/premium-vector/kids-fashion-banner_78532-345.jpg",
    title: "Trendy Party Outfits",
    subtitle: "Perfect styles for every celebration ✨",
    order: 2
  },
  {
    _id: "3",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/065/954/622/small/bright-and-cheerful-kids-fashion-sale-banner-featuring-stylish-children-in-vibrant-clothing-against-a-sunny-background-for-summer-promotions-photo.jpeg",
    title: "Comfort Meets Style",
    subtitle: "Soft fabrics for playful moments 👶",
    order: 3
  },
];

const KidsHero = () => {
  const [slides, setSlides] = useState(fallbackSlides);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`${API}/api/kids-hero/active`);
        if (response.data && response.data.length > 0) {
          setSlides(response.data);
        }
      } catch (error) {
        console.error("Error fetching kids hero slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) {
    return (
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden  shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index]._id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={slides[index].image?.startsWith('http') 
              ? slides[index].image 
              : `${API}${slides[index].image}`}
            alt={slides[index].title}
            className="w-full h-full object-cover object-center"
          />

          {/* Text content on top of original image */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12 bg-black/0">
            <motion.h1
              key={slides[index].title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-3 leading-snug"
            >
              {slides[index].title}
            </motion.h1>
            <motion.p
              key={slides[index].subtitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-white text-sm sm:text-base md:text-lg font-medium drop-shadow"
            >
              {slides[index].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-pink-100 text-pink-600 rounded-full p-1 sm:p-2 shadow-md transition-all"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-pink-100 text-pink-600 rounded-full p-1 sm:p-2 shadow-md transition-all"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 sm:bottom-6 w-full flex justify-center gap-2 sm:gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              i === index ? "bg-pink-600 w-5 sm:w-6" : "bg-pink-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default KidsHero;
