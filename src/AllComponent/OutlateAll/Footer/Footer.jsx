import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import logo from "../../../assets/Footer/logo/Logo.png";
import google from "../../../assets/Footer/Google.png";

const Footer = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const footerLinks = {
        navigation: [
            { label: 'Home', path: '/' },
            { label: 'About Us', path: '/about' },
            { label: 'Services', path: '/services' },
            { label: 'Contact Us', path: '/contact' },
            { label: 'Our Blog', path: '/blog' },
        ],
        quickLink: [
            { label: 'Help', path: '/contact' },
            { label: 'Support', path: '/contact' },
            { label: 'Clients', path: '/testimonial' },
            { label: 'Shop', path: '/shop' },
            { label: 'Portfolio', path: '/project' },
        ],
    };

    return (
        <motion.footer
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="site-footer bg-[#181818] text-white pt-20 pb-10 relative overflow-hidden font-sans"
        >
            {/* Background Shape 1 (Left Floating) */}
            <div className="site-footer__shape-1 absolute top-10 left-10 pointer-events-none opacity-20 hidden lg:block float-bob-x">
                <img src="https://react-nextjs-flowtrack.mnsithub.com/assets/footer-shape-2-DnJIneLC.png" alt="Shape 1" />
            </div>

            {/* Background Shape 2 (Right Topographic Waves) */}
            <div className="site-footer__shape-2 absolute top-0 right-0 pointer-events-none opacity-30 h-full float-bob-y hidden lg:block">
                <img src="https://react-nextjs-flowtrack.mnsithub.com/assets/footer-shape-1-DAB0i3Di.png" alt="Shape 2" className="h-full object-contain" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="site-footer__top-inner">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
                        
                        {/* Column 1: Logo, Address, Contact info */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-3 col-span-1"
                        >
                            <div className="footer-widget__about">
                                <div className="footer-widget__logo mb-6">
                                    <a href="/">
                                        <img 
                                            src={logo} 
                                            alt="Trustereo Logo" 
                                            className="h-9 md:h-10 w-auto object-contain"
                                        />
                                    </a>
                                </div>
                                <p className="footer-widget__about-text text-gray-400 text-sm leading-relaxed mb-6">
                                    N/17, Mirpur Dhaka.<br />
                                    infotrustereocourier@gmail.com
                                </p>
                                <div className="footer-widget__emergency-call flex flex-col space-y-1">
                                    <a href="tel:09611049234" className="text-yellow-400 font-bold text-lg hover:underline">
                                        Hotline: 09611-049234
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Column 2: Navigation Links */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="lg:col-span-3 col-span-1"
                        >
                            <div className="footer-widget__column">
                                <div className="footer-widget__title-box mb-6">
                                    <h3 className="footer-widget__title text-xl font-bold text-white tracking-wide">Navigation</h3>
                                </div>
                                <ul className="footer-widget__navigation-list space-y-3 list-none p-0 m-0">
                                    {footerLinks.navigation.map((link, index) => (
                                        <li key={index}>
                                            <a href={link.path} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Column 3: Quick Links */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="lg:col-span-2 col-span-1"
                        >
                            <div className="footer-widget__column">
                                <div className="footer-widget__title-box mb-6">
                                    <h3 className="footer-widget__title text-xl font-bold text-white tracking-wide">Quick Link</h3>
                                </div>
                                <ul className="footer-widget__navigation-list space-y-3 list-none p-0 m-0">
                                    {footerLinks.quickLink.map((link, index) => (
                                        <li key={index}>
                                            <a href={link.path} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Column 4: Newsletter Subscription */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="lg:col-span-4 col-span-1"
                        >
                            <div className="footer-widget__column">
                                <div className="footer-widget__title-box mb-6">
                                    <h3 className="footer-widget__title text-xl font-bold text-white tracking-wide">Newsletter</h3>
                                </div>
                                <p className="footer-widget__newsletter-text text-gray-400 text-sm mb-6">
                                    Subscribe our newsletter to get the<br /> latest news &amp; updates
                                </p>
                                <form onSubmit={(e) => e.preventDefault()} className="footer-widget__newsletter-form">
                                    <div className="footer-widget__newsletter-input-box relative flex items-center bg-white rounded-full overflow-hidden p-1 shadow-lg max-w-md">
                                        <input 
                                            type="email" 
                                            placeholder="email@example.com" 
                                            name="email" 
                                            required 
                                            className="w-full px-4 py-2 text-gray-800 focus:outline-none text-sm bg-transparent"
                                        />
                                        <button 
                                            type="submit" 
                                            className="footer-widget__newsletter-btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 w-11 h-11 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                                        >
                                            <FaPaperPlane className="text-sm" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Bottom Bar Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="site-footer__bottom mt-16 pt-6 border-t border-gray-800"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        {/* Copyright Text */}
                        <p className="site-footer__bottom-text text-gray-400 text-sm">
                            Copyright © {new Date().getFullYear()} Trustereo Courier. All Rights Reserved | Designer By: <a href="https://my-portfolio-shipon.web.app" target="_blank" rel="noreferrer" className="hover:underline text-yellow-400 font-medium">Shipon Deb</a>
                        </p>

                        {/* Social Icons & Google App Badge */}
                        <div className="flex items-center space-x-6">
                            <div className="site-footer__social flex space-x-4">
                                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 text-gray-300 flex items-center justify-center transition-colors duration-300">
                                    <FaTwitter size={14} />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 text-gray-300 flex items-center justify-center transition-colors duration-300">
                                    <FaFacebook size={14} />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 text-gray-300 flex items-center justify-center transition-colors duration-300">
                                    <FaInstagram size={14} />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 text-gray-300 flex items-center justify-center transition-colors duration-300">
                                    <FaLinkedin size={14} />
                                </a>
                            </div>
                            
                            {/* Google Download Badge */}
                            <div className="hidden sm:block">
                                <img src={google} alt="Google Play" className="h-10 object-contain" />
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </motion.footer>
    );
};

export default Footer;