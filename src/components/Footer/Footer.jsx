import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-pink-50 via-white to-pink-50 border-t border-pink-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-rose-300 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        {/* Logo Section */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-white rounded-lg p-2 shadow-sm border border-pink-100">
              <img
                src="/yashper.png"
                alt="Yashper Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          <p className="text-gray-600 text-xs max-w-sm mx-auto">
            Premium fashion destination for modern style and elegance
          </p>
        </div>

        {/* Elegant Divider */}
        <div className="flex items-center justify-center mb-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
          <div className="mx-2">
            <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <div className="flex flex-col md:flex-row items-center gap-2 text-gray-600">
            <span className="flex items-center gap-1">
              <span>©</span>
              <span className="font-medium">{new Date().getFullYear()}</span>
              <span>Yashper.</span>
            </span>
            <span className="hidden md:inline">•</span>
            <span>All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Development and Designing by</span>
            <a 
              href="https://mawebtechnologies.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 transition-all duration-300 font-semibold hover:underline decoration-pink-300"
            >
              MA Web Technologies
            </a>
          </div>
        </div>
      </div>

      {/* Back To Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-pink-500/30 hover:scale-110 transition-all duration-300 z-50 group border-2 border-white"
        aria-label="Back to top"
      >
        <FaArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;