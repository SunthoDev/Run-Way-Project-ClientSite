import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VideoSlider.css';
import Spinner from "./Spinner";

const SLIDE_DURATION = 10; // seconds

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      video: 'https://videos.pexels.com/video-files/6170597/6170597-uhd_2560_1440_25fps.mp4',
      title: 'Fast & Reliable Delivery',
      description: 'Experience seamless courier services with Unicable.',
      cta: { text: 'Explore Services', link: '/services' },
    },
    {
      video: 'https://videos.pexels.com/video-files/6169116/6169116-uhd_2560_1440_25fps.mp4',
      title: 'Real-time Tracking',
      description: 'Track your packages in real-time with our advanced system.',
      cta: { text: 'Try Tracking', link: '/tracking' },
    },
    {
      video: 'https://videos.pexels.com/video-files/6169117/6169117-uhd_2560_1440_25fps.mp4',
      title: 'Door-to-Door Service',
      description: 'Professional courier service right at your doorstep.',
      cta: { text: 'Book Now', link: '/book' },
    },
    {
      video: 'https://videos.pexels.com/video-files/6169118/6169118-uhd_2560_1440_25fps.mp4',
      title: 'Ecommerce Delivery',
      description: 'Trustereo Courier: Delivering Your Growth Take the First Step Towards Smart Logistics.',
      cta: { text: 'Ecommerce Delivery', link: '/EcommerceDelivery' },
    },
    {
      video: 'https://videos.pexels.com/video-files/6169119/6169119-uhd_2560_1440_25fps.mp4',
      title: 'Express Delivery',
      description: 'Need it fast? Our express delivery service ensures your package arrives on time.',
      cta: { text: 'Express Delivery', link: '/express' },
    },
    {
      video: 'https://videos.pexels.com/video-files/6169120/6169120-uhd_2560_1440_25fps.mp4',
      title: 'Secure Handling',
      description: 'Your packages are handled with utmost care and security throughout the journey.',
      cta: { text: 'Learn More', link: '/security' },
    },
    {
      video: 'https://videos.pexels.com/video-files/6169121/6169121-uhd_2560_1440_25fps.mp4',
      title: 'Smart Logistics',
      description: 'Advanced logistics solutions for efficient and cost-effective delivery.',
      cta: { text: 'Our Solutions', link: '/solutions' },
    },
    {
      video: 'https://videos.pexels.com/video-files/6169122/6169122-uhd_2560_1440_25fps.mp4',
      title: 'Customer Support',
      description: '24/7 customer support to assist you with all your delivery needs.',
      cta: { text: 'Contact Us', link: '/contact' },
    }
  ];

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION * 10);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.load();
      const playVideo = async () => {
        try {
          await videoElement.play();
          setIsPlaying(true);
        } catch (error) {
          setIsPlaying(false);
        }
      };
      playVideo();
    }
  }, [currentSlide]);

  const handleLoadedData = () => {
    setLoading(false);
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={slides[currentSlide].video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={handleLoadedData}
            onLoadStart={handleLoadStart}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/30">
              <Spinner />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
              className="text-center px-4 max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10"
            >
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white drop-shadow-lg font-poppins tracking-tight"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 80 }}
                className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 font-inter drop-shadow max-w-2xl mx-auto"
              >
                {slides[currentSlide].description}
              </motion.p>
              <a href={slides[currentSlide].cta.link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 text-lg"
                >
                  {slides[currentSlide].cta.text}
                </motion.button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800/50 z-30">
        <motion.div
          key={currentSlide}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </div>
  );
};

export default VideoSlider; 