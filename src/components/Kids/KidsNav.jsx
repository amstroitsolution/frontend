// src/components/KidsNav.jsx
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const CLOSE_DELAY = 250;
const OPEN_DELAY = 80;

const KidsNav = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
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

  // 🌸 Active section check
  const isActiveSection = (section) => location.pathname.includes(section);

  const girlsMenu = {
    "Ethnic Wear": [
      { name: "Ethinic Wear", link: "/kids/ethinics" },
      { name: "Dhotis & Patialas", link: "/kids/dhotiespatiala" },
      { name: "Kurtis & Jumpsuits", link: "/kids/kurtiesjums" },
      { name: "Lehengas & Ghagras", link: "/kids/lehngaghagra" },
      { name: "Palazzos & Shararas", link: "/kids/plazosharara" },
      { name: "Pants & Salwars", link: "/kids/paintsalwar" },
      { name: "Sarees & Anarkalis", link: "/kids/sareeanarkali" },
    ],
    "Dresses & Gowns": [
      { name: "Dresses", link: "/kids/girldresses" },
      { name: "Gowns", link: "/kids/gowns" },
      { name: "Jumpsuits", link: "/kids/jumpsuite" },
      { name: "Sets", link: "/kids/sets" },
    ],
    Trending: [
      { name: "New Arrivals", link: "/kids/girlnew" },
      { name: "Wedding", link: "/kids/girlwedding" },
    ],
  };

  const boysMenu = {
    "Ethnic Wear": [
      { name: "Ethnic Jackets", link: "/kids/ethicjacket" },
      { name: "Ethnic Sets", link: "/kids/ethicsets" },
      { name: "Kurtas", link: "/kids/kurtaa" },
      { name: "Sherwani Sets", link: "/kids/kurtasherwani" },
    ],
    "Baby Essentials": [
      { name: "Bodysuits", link: "/kids/bodysuite" },
      { name: "Infant Clothing", link: "/kids/inflant" },
      { name: "Jhablas", link: "/kids/jhablas" },
      { name: "Swaddles", link: "/kids/swadless" },
    ],
    Trending: [
      { name: "New Arrivals", link: "/kids/newarrivle" },
      { name: "Wedding", link: "/kids/weddings" },
    ],
  };

  const clearTimers = useCallback(() => {
    clearTimeout(openTimerRef.current);
    clearTimeout(closeTimerRef.current);
  }, []);

  const scheduleOpen = useCallback(
    (key) => {
      clearTimers();
      openTimerRef.current = setTimeout(() => setOpenMenu(key), OPEN_DELAY);
    },
    [clearTimers]
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  }, [clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const DropdownCard = ({ menu }) => (
    <div
      className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white shadow-xl rounded-2xl border border-pink-100 
                 w-[700px] py-5 px-6 grid grid-cols-3 gap-x-8 gap-y-4 z-50 transition-all duration-200"
      onMouseEnter={clearTimers}
      onMouseLeave={scheduleClose}
    >
      {Object.entries(menu).map(([title, items]) => (
        <div key={title}>
          <h3 className="font-semibold text-pink-600 mb-2 text-sm uppercase tracking-wide">
            {title}
          </h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {items.map((it) => (
              <li key={it.name}>
                <Link
                  to={it.link}
                  className="block hover:text-pink-500 transition-colors"
                >
                  {it.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-[#fff0f5] via-[#ffe6f0] to-[#fff] shadow-md px-4 md:px-6 relative z-50">
      <div className="flex items-center justify-between h-16">
       <Link to="/kids" className="flex-shrink-0">
  <img 
    src="/yashper.png" 
    alt="Yashper Logo" 
    className="w-14 h-14 md:w-16 md:h-16 object-contain transition-all duration-300 hover:scale-125 transform scale-125"
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

        {/* Center Nav */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-20 font-medium text-gray-800 items-center">
          <li
            className="relative"
            onMouseEnter={() => scheduleOpen("girls")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`text-lg pb-1 transition-all ${
                isActiveSection("girl")
                  ? "text-pink-700 font-semibold border-b-2 border-pink-500"
                  : "hover:text-pink-600"
              }`}
            >
              Girls
            </button>
            {openMenu === "girls" && <DropdownCard menu={girlsMenu} />}
          </li>

          <li
            className="relative"
            onMouseEnter={() => scheduleOpen("boys")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`text-lg pb-1 transition-all ${
                isActiveSection("boy")
                  ? "text-blue-700 font-semibold border-b-2 border-blue-400"
                  : "hover:text-blue-500"
              }`}
            >
              Boys
            </button>
            {openMenu === "boys" && <DropdownCard menu={boysMenu} />}
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-pink-600"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 bg-white rounded-2xl p-4 shadow-md border border-pink-100">
          {["girls", "boys"].map((type) => {
            const menu = type === "girls" ? girlsMenu : boysMenu;
            const isOpen = openMenu === type;

            return (
              <div key={type} className="mb-2 border-b border-pink-50">
                <button
                  className={`w-full text-left font-semibold cursor-pointer text-lg flex justify-between items-center py-2 ${
                    type === "girls"
                      ? "text-pink-600"
                      : "text-blue-600"
                  }`}
                  onClick={() => setOpenMenu(isOpen ? null : type)}
                >
                  {type === "girls" ? "Girls" : "Boys"}
                  <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="mt-2 ml-3 animate-[fadeIn_0.25s_ease]">
                    {Object.entries(menu).map(([cat, items]) => (
                      <div key={cat} className="mb-3">
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {cat}
                        </p>
                        <ul className="text-gray-700 text-sm space-y-1">
                          {items.map((it) => (
                            <li key={it.name}>
                              <Link
                                to={it.link}
                                className="block hover:text-pink-500 transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {it.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
    </nav>
  );
};

export default KidsNav;
