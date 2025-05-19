import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="hero bg-gradient-to-br from-[#E0F2FE] via-[#F0F9FF] to-white w-full h-[88vh] overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <div className="hero_area_wrapper flex flex-col md:flex-row justify-center h-full items-center gap-8">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="left_content w-full md:w-1/2 flex flex-col gap-6 justify-center"
          >
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight"
              >
                Fast & Secure Courier Delivery Across the Nation
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-gray-600"
              >
                Send your packages safely, quickly, and affordably to any corner
                of the country. Reliable service with real-time tracking and
                doorstep pickup.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="cta_buttons flex gap-4"
            >
              <button className="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Book Delivery Now
              </button>
              <button className="btn-secondary border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Track Package
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              <img 
                src="/src/assets/HeroImage/hero-image.png" 
                alt="Courier Delivery" 
                className="relative z-10 w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
