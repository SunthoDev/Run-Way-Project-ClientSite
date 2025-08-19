import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import "./Footer.css"
import logo from "../../../assets/Footer/logo.png"
// import apple from "../../../assets/Footer/apple.png"
import google from "../../../assets/Footer/Google.png"

const Footer = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const footerLinks = {
        company: [
            { label: 'About Us', path: '/about' },
            { label: 'Contact Us', path: '/contact' },
            { label: 'Blog', path: '/blog' },
        ],
        services: [
            { label: 'Home Delivery', path: '/services/home-delivery' },
            { label: 'Pick and Drop', path: '/services/pick-drop' },
            { label: 'Express Delivery', path: '/services/express' },
        ],
        earn: [
            { label: 'Become Merchant', path: '/become-merchant' },
            { label: 'Become Rider', path: '/become-rider' },
            { label: 'Franchise', path: '/franchise' },
        ],
    };

    return (
        <motion.footer
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 text-white pt-20 pb-10"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="col-span-1 lg:col-span-2"
                    >
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="h-20 w-auto md:h-24 lg:h-28 max-h-28 min-h-16 mb-6 object-contain transition-all duration-300"
                            style={{ maxWidth: '260px', minWidth: '120px' }}
                        />
                        <p className="text-gray-400 mb-6">
                            N/17,Mirpur Dhaka.<br />
                            infotrustereocourier@gmail.com<br />
                            Hotline: 09611-049234

                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-xl font-semibold mb-6">Services</h3>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.path}
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Earn */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold mb-6">Earn</h3>
                        <ul className="space-y-4">
                            {footerLinks.earn.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.path}
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <h3 className="text-xl font-semibold mb-6">Company</h3>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.path}
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-16 pt-8 border-t border-gray-800"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Trustereo Courier. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <img src={google} alt="Google Play" className="h-12" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;