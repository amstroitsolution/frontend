import React from 'react';
import { motion } from 'framer-motion';

const FeatureShowcase = () => {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance for seamless user experience",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: "🎨",
      title: "Modern Design",
      description: "Beautiful, contemporary UI that stands out",
      color: "from-pink-400 to-purple-500"
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      description: "Perfect experience on all devices and screen sizes",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime",
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-morph"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Powerful Features for <span className="gradient-text">Modern Business</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in today's digital landscape
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <motion.div
                  className="text-6xl mb-6 relative z-10"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, -10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-500"></div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 text-lg magnetic hover-lift"
          >
            Get Started Today
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
