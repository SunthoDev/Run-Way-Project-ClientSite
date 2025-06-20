import React from 'react';
import { motion } from 'framer-motion';
import './OurServices.css';

const OurServices = () => {
  const services = [
    {
      icon: "🚚",
      title: "Express Delivery",
      description: "Fast and reliable delivery services for your urgent packages",
      features: ["Same-day delivery", "Real-time tracking", "Secure handling"]
    },
    {
      icon: "🌍",
      title: "Ecommerce Delivery",
      description: "Fast & Secure Courier Delivery Across the Nation",
      features: ["Cash on Delivery", "Daily pickup, no limits", "24/7 Customer Service"]
    },
    {
      icon: "📦",
      title: "Package Handling",
      description: "Professional handling of all types of packages",
      features: ["Fragile handling", "Temperature control", "Special packaging"]
    },
    {
      icon: "📱",
      title: "Digital Tracking",
      description: "Advanced tracking system for your shipments",
      features: ["Live updates", "SMS notifications", "Mobile app access"]
    },
    {
      icon: "🏢",
      title: "Business Solutions",
      description: "Tailored logistics solutions for businesses",
      features: ["Bulk shipping", "Warehouse solutions", "Supply chain management"]
    },
    {
      icon: "🛡️",
      title: "Secure Delivery",
      description: "Ensuring the safety of your valuable packages",
      features: ["Insurance coverage", "Secure packaging", "Signature confirmation"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="services-container py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Trusted Transport Logistic Company 
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          With our commitment excellence dedication customer satisfaction, we're here streamline supply chain and drive your business.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="service-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center text-gray-700"
                >
                  <span className="text-blue-500 mr-2">✓</span>
                  {feature}
                </motion.li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trustereo Courier: Delivering Your Growth
          </h3>
          <p className="text-white/90 mb-8 text-lg">
            Fast, Reliable & Nationwide — Trustereo Courier is Always On Time.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:from-teal-500 hover:to-blue-600 transition"
          >
            Become a Merchant
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OurServices;