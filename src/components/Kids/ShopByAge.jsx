import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBaby, FaChild, FaUsers } from "react-icons/fa";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Icon mapping helper
const getIconComponent = (iconName) => {
  const icons = {
    FaBaby: <FaBaby className="text-5xl" />,
    FaChild: <FaChild className="text-5xl" />,
    FaUsers: <FaUsers className="text-5xl" />
  };
  return icons[iconName] || <FaChild className="text-5xl" />;
};

export default function ShopByAge() {
  const [ageGroups, setAgeGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackAgeGroups = [
    {
      _id: "1",
      title: "Infants",
      subtitle: "0-2 Years",
      icon: "FaBaby",
      description: "Soft & comfortable clothing for your little ones",
      link: "/kids/boys",
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50",
      items: "100+ Items",
      order: 1
    },
    {
      _id: "2",
      title: "Toddlers",
      subtitle: "2-5 Years",
      icon: "FaChild",
      description: "Playful & durable outfits for active toddlers",
      link: "/kids/girls",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-50",
      items: "150+ Items",
      order: 2
    },
    {
      _id: "3",
      title: "Kids",
      subtitle: "5-12 Years",
      icon: "FaUsers",
      description: "Trendy & stylish wear for growing kids",
      link: "/kids",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50",
      items: "200+ Items",
      order: 3
    }
  ];

  useEffect(() => {
    const fetchAgeGroups = async () => {
      try {
        const response = await axios.get(`${API}/api/kids-sections/active`);
        // Filter for age group type sections
        const ageData = response.data.filter(section => 
          section.type === 'age-group' || section.category === 'age'
        );
        
        if (ageData.length > 0) {
          setAgeGroups(ageData.sort((a, b) => a.order - b.order));
        } else {
          setAgeGroups(fallbackAgeGroups);
        }
      } catch (error) {
        console.error("Error fetching age groups:", error);
        setAgeGroups(fallbackAgeGroups);
      } finally {
        setLoading(false);
      }
    };
    fetchAgeGroups();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading age groups...</p>
        </div>
      </section>
    );
  }

  if (ageGroups.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Shop by <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Age</span>
          </h2>
          <p className="text-lg text-gray-600">Find the perfect fit for every stage</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ageGroups.map((group, idx) => (
            <motion.div
              key={group._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link to={group.link}>
                <div className={`${group.bgColor || 'bg-pink-50'} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full`}>
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${group.color || 'from-pink-400 to-rose-400'} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {getIconComponent(group.icon)}
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{group.subtitle}</span>
                  <h3 className="text-3xl font-bold text-slate-800 mb-3 mt-2">{group.title}</h3>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">{group.items}</span>
                    <span className={`bg-gradient-to-r ${group.color || 'from-pink-400 to-rose-400'} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                      Shop Now →
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
