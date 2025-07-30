import React, { useEffect, useState, useContext } from 'react';
import "./Header.css"
import { Link, Navigate, NavLink } from 'react-router-dom';
import logo from "../../../assets/logo/logo.png"
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../Hook/useRole';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const Header = () => {

    let { user, logOutUser } = useContext(AuthContext)
    const [roles] = useRole()
    const ad = roles?.role === "admin"
    
    // ==========================================================


    const [menu, setMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const navlinks = [
        {
            path: "/",
            label: "Home"
        },
        {
            path: "/services",
            label: "Services"
        },
        {
            path: "/tracking",
            label: "Track Package"
        },
        {
            path: "/about",
            label: "About Us"
        },
        {
            path: "/contact",
            label: "Contact"
        }
    ];

    // If user is logged in, add Dashboard
    if (user) {
        // navlinks.push({ path: "/dashboard", label: "Dashboard" });
        navlinks.push({ path: `${ad ? "/dashboard/AdminDashboard" : "/dashboard/dashboard"}`, label: "Dashboard" });
    } else {
        navlinks.push(
            { path: "/signup", label: "Register" }
        );
    }

    useEffect(() => {
        const nav = document.querySelector("header");
        const navHeight = 80;
        // the point the scroll starts from (in px)
        let lastScrollY = 0;

        const scrolled = () => {
            let sy = window.scrollY;
            if (Math.abs(sy - navHeight) > 5) {
                // setNavUp(sy > navHeight);


                // scroll down -> hide nav bar
                if (sy > lastScrollY && sy > navHeight) {
                    nav.classList.add("nav-up");
                    setMenu(false)
                }
                // scroll up -> show nav bar
                else if (sy < lastScrollY) {
                    nav.classList.remove("nav-up");
                    nav.classList.add("fixed")
                    if (sy == 0) {
                        nav.classList.remove("fixed");
                    }

                }

                // update current scroll point
                lastScrollY = sy;
            }
        }

        window.addEventListener("scroll", scrolled);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <motion.header
            ref={ref}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-md shadow-lg'
                : 'bg-black/60 backdrop-blur-md'
                }`}
        >

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="flex items-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-24 w-auto md:h-28 lg:h-32 max-h-32 min-h-20 transition-all duration-300 object-contain"
                                style={{ maxWidth: '300px', minWidth: '140px' }}
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:flex items-center space-x-8"
                    >
                        {navlinks.map((link, index) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `${isScrolled
                                        ? 'text-gray-800 hover:text-blue-600'
                                        : 'text-white hover:text-blue-300'
                                    } transition-colors duration-300 ${isActive
                                        ? isScrolled
                                            ? 'text-blue-600 font-semibold'
                                            : 'text-blue-300 font-semibold'
                                        : ''
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        {!user && (
                            <Link
                                to="/login"
                                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isScrolled
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-white/20 text-white hover:bg-white/40'
                                    }`}
                            >
                                Login
                            </Link>
                        )}
                    </motion.nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <div className="w-6 h-6 flex flex-col justify-around">
                            <span className={`block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                            <span className={`block w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden shadow-lg ${isScrolled ? 'bg-white' : 'bg-black/90'
                            }`}
                    >
                        <div className="container mx-auto px-4 py-4">
                            <nav className="flex flex-col space-y-4">
                                {navlinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `${isScrolled
                                                ? 'text-gray-800 hover:text-blue-600'
                                                : 'text-white hover:text-blue-300'
                                            } transition-colors duration-300 ${isActive
                                                ? isScrolled
                                                    ? 'text-blue-600 font-semibold'
                                                    : 'text-blue-300 font-semibold'
                                                : ''
                                            }`
                                        }
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                                <Link
                                    to="/login"
                                    className={`px-6 py-2 rounded-lg transition-colors duration-300 text-center ${isScrolled
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-white/20 text-white hover:bg-white/40'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className={`mt-2 px-6 py-2 rounded-lg transition-colors duration-300 text-center ${isScrolled
                                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                                        : 'bg-white/20 text-white hover:bg-white/40'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.header>
    );
};

export default Header;



// {user ?
//     <button className='Dashboard'>
//         <Link to={ad ? "/dashboard/AdminDashboard" : "/dashboard/dashboard"}><a>Dashboard</a></Link>
//     </button>
//     :
//     <>
//         <button className='LogIn'>
//             <Link to="/login"><a>Login</a></Link></button>
//         <button className='singUP'>
//             <Link to="/singUp"><a>Register</a></Link>
//         </button>
//     </>

// }