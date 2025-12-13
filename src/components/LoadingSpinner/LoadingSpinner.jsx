import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', variant = 'default' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  if (variant === 'dots') {
    return (
      <div className="flex gap-2 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
            className="w-3 h-3 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
        className={`${sizes[size]} rounded-full`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  }

  if (variant === 'bars') {
    return (
      <div className="flex gap-1 items-end h-12">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            style={{ background: 'linear-gradient(135deg, #de3cad, #e854c1)' }}
            className="w-2 rounded-full"
            animate={{
              height: ['20px', '48px', '20px']
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`${sizes[size]} relative`}>
      <motion.div
        style={{ borderColor: '#de3cad', borderTopColor: 'transparent' }}
        className="absolute inset-0 border-4 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        style={{ borderColor: '#e854c1', borderBottomColor: 'transparent' }}
        className="absolute inset-2 border-4 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
