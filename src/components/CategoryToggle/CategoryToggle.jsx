import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CategoryToggle.css';

const CategoryToggle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine current category based on route
  const isKidsSection = location.pathname.startsWith('/kids');
  const currentCategory = isKidsSection ? 'kids' : 'women';

  const handleToggle = (category) => {
    if (category === 'women' && isKidsSection) {
      navigate('/');
    } else if (category === 'kids' && !isKidsSection) {
      navigate('/kids');
    }
  };

  return (
    <div className="category-toggle-container">
      <div className="category-toggle">
        <div className="toggle-wrapper">
          <motion.div
            className="toggle-slider"
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
            className={`toggle-option ${currentCategory === 'women' ? 'active' : ''}`}
            onClick={() => handleToggle('women')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Women
          </motion.button>
          
          <motion.button
            className={`toggle-option ${currentCategory === 'kids' ? 'active' : ''}`}
            onClick={() => handleToggle('kids')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Kids
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CategoryToggle;