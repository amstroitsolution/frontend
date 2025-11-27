import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsClock } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        
        {/* Brand Info */}
        <div>
          {/* <img src="/logosk.jpg" alt="Logo" className="w-24 mb-6 rounded-xl shadow-lg" /> */}

          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Trendy clothing crafted with passion and perfection. Your comfort and style is our priority.
          </p>

          <div className="flex items-center gap-3">
            <a href="#" className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <FaPinterestP size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 tracking-wide">Explore</h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="/" className="hover:text-[#f5c16c] inline-block transition-all">• Home</a></li>
            <li><a href="/about" className="hover:text-[#f5c16c] inline-block transition-all">• About Us</a></li>
            <li><a href="/kids" className="hover:text-[#f5c16c] inline-block transition-all">• Kids Collection</a></li>
            <li><a href="/mens" className="hover:text-[#f5c16c] inline-block transition-all">• Mens Wear</a></li>
            <li><a href="/womens" className="hover:text-[#f5c16c] inline-block transition-all">• Womens Wear</a></li>
            <li><a href="/gallery" className="hover:text-[#f5c16c] inline-block transition-all">• Gallery</a></li>
            <li><a href="/contact" className="hover:text-[#f5c16c] inline-block transition-all">• Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 tracking-wide">Contact</h3>

          <ul className="space-y-5 text-gray-300">
            <li className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#f5c16c] text-xl mt-1" />
              <span className="text-sm leading-relaxed">
                Plot No. 109–110, Dharam Colony Part–2, Gurugram, HR – 122017
              </span>
            </li>

            <li className="flex items-center gap-4">
              <BsClock className="text-[#f5c16c] text-xl" />
              <span className="text-sm">Mon to Sat: 9:00 AM to 7:00 PM</span>
            </li>

            <li className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#f5c16c] text-xl" />
              <div className="text-sm">
                <div>+91 98730 67222</div>
                <div>+91 98730 67672</div>
              </div>
            </li>

            <li className="flex items-center gap-4">
              <HiOutlineMail className="text-[#f5c16c] text-xl" />
              <span className="text-sm">info@sarveshkumarassociates.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Sarvesh Kumar Associates. All rights reserved.</p>
      </div>

      {/* WhatsApp Floating */}
      <a
        href="https://wa.me/919873067672"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all z-50"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Back To Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[#f5c16c] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-50"
      >
        <FaArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
