import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Toggle functionality
  const isKidsSection = location.pathname.startsWith('/kids');
  const currentCategory = isKidsSection ? 'kids' : 'women';

  const handleToggle = (category) => {
    if (category === 'women' && isKidsSection) {
      navigate('/');
    } else if (category === 'kids' && !isKidsSection) {
      navigate('/kids');
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const [menuItems, setMenuItems] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${API}/api/menu/active`);
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        // Fallback to default menu if API fails
        setMenuItems([
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Contact", to: "/contact" },
        ]);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-lg backdrop-blur-lg bg-white/95 py-1.5"
          : "shadow-md backdrop-blur-md bg-white/90 py-2"
      } border-b border-pink-100`}
    >
      <div className="flex justify-between items-center px-4 md:px-12">
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <img
  src="/yashper.png"
  alt="Yashper Logo"
  className={`object-contain transition-all duration-300 hover:scale-125 transform scale-125 ${
    scrolled ? "w-12 h-12 md:w-14 md:h-14" : "w-14 h-14 md:w-16 md:h-16"
  }`}
          />
        </Link>

        {/* MOBILE TOGGLE - Center positioned on mobile */}
        <div className="md:hidden flex-1 flex justify-center">
          <div className="toggle-wrapper-mobile">
            <motion.div
              className="toggle-slider-mobile"
              animate={{
                x: currentCategory === 'women' ? 0 : '100%'
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
            
            <motion.button
              className={`toggle-option-mobile ${currentCategory === 'women' ? 'active' : ''}`}
              onClick={() => handleToggle('women')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Women
            </motion.button>
            
            <motion.button
              className={`toggle-option-mobile ${currentCategory === 'kids' ? 'active' : ''}`}
              onClick={() => handleToggle('kids')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Kids
            </motion.button>
          </div>
        </div>


        {/* DESKTOP TOGGLE */}
        <div className="hidden md:block">
          <div className="toggle-wrapper-desktop">
            <motion.div
              className="toggle-slider-desktop"
              animate={{
                x: currentCategory === 'women' ? 0 : '100%'
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
            
            <motion.button
              className={`toggle-option-desktop ${currentCategory === 'women' ? 'active' : ''}`}
              onClick={() => handleToggle('women')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Women
            </motion.button>
            
            <motion.button
              className={`toggle-option-desktop ${currentCategory === 'kids' ? 'active' : ''}`}
              onClick={() => handleToggle('kids')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Kids
            </motion.button>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 2) * 0.1, duration: 0.3 }}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.to}
                className={`py-2 px-1 relative flex items-center gap-1 transition-all duration-300 ${
                  location.pathname === item.to
                    ? "text-pink-600 font-semibold"
                    : "hover:text-pink-600"
                }`}
              >
                {item.label}
                {/* only show chevron if dropdown exists and has items */}
                {item.dropdown && item.dropdown.length > 0 && (
                  <FaChevronDown
                    className={`text-xs transition-transform duration-300 ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ background: 'linear-gradient(to right, #de3cad, #e854c1)' }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              <AnimatePresence>
                {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.label && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-56 bg-white border border-pink-100 rounded-xl shadow-xl overflow-hidden"
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <motion.li
                        key={subItem.slug}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: subIndex * 0.05 }}
                      >
                        <Link
                          to={`${item.to}/${subItem.slug}`}
                          className="block px-4 py-2.5 hover:text-pink-600 transition-all duration-300 border-b border-pink-50 last:border-0 hover:bg-pink-50"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {subItem.name}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>

        {/* MOBILE MENU ICON */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-2xl text-gray-700 cursor-pointer hover:text-pink-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </motion.div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white shadow-lg"
          >


            <ul className="flex flex-col font-medium text-gray-800">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-pink-100"
                >
                  <div
                    className={`flex justify-between items-center px-6 py-4 transition-all duration-300 cursor-pointer ${
                      location.pathname === item.to
                        ? "bg-pink-50 text-pink-600"
                        : "hover:bg-pink-50 hover:text-pink-600"
                    }`}
                    onClick={() =>
                      item.dropdown
                        ? setActiveDropdown(activeDropdown === item.label ? null : item.label)
                        : setIsMenuOpen(false)
                    }
                  >
                    <Link
                      to={item.to}
                      onClick={(e) => {
                        if (item.dropdown) e.preventDefault();
                        else setIsMenuOpen(false);
                      }}
                      className="flex-1"
                    >
                      {item.label}
                    </Link>
                    {/* only show mobile arrow if dropdown exists and has items */}
                    {item.dropdown && item.dropdown.length > 0 && (
                      <motion.span
                        animate={{ rotate: activeDropdown === item.label ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-bold"
                      >
                        +
                      </motion.span>
                    )}
                  </div>

                  <AnimatePresence>
                    {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.label && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-pink-50 overflow-hidden"
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <motion.li
                            key={subItem.slug}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.03 }}
                          >
                            <Link
                              to={`${item.to}/${subItem.slug}`}
                              className="block px-10 py-3 text-gray-700 hover:text-pink-600 hover:bg-white/50 transition-all border-l-2 border-transparent hover:border-pink-500"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop & Mobile Toggle Styles */}
      <style jsx>{`
        /* Desktop Toggle Styles - Responsive */
        .toggle-wrapper-desktop {
          position: relative;
          display: flex;
          background: rgba(255, 182, 193, 0.1);
          border-radius: 25px;
          padding: 3px;
          border: 1px solid rgba(255, 182, 193, 0.3);
          width: 160px;
          min-width: 160px;
        }

        .toggle-slider-desktop {
          position: absolute;
          top: 3px;
          left: 3px;
          width: calc(50% - 3px);
          height: calc(100% - 6px);
          background: linear-gradient(135deg, #de3cad 0%, #e854c1 100%);
          border-radius: 22px;
          box-shadow: 0 2px 10px rgba(222, 60, 173, 0.3);
          z-index: 1;
        }

        .toggle-option-desktop {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          background: transparent;
          border: none;
          border-radius: 22px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 13px;
          color: rgba(107, 114, 128, 0.8);
          z-index: 2;
          flex: 1;
          font-family: inherit;
          white-space: nowrap;
        }

        .toggle-option-desktop.active {
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .toggle-option-desktop:hover:not(.active) {
          color: rgba(107, 114, 128, 1);
          transform: translateY(-1px);
        }

        /* Tablet responsive */
        @media (max-width: 1024px) {
          .toggle-wrapper-desktop {
            width: 140px;
            min-width: 140px;
          }
          
          .toggle-option-desktop {
            padding: 8px 14px;
            font-size: 12px;
          }
        }
        /* Mobile Toggle Styles - Responsive */
        .toggle-wrapper-mobile {
          position: relative;
          display: flex;
          background: rgba(255, 182, 193, 0.1);
          border-radius: 20px;
          padding: 2px;
          border: 1px solid rgba(255, 182, 193, 0.3);
          width: 120px;
          min-width: 120px;
        }

        .toggle-slider-mobile {
          position: absolute;
          top: 2px;
          left: 2px;
          width: calc(50% - 2px);
          height: calc(100% - 4px);
          background: linear-gradient(135deg, #de3cad 0%, #e854c1 100%);
          border-radius: 18px;
          box-shadow: 0 2px 8px rgba(222, 60, 173, 0.3);
          z-index: 1;
        }

        .toggle-option-mobile {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 11px;
          color: rgba(107, 114, 128, 0.8);
          z-index: 2;
          flex: 1;
          font-family: inherit;
          white-space: nowrap;
        }

        .toggle-option-mobile.active {
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .toggle-option-mobile:hover:not(.active) {
          color: rgba(107, 114, 128, 1);
        }

        /* Extra small screens */
        @media (max-width: 375px) {
          .toggle-wrapper-mobile {
            width: 100px;
            min-width: 100px;
          }
          
          .toggle-option-mobile {
            padding: 6px 8px;
            font-size: 10px;
          }
        }
      `}</style>
    </motion.nav>
  );
}
