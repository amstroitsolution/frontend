import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function OurValues() {
  const [values, setValues] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data
  const dummyValues = [
    {
      _id: "1",
      title: "Quality Craftsmanship",
      description: "We believe in creating garments that stand the test of time with meticulous attention to detail and superior craftsmanship.",
      emoji: "✂️",
      order: 1,
      isActive: true
    },
    {
      _id: "2",
      title: "Sustainable Practices",
      description: "Environmental responsibility is at the core of our operations, using eco-friendly materials and sustainable production methods.",
      emoji: "🌱",
      order: 2,
      isActive: true
    },
    {
      _id: "3",
      title: "Innovation & Technology",
      description: "We embrace cutting-edge technology and innovative techniques to deliver modern solutions for traditional textile needs.",
      emoji: "⚡",
      order: 3,
      isActive: true
    },
    {
      _id: "4",
      title: "Customer Excellence",
      description: "Our customers are our priority. We strive to exceed expectations with personalized service and exceptional results.",
      emoji: "🎯",
      order: 4,
      isActive: true
    },
    {
      _id: "5",
      title: "Ethical Manufacturing",
      description: "We maintain fair labor practices and ethical manufacturing standards throughout our entire supply chain.",
      emoji: "🤝",
      order: 5,
      isActive: true
    },
    {
      _id: "6",
      title: "Continuous Learning",
      description: "We invest in our team's growth and stay updated with industry trends to provide the best possible service.",
      emoji: "📚",
      order: 6,
      isActive: true
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch values
        const valuesRes = await axios.get(`${API}/api/our-values`);
        const items = Array.isArray(valuesRes.data) ? valuesRes.data : valuesRes.data.items || [];
        setValues(items.length > 0 ? items : dummyValues);
        
        // Fetch settings
        const settingsRes = await axios.get(`${API}/api/our-values-settings`);
        setSettings(settingsRes.data);
      } catch (err) {
        console.error("OurValues fetch error, using dummy data:", err);
        setValues(dummyValues);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600">Loading our values...</div>
    );
  }

  // Filter active values and sort by order
  const activeValues = values.filter(v => v.isActive).sort((a, b) => a.order - b.order);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
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
                className="h-1 bg-gradient-to-r from-red-800 via-red-600 to-amber-500 mb-4"
              />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                {settings?.sectionHeading ? (
                  <>
                    {settings.sectionHeading.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="bg-gradient-to-r from-red-800 via-red-600 to-amber-500 bg-clip-text text-transparent font-black">
                      {settings.sectionHeading.split(' ').slice(-1)}
                    </span>
                  </>
                ) : (
                  <>
                    Our <span className="bg-gradient-to-r from-red-800 via-red-600 to-amber-500 bg-clip-text text-transparent font-black">Values</span>
                  </>
                )}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {settings?.mainDescription || "The Odd Factory is dedicated to giving back to the fashion community and society. We've created a unified platform that offers something for everyone—whether you're a brand, startup, or service provider. Committed to ethical and sustainable production, we're here to help you build a conscious brand and supply chain."}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {settings?.subDescription || "Our goal is to ensure you get what you require to succeed. Together, let's shape a future of responsible fashion, where innovation and sustainability go hand in hand. We distribute a % of our proceeds to our animal welfare NGO, Stranduary Foundation. If you wish to give back to society, the planet or the industry, please connect with our team."}
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={
                  settings?.sectionImage 
                    ? (settings.sectionImage.startsWith('http') 
                        ? settings.sectionImage 
                        : `${API}${settings.sectionImage}`)
                    : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                }
                alt={settings?.imageAlt || "Our Values - Team Working"}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>


          </motion.div>
        </div>

        {/* Values Grid - Admin Managed Content */}
        {activeValues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeValues.map((value, index) => (
                <motion.div
                  key={value._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {value.icon ? (
                        <img src={value.icon} alt="" className="w-12 h-12 object-contain" />
                      ) : (
                        value.emoji
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}