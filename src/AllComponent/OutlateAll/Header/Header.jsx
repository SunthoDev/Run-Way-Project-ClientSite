import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaInstagram, 
  FaGooglePlusG, 
  FaTwitter, 
  FaBars, 
  FaTimes, 
  FaSearch, 
  FaShoppingBag 
} from 'react-icons/fa';
import logo from "../../../assets/logo/Logo.png";
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../Hook/useRole';

const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [roles] = useRole();
  const ad = roles?.role === "admin";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Common NavLink styling class with active state
  const navLinkStyles = ({ isActive }) =>
    `relative py-1 font-medium transition-colors duration-200 ${
      isActive 
        ? 'text-[#00A3FF] font-semibold after:content-[""] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-[#00A3FF]' 
        : isScrolled ? 'text-gray-700 hover:text-[#00A3FF]' : 'text-gray-200 hover:text-[#00A3FF]'
    }`;

  return (
    <header className="w-full fixed top-0 left-0 z-50 font-sans">
      
      {/* ================= Top Bar (Contact & Social) ================= */}
      <div 
        className={`bg-[#091527] text-gray-300 text-xs border-b border-gray-800 transition-all duration-300 ${
          isScrolled ? 'hidden md:block' : 'block'
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Address & Email */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-gray-300">
              <FaMapMarkerAlt className="text-[#00A3FF]" />
              <span>465 NT Road. North West, England</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaEnvelope className="text-[#00A3FF]" />
              <a href="mailto:needhelpflowtrack@gmail.com" className="hover:text-[#00A3FF] transition-colors">
                needhelpflowtrack@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400">Follow us:</span>
            <div className="flex items-center gap-2">
              <a href="#" className="w-6 h-6 rounded bg-[#16253b] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all text-xs">
                <FaFacebookF />
              </a>
              <a href="#" className="w-6 h-6 rounded bg-[#16253b] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all text-xs">
                <FaInstagram />
              </a>
              <a href="#" className="w-6 h-6 rounded bg-[#16253b] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all text-xs">
                <FaGooglePlusG />
              </a>
              <a href="#" className="w-6 h-6 rounded bg-[#16253b] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all text-xs">
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ================= Main Navbar ================= */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg py-3 text-gray-800' 
            : 'bg-[#0d1b2a] text-white py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-9 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links (NavLinks Only, No Scroll) */}
          <div className="hidden lg:flex items-center space-x-8 text-[15px]">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>

            <NavLink to="/services" className={navLinkStyles}>
              Services
            </NavLink>

            <NavLink to="/track-package" className={navLinkStyles}>
              Track Package
            </NavLink>

            <NavLink to="/about" className={navLinkStyles}>
              About Us
            </NavLink>

            <NavLink to="/contact" className={navLinkStyles}>
              Contact
            </NavLink>

            {/* Dynamic Dashboard / Register Route */}
            {user ? (
              <NavLink 
                to={ad ? "/dashboard/AdminDashboard" : "/dashboard/dashboard"}
                className={navLinkStyles}
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/singUp" className={navLinkStyles}>
                Register
              </NavLink>
            )}
          </div>

          {/* Right Action Icons & Button */}
          <div className="hidden lg:flex items-center space-x-5">
            
            {/* Search Input Box */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search...." 
                className={`py-1.5 pl-3 pr-8 rounded text-xs focus:outline-none transition-all ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-800 border border-gray-300 focus:border-[#00A3FF]' 
                    : 'bg-[#16253b] text-white placeholder-gray-400 focus:bg-[#1a2d47]'
                }`}
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00A3FF]">
                <FaSearch className="text-xs" />
              </button>
            </div>

            {/* Shopping Cart Icon */}
            <Link to="/cart" className="relative p-2 hover:text-[#00A3FF] transition-colors">
              <FaShoppingBag className="text-lg" />
            </Link>

            {/* Authentication Action Button */}
            {!user ? (
              <Link 
                to="/login"
                className="bg-[#00A3FF] hover:bg-blue-600 text-white text-xs font-semibold px-5 py-2.5 rounded transition-all uppercase tracking-wider"
              >
                LOGIN
              </Link>
            ) : (
              <button 
                onClick={logOutUser}
                className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-5 py-2.5 rounded transition-all uppercase tracking-wider"
              >
                LOGOUT
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 text-2xl focus:outline-none text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* ================= Mobile Navigation Drawer ================= */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t border-gray-800 ${isScrolled ? 'bg-white text-gray-800' : 'bg-[#091527] text-white'}`}>
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3 font-medium text-sm">
              <NavLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#00A3FF] py-1"
              >
                Home
              </NavLink>

              <NavLink 
                to="/services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#00A3FF] py-1"
              >
                Services
              </NavLink>

              <NavLink 
                to="/track-package" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#00A3FF] py-1"
              >
                Track Package
              </NavLink>

              <NavLink 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#00A3FF] py-1"
              >
                About Us
              </NavLink>

              <NavLink 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#00A3FF] py-1"
              >
                Contact
              </NavLink>

              {user ? (
                <NavLink 
                  to={ad ? "/dashboard/AdminDashboard" : "/dashboard/dashboard"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#00A3FF] py-1"
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink 
                  to="/singUp"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#00A3FF] py-1"
                >
                  Register
                </NavLink>
              )}

              {!user ? (
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block text-center bg-[#00A3FF] text-white py-2 rounded font-semibold mt-2"
                >
                  Login
                </Link>
              ) : (
                <button 
                  onClick={() => { logOutUser(); setIsMobileMenuOpen(false); }}
                  className="w-full text-center bg-red-500 text-white py-2 rounded font-semibold mt-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

    </header>
  );
};


export default Header;