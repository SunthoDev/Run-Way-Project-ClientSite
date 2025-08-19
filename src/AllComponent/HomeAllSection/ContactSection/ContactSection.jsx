import React from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <div id="contact" className="contact-section relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="aurora-bg">
        <div className="aurora-1"></div>
        <div className="aurora-2"></div>
        <div className="aurora-3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="glass-effect rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h3>
              <div className="space-y-8">
                <motion.div 
                  className="flex items-start space-x-4 hover-lift"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="icon-container flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Office Address</h4>
                    <p className="text-gray-600">N/17,Noorjahanroad, Mohammadpur</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4 hover-lift"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="icon-container flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email Us</h4>
                    <p className="text-gray-600">infotrustereocourier@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4 hover-lift"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="icon-container flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Call Us</h4>
                    <p className="text-gray-600">09611-049234</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="glass-effect rounded-2xl p-8 shadow-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full p-4 rounded-xl focus:ring-2 focus:ring-[#22afa3] focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full p-4 rounded-xl focus:ring-2 focus:ring-[#22afa3] focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="w-full p-4 rounded-xl focus:ring-2 focus:ring-[#22afa3] focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <input 
                      type="text" 
                      placeholder="City" 
                      className="w-full p-4 rounded-xl focus:ring-2 focus:ring-[#22afa3] focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <textarea 
                    placeholder="Your Message" 
                    className="w-full p-4 rounded-xl h-40 focus:ring-2 focus:ring-[#22afa3] focus:border-transparent transition-all duration-300"
                  ></textarea>
                </motion.div>

                <motion.button 
                  className="w-full bg-gradient-to-r from-[#22afa3] to-[#3b82f6] text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection; 