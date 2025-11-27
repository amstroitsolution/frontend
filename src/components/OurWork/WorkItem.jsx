// client/frontend/src/components/OurWork/WorkItem.jsx
import React from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function WorkItem({ work }) {
  const firstImage = work.images && work.images.length > 0 ? work.images[0] : null;
  const imgSrc = firstImage ? (firstImage.startsWith("http") ? firstImage : `${API}${firstImage}`) : null;

  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Clean Professional Card */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
        
        {/* Image Section */}
        <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
          {imgSrc ? (
            <>
              <img 
                src={imgSrc} 
                alt={work.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              {/* Simple overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
                <span className="text-sm font-medium">No Image</span>
              </div>
            </div>
          )}

          {/* Photo Count Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                {(work.images || []).length} Photos
              </span>
            </div>
          </div>

          {/* View Project Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <a
              href={imgSrc || "#"}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-red-800 transition-colors duration-300">
            {work.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed flex-1" style={{display:'-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
            {work.description || "Exceptional craftsmanship and attention to detail in every project we undertake."}
          </p>

          {/* View More Link */}
          <div className="mt-4 flex items-center text-red-800 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Explore more</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}