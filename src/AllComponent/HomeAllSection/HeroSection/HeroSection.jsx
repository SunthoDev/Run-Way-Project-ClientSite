import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import './HeroSection.css';

// Memoized button component
const ActionButton = memo(({ children, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`hero-button ${className}`}
    {...props}
  >
    {children}
  </motion.button>
));

// Memoized trust indicator component
const TrustIndicator = memo(({ icon, text, delay }) => (
  <motion.div 
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm relative overflow-hidden"
    whileHover={{ 
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
        delay
      }}
    />
    <motion.span 
      className="text-xl relative z-10"
      animate={{ 
        y: [0, -3, 0],
        rotate: [0, 5, 0],
        transition: { 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.2
        }
      }}
    >
      {icon}
    </motion.span>
    <span className="text-gray-700 text-sm font-medium relative z-10">{text}</span>
  </motion.div>
));

const HeroSection = () => {
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Memoize animation variants
  const variants = useMemo(() => ({
    container: {
      hidden: { 
        opacity: 0,
        y: prefersReducedMotion ? 0 : 20
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.2,
          delayChildren: 0.3,
        },
      },
    },
    item: {
      hidden: { 
        y: prefersReducedMotion ? 0 : 30, 
        opacity: 0 
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: { 
          duration: 0.6,
          ease: "easeOut"
        },
      },
    },
    image: {
      hidden: { 
        opacity: 0, 
        x: prefersReducedMotion ? 0 : 100,
        scale: 0.95
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { 
          duration: 0.8,
          ease: "easeOut"
        },
      },
    },
    float: {
      y: prefersReducedMotion ? 0 : [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }
  }), [prefersReducedMotion]);

  const trustIndicators = useMemo(() => [
    { icon: "🚚", text: "24/7 Delivery", delay: 0 },
    { icon: "🔒", text: "Secure Tracking", delay: 0.5 },
    { icon: "⚡", text: "Fast Service", delay: 1 }
  ], []);

  return (
    <section className="hero-section min-h-screen flex items-center relative overflow-hidden" role="banner">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-4 md:p-8 lg:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <motion.div
              variants={variants.container}
              initial="hidden"
              animate={controls}
              className="space-y-6 md:space-y-8"
            >
              <motion.h1
                variants={variants.item}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Fast & Secure{" "}
                <span className="gradient-text">Courier Delivery</span>{" "}
                Across the Nation
              </motion.h1>

              <motion.p
                variants={variants.item}
                className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed"
              >
                Experience lightning-fast delivery services with real-time tracking
                and complete security. Your packages are in safe hands with our
                professional courier team.
              </motion.p>

              <motion.div
                variants={variants.item}
                className="flex flex-col sm:flex-row gap-4"
              >
                <ActionButton
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Delivery Now
                </ActionButton>
                <ActionButton
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Track Package
                </ActionButton>
              </motion.div>

              <motion.div
                variants={variants.item}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4"
              >
                {trustIndicators.map((indicator, index) => (
                  <TrustIndicator key={index} {...indicator} />
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={variants.image}
              initial="hidden"
              animate={controls}
              className="relative mt-8 md:mt-0"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Courier Delivery Service"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  loading="lazy"
                  onLoad={() => setIsImageLoaded(true)}
                  style={{ opacity: isImageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <motion.div
                animate={variants.float}
                className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg hidden md:block"
              >
                <span className="text-2xl">📦</span>
              </motion.div>
              
              <motion.div
                animate={{
                  ...variants.float,
                  y: prefersReducedMotion ? 0 : [0, -10, 0],
                }}
                className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg hidden md:block"
              >
                <span className="text-2xl">🚚</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection); 