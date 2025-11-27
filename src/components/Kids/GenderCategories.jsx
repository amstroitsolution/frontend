import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

export default function GenderCategories() {
  const [showGirlsMenu, setShowGirlsMenu] = useState(false);
  const [showBoysMenu, setShowBoysMenu] = useState(false);

  const girlsCategories = [
    { name: "Ethnic Wear", link: "/kids/ethinics" },
    { name: "Dhoties & Patiala", link: "/kids/dhotiespatiala" },
    { name: "Lehengas & Ghagra", link: "/kids/lehngaghagra" },
    { name: "Kurties & Jumpsuits", link: "/kids/kurtiesjums" },
    { name: "Pants & Salwar", link: "/kids/paintsalwar" },
    { name: "Palazzo & Sharara", link: "/kids/plazosharara" },
    { name: "Saree & Anarkali", link: "/kids/sareeanarkali" },
    { name: "Dresses", link: "/kids/girldresses" },
    { name: "Gowns", link: "/kids/Gowns" },
    { name: "Jumpsuits", link: "/kids/jumpsuite" },
    { name: "Sets", link: "/kids/sets" },
    { name: "New Arrivals", link: "/kids/girlnew" },
    { name: "Wedding Collection", link: "/kids/girlwedding" }
  ];

  const boysCategories = [
    { name: "Ethnic Jackets", link: "/kids/ethicjacket" },
    { name: "Ethnic Sets", link: "/kids/ethicsets" },
    { name: "Kurtas", link: "/kids/kurtaa" },
    { name: "Kurta Sherwani", link: "/kids/kurtasherwani" },
    { name: "Bodysuits", link: "/kids/bodysuite" },
    { name: "Infant Clothing", link: "/kids/inflant" },
    { name: "Jhablas", link: "/kids/jhablas" },
    { name: "Swaddles", link: "/kids/swadless" },
    { name: "New Arrivals", link: "/kids/newarrivle" },
    { name: "Wedding Collection", link: "/kids/weddings" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Explore by <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Gender</span>
          </h2>
          <p className="text-lg text-gray-600">Curated collections for girls and boys</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Girls Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl group h-96"
          >
            <img
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=600&fit=crop"
              alt="Girls Collection"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-600/90 via-pink-500/50 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider mb-2 block">For Her</span>
                <h3 className="text-4xl font-bold mb-3">Girls Collection</h3>
                <p className="text-white/90 mb-6">Beautiful dresses, lehengas & ethnic wear</p>
                
                <div className="relative">
                  <button
                    onClick={() => setShowGirlsMenu(!showGirlsMenu)}
                    className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-50 transition-all shadow-lg"
                  >
                    Shop Girls <FaChevronDown className={`transition-transform ${showGirlsMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showGirlsMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-full mb-2 left-0 bg-white rounded-2xl shadow-2xl p-4 w-64 max-h-96 overflow-y-auto z-50"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          {girlsCategories.map((category, idx) => (
                            <Link
                              key={idx}
                              to={category.link}
                              className="text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-left"
                              onClick={() => setShowGirlsMenu(false)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Boys Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl group h-96"
          >
            <img
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&h=600&fit=crop"
              alt="Boys Collection"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 via-blue-500/50 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider mb-2 block">For Him</span>
                <h3 className="text-4xl font-bold mb-3">Boys Collection</h3>
                <p className="text-white/90 mb-6">Stylish kurtas, sherwanis & ethnic sets</p>
                
                <div className="relative">
                  <button
                    onClick={() => setShowBoysMenu(!showBoysMenu)}
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg"
                  >
                    Shop Boys <FaChevronDown className={`transition-transform ${showBoysMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showBoysMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-full mb-2 left-0 bg-white rounded-2xl shadow-2xl p-4 w-64 max-h-96 overflow-y-auto z-50"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          {boysCategories.map((category, idx) => (
                            <Link
                              key={idx}
                              to={category.link}
                              className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-left"
                              onClick={() => setShowBoysMenu(false)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
