import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import './ExperienceSection.css';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(".experience-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const stats = [
    { value: "400+", label: "Logistics Outlets", icon: "🏢" },
    { value: "64+", label: "Districts Service", icon: "🌍" },
    { value: "1M+", label: "Deliveries", icon: "📦" },
  ];

  return (
    <section className="experience-section bg-gradient-to-b from-gray-50 to-white py-20 px-4 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold"
              >
                About Us
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                Trusted Transport Logistic Company
              </motion.h2>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg leading-relaxed"
            >

              Trustereo Courier is a dynamic and customer-centric courier and logistics company based in Bangladesh.
              We are committed to providing fast, secure, and reliable delivery solutions tailored to meet the unique needs of both individuals and businesses.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-700 font-medium text-lg"
            >
              Leveraging modern technology and a dedicated team,
              we ensure that every package reaches its destination promptly and safely.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="contact-button bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </motion.button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span className="font-bold text-xl text-gray-800">
                  +880 9611-049234

                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="stats-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-orange-500 font-bold text-2xl mb-2"
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Images Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              src: "https://i.ibb.co/p6dJyC4c/Purple-Truck-and-Train-Journey.png",
              alt: "Plane and Truck",
            },
            {
              src: "https://i.ibb.co/dsqF7dMN/Trustereo-Courier-Delivery-Scene.png",
              alt: "Night Truck",
            },
            {
              src: "https://i.ibb.co/SwTqJ7dn/Trust-cu.png",
              alt: "Logistics Hub",
            },
          ].map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-[250px] object-cover transform hover:scale-105 transition-transform duration-500"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection; 