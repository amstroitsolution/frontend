import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API = "http://localhost:5000/api/home-services";

export default function HomeServicesCarousel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API);
        const arr = Array.isArray(res.data) ? res.data : [];
        setItems(arr);
      } catch (err) {
        console.error("HomeServices fetch error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const toAbsolute = (url) => (url && url.startsWith("http") ? url : url ? `http://localhost:5000${url}` : "");

  if (loading) {
    return (
      <div className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">Loading featured services...</div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
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
              className="h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-4"
            />
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Featured</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mt-4 mb-4 leading-tight">
              Downloadable <span className="bg-gradient-to-r from-red-800 via-red-600 to-amber-500 bg-clip-text text-transparent font-black">Resources</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Templates, guides, and resources for your business
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={800}
            effect="slide"
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 25 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            className="pb-12"
          >
            {items.map((it, index) => (
              <SwiperSlide key={it._id}>
                <motion.div 
                  className="group relative overflow-hidden h-full"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Clean Professional Card */}
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
                    
                    {/* Subtle animated background effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-xl"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-50/20 to-transparent rounded-full blur-lg"></div>
                    </div>

                    {/* Clean Media Section */}
                    <div className="relative overflow-hidden h-56 rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                      {it.mediaType === "video" && it.mediaUrl ? (
                        <div className="relative overflow-hidden h-full">
                          <video
                            src={toAbsolute(it.mediaUrl)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            muted
                            playsInline
                            loop
                            autoPlay
                          />
                          
                          {/* Simple video overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : it.mediaUrl ? (
                        <div className="relative overflow-hidden h-full">
                          <img 
                            src={toAbsolute(it.mediaUrl)} 
                            alt={it.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                          
                          {/* Simple overlay effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center text-gray-400 relative">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-2xl">📄</span>
                            </div>
                            <span className="text-sm font-medium">No Media</span>
                          </div>
                        </div>
                      )}

                      {/* Simple corner accent */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-red-600 border-l-[60px] border-l-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                    </div>

                    {/* Clean Content Section */}
                    <div className="p-6 relative">
                      {/* Animated underline */}
                      <div className="absolute top-0 left-6 w-0 h-1 bg-red-600 group-hover:w-12 transition-all duration-300"></div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-red-800 transition-colors duration-300 mt-2">
                        {it.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {it.shortDesc}
                      </p>

                      <a
                        href={it.buttonLink || "#"}
                        className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2 group/btn"
                      >
                        <span>{it.buttonText || "Learn more"}</span>
                        <svg 
                          className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Clean Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl group">
            <FaChevronLeft className="transform group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl group">
            <FaChevronRight className="transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
