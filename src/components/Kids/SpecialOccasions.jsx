import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaStar, FaGift, FaCrown } from "react-icons/fa";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Icon mapping helper
const getIconComponent = (iconName) => {
  const icons = {
    FaCrown: <FaCrown className="text-3xl" />,
    FaGift: <FaGift className="text-3xl" />,
    FaStar: <FaStar className="text-3xl" />,
    FaHeart: <FaHeart className="text-3xl" />
  };
  return icons[iconName] || <FaStar className="text-3xl" />;
};

export default function SpecialOccasions() {
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackOccasions = [
    {
      _id: "1",
      title: "Wedding Collection",
      icon: "FaCrown",
      description: "Elegant ethnic wear for special ceremonies",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      link: "/kids/girls/wedding",
      color: "from-pink-500 to-rose-500",
      order: 1
    },
    {
      _id: "2",
      title: "Birthday Specials",
      icon: "FaGift",
      description: "Make their day extra special",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      link: "/kids",
      color: "from-pink-500 to-rose-500",
      order: 2
    },
    {
      _id: "3",
      title: "Festival Wear",
      icon: "FaStar",
      description: "Traditional outfits for celebrations",
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=300&fit=crop",
      link: "/kids/girls/ethnic",
      color: "from-purple-500 to-pink-500",
      order: 3
    },
    {
      _id: "4",
      title: "Party Wear",
      icon: "FaHeart",
      description: "Stylish outfits for parties",
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&h=300&fit=crop",
      link: "/kids/girls/dresses",
      color: "from-blue-500 to-cyan-500",
      order: 4
    }
  ];

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const response = await axios.get(`${API}/api/kids-sections/active`);
        // Filter for special occasions type sections
        const occasionsData = response.data.filter(section => 
          section.type === 'special-occasions' || section.category === 'occasions'
        );
        
        if (occasionsData.length > 0) {
          setOccasions(occasionsData.sort((a, b) => a.order - b.order));
        } else {
          setOccasions(fallbackOccasions);
        }
      } catch (error) {
        console.error("Error fetching special occasions:", error);
        setOccasions(fallbackOccasions);
      } finally {
        setLoading(false);
      }
    };
    fetchOccasions();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#de3cad' }}></div>
          <p className="text-gray-600">Loading special occasions...</p>
        </div>
      </section>
    );
  }

  if (occasions.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Special <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #de3cad, #e854c1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Occasions</span>
          </h2>
          <p className="text-lg text-gray-600">Perfect outfits for every celebration</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occasion, idx) => (
            <motion.div
              key={occasion._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link to={occasion.link}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={occasion.image?.startsWith('http') 
                        ? occasion.image 
                        : `${API}${occasion.image}`}
                      alt={occasion.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${occasion.color || 'from-purple-500 to-pink-500'} opacity-60`}></div>
                    <div className={`absolute top-4 left-4 w-14 h-14 rounded-full bg-gradient-to-br ${occasion.color || 'from-purple-500 to-pink-500'} flex items-center justify-center text-white shadow-lg`}>
                      {getIconComponent(occasion.icon)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{occasion.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{occasion.description}</p>
                    <span className={`inline-block bg-gradient-to-r ${occasion.color || 'from-purple-500 to-pink-500'} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
