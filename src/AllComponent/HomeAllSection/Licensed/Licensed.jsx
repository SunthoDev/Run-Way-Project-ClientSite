import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Licensed = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative min-h-screen py-16 md:py-24 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50"
    >
      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Section - Licensed */}
            <motion.div 
              variants={itemVariants}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
              
              <div className="flex items-center mb-8">
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 group-hover:rotate-180 transition-transform duration-500"
                >
                  <motion.span 
                    className="inline-block w-2.5 h-2.5 md:w-3 md:h-3 bg-teal-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Licensed</h3>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mt-1">
                    GPO Certified Courier
                  </h2>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full blur-2xl opacity-50" />
                <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src="https://i.ibb.co/VqG6LzZ/gpo-logo.png" 
                    alt="GPO Logo" 
                    className="w-24 h-24 md:w-32 md:h-32 object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Section - Membership */}
            <motion.div 
              variants={itemVariants}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
              
              <div className="flex items-center mb-8">
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:rotate-180 transition-transform duration-500"
                >
                  <motion.span 
                    className="inline-block w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
                <div>
                  <h3 className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Membership</h3>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mt-1">
                    Professional Associations
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                

                <motion.div
                  whileHover={{ y: -5 }}
                  className="group/card bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover/card:shadow-md transition-shadow duration-300">
                    <img 
                      src="https://i.ibb.co/0jZ8Y6L/ecab-logo.png" 
                      alt="e-CAB Logo" 
                      className="w-14 h-14 md:w-16 md:h-16 object-contain transform group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-gray-700 font-medium text-sm md:text-base">e-CAB Certified</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Licensed; 