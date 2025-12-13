import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Services = () => {
  const [services, setServices] = useState([]);
  const [counters, setCounters] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API}/api/services`);
        const data = Array.isArray(res.data) ? res.data : res.data.items || [];
        
        // If no services in DB, use fallback data
        if (data.length === 0) {
          const fallbackData = [
            {
              _id: "1",
              title: "Garments Stitching",
              description: "Garments stitching blends fabric pieces to craft clothing. Skilled stitchers employ sewing, serging, and hemming for durability and beauty.",
              image: "/src/assets/images/stitching.png",
            },
            {
              _id: "2",
              title: "Garments Fabrication",
              description: "Our skilled fabricators ensure that every garment is crafted with the utmost care and quality materials using modern techniques.",
              image: "/src/assets/images/fabrication.png",
            },
            {
              _id: "3",
              title: "Specialized Stitching Techniques",
              description: "From smocking and pintuck stitching to shell and blanket stitches, we offer a wide range of decorative and functional stitching options.",
              image: "/src/assets/images/techniques.png",
            },
            {
              _id: "4",
              title: "Fusing Cutting",
              description: "Accurate cutting of fusible interfacing for seamless garment construction.",
              image: "/src/assets/images/cutting.png",
            },
          ];
          setServices(fallbackData);
        } else {
          setServices(data);
        }
      } catch (err) {
        console.error("Services fetch error:", err);
        // Use fallback data on error
        const fallbackData = [
          {
            _id: "1",
            title: "Garments Stitching",
            description: "Garments stitching blends fabric pieces to craft clothing. Skilled stitchers employ sewing, serging, and hemming for durability and beauty.",
            image: "/src/assets/images/stitching.png",
          },
          {
            _id: "2",
            title: "Garments Fabrication",
            description: "Our skilled fabricators ensure that every garment is crafted with the utmost care and quality materials using modern techniques.",
            image: "/src/assets/images/fabrication.png",
          },
          {
            _id: "3",
            title: "Specialized Stitching Techniques",
            description: "From smocking and pintuck stitching to shell and blanket stitches, we offer a wide range of decorative and functional stitching options.",
            image: "/src/assets/images/techniques.png",
          },
          {
            _id: "4",
            title: "Fusing Cutting",
            description: "Accurate cutting of fusible interfacing for seamless garment construction.",
            image: "/src/assets/images/cutting.png",
          },
        ];
        setServices(fallbackData);
      }
    };
    fetchServices();
  }, []);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/api/stats/active`);
        const data = Array.isArray(res.data) ? res.data : [];
        
        // If no stats in DB, use fallback data
        if (data.length === 0) {
          const fallbackStats = [
            { _id: "1", label: "Active Clients", value: 820, suffix: "k+" },
            { _id: "2", label: "Projects Done", value: 520, suffix: "+" },
            { _id: "3", label: "Ready Projects", value: 100, suffix: "+" },
            { _id: "4", label: "Happy Clients", value: 90000, suffix: "+" },
          ];
          setCounters(fallbackStats);
        } else {
          setCounters(data);
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
        // Use fallback data on error
        const fallbackStats = [
          { _id: "1", label: "Active Clients", value: 820, suffix: "k+" },
          { _id: "2", label: "Projects Done", value: 520, suffix: "+" },
          { _id: "3", label: "Ready Projects", value: 100, suffix: "+" },
          { _id: "4", label: "Happy Clients", value: 90000, suffix: "+" },
        ];
        setCounters(fallbackStats);
      }
    };
    fetchStats();
  }, []);

  // Counter Animation
  useEffect(() => {
    if (counters.length === 0) return;

    const handleScroll = () => {
      const counterSection = document.getElementById("counter-section");
      if (counterSection) {
        const rect = counterSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          startCountAnimation();
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    const startCountAnimation = () => {
      counters.forEach((counter) => {
        let start = 0;
        const end = counter.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const animate = () => {
          start += increment;
          if (start < end) {
            setAnimatedValues((prev) => ({
              ...prev,
              [counter._id || counter.id]: Math.floor(start),
            }));
            requestAnimationFrame(animate);
          } else {
            setAnimatedValues((prev) => ({
              ...prev,
              [counter._id || counter.id]: end,
            }));
          }
        };
        requestAnimationFrame(animate);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [counters]);

  return (
    <>
      {/* --- Modern Services Section --- */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Clean Background Effects */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Clean Header */}
          <div className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
              />
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#de3cad' }}>What We Offer</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mt-4 mb-4 leading-tight">
                Fashion <span className="bg-clip-text text-transparent font-black" style={{ backgroundImage: 'linear-gradient(135deg, #de3cad, #e854c1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Solutions</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Comprehensive textile services with precision craftsmanship and modern technology
              </p>
            </motion.div>
          </div>

          {/* Clean Services Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service._id || service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                {/* Clean Professional Card */}
                <div className="bg-white rounded-2xl p-8 text-center h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  
                  {/* Subtle hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg"
                    onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #de3cad, #e854c1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom right, rgb(253, 242, 248), rgb(250, 245, 255)'}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={service.image || service.img}
                      alt={service.title}
                      className="w-12 h-12 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  </motion.div>

                  {/* Typography */}
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-red-800 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description || service.desc}
                  </p>
                  
                  {/* CTA Button */}
                  <motion.button 
                    className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-purple-100 transition-all duration-300 text-xl font-bold shadow-md group-hover:shadow-lg"
                    style={{ color: '#de3cad' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #de3cad, #e854c1)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to bottom right, rgb(252, 231, 243), rgb(243, 232, 255))';
                      e.currentTarget.style.color = '#de3cad';
                    }}
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.button>


                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Member Benefits Section --- */}
      <section className="bg-gradient-to-br from-[#0d1b24] via-[#1a2f3d] to-[#0d1b24] text-white py-24 md:py-32 relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              className="flex-1 w-full lg:w-auto"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group">
                <img
                  src="/src/assets/images/preeser.jpg"
                  alt="Industrial Equipment"
                  className="w-full rounded-3xl shadow-2xl object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative frame */}
                <div className="absolute -inset-4 border-2 border-red-600/20 rounded-3xl -z-10"></div>
              </div>
            </motion.div>

            <motion.div 
              className="flex-1 w-full lg:w-auto"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 mb-4"
                style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
              />
              <span className="font-semibold text-xs md:text-sm uppercase tracking-widest" style={{ color: '#e854c1' }}>Member Benefits</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 mt-4 leading-tight">
                Preparing for Your Success with <span style={{ color: '#de3cad' }}>Trusted Partnership</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed">
                We believe in the power of collaboration. Partner with industry leaders to foster innovation and drive positive change in the textile ecosystem. Together, we create lasting impact.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: "✓", text: "Unrivaled Quality", desc: "Premium standards" },
                  { icon: "✓", text: "Versatility", desc: "Flexible solutions" },
                  { icon: "✓", text: "Nationwide Reach", desc: "Pan-India service" },
                  { icon: "✓", text: "Experienced Team", desc: "Expert craftsmen" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 hover:bg-white/10 transition-all duration-300 border border-white/10 group cursor-pointer"
                  >
                    <div className="relative">
                      <span className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-lg transition-shadow"
                            style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
                            onMouseEnter={(e) => e.target.style.boxShadow = '0 10px 25px rgba(222, 60, 173, 0.5)'}
                            onMouseLeave={(e) => e.target.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)'}>
                        {item.icon}
                      </span>
                      <div className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-20" style={{ background: '#de3cad' }}></div>
                    </div>
                    <div>
                      <span className="text-base md:text-lg font-semibold block">{item.text}</span>
                      <span className="text-sm text-gray-400">{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Modern Stats Counter Section with Advanced Effects --- */}
      <section id="counter-section" className="py-24 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl blob"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl blob"
            style={{ animationDelay: '5s' }}
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"
          ></motion.div>
        </div>

        {/* Decorative animated lines */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute top-1/4 left-0 w-full h-px bg-white"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div 
            className="absolute top-2/4 left-0 w-full h-px bg-white"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute top-3/4 left-0 w-full h-px bg-white"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          ></motion.div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 50,
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{ 
                y: -50,
                x: Math.random() * window.innerWidth
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          {counters.map((counter, index) => (
            <motion.div 
              key={counter._id || counter.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.05 }}
              className="p-6 relative group"
            >
              {/* Decorative circle background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-32 h-32 rounded-full border-2 border-white/20"></div>
              </div>

              <motion.h3 
                className="text-5xl md:text-6xl font-bold mb-3 relative z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15 + 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                {animatedValues[counter._id || counter.id] || 0}
                {counter.suffix || "+"}
              </motion.h3>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                className="h-1 bg-white/30 mx-auto mb-3 rounded-full"
              ></motion.div>

              <p className="text-lg md:text-xl font-medium text-red-100 relative z-10">
                {counter.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
