import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaUsers, FaLightbulb, FaLeaf } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaHeart className="text-pink-500 text-3xl" />,
      title: "Crafted with Love",
      desc: "Every outfit is designed thoughtfully — blending comfort, beauty, and individuality for today’s modern woman.",
    },
    {
      icon: <FaUsers className="text-pink-500 text-3xl" />,
      title: "Empowering Artisans",
      desc: "We collaborate with local artisans and women-led studios to celebrate handcrafted Indian artistry.",
    },
    {
      icon: <FaLightbulb className="text-pink-500 text-3xl" />,
      title: "Modern Elegance",
      desc: "Our collections bring a refreshing take on traditional silhouettes with a minimalist and chic approach.",
    },
    {
      icon: <FaLeaf className="text-pink-500 text-3xl" />,
      title: "Sustainable Choices",
      desc: "We prioritize natural fabrics, ethical production, and eco-friendly packaging — because style can be sustainable too.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-pink-50 min-h-screen py-20 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-5xl font-bold text-pink-700 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          We’re more than a clothing brand — we’re a story of timeless style, confidence, and culture.  
          Each collection celebrates femininity with elegance and emotion, designed for every mood and moment.
        </p>
      </motion.div>

      {/* Feature Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white shadow-lg hover:shadow-pink-200 rounded-2xl p-8 text-center transform hover:-translate-y-2 transition-all duration-500"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-pink-700 text-center mb-6">
          Our Vision 🌸
        </h2>
        <p className="text-gray-600 leading-relaxed text-center mb-6">
          To redefine ethnic wear with a contemporary essence —  
          making every woman feel elegant, comfortable, and powerful.  
          We envision a world where fashion not only enhances beauty but also  
          supports artisans, sustainability, and slow living.
        </p>
        <div className="flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-pink-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-700 transition"
          >
            Explore Our Collection
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
