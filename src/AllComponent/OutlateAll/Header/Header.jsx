import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaBars, FaTimes, FaSearch, FaShoppingBag, FaPhoneAlt } from 'react-icons/fa';
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
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyles = ({ isActive }) =>
    `relative py-2 font-medium transition-all duration-300 text-sm tracking-wide ${isActive
      ? 'text-[#c084fc] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500'
      : isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-purple-100 hover:text-white'
    }`;


  return (
    <div>

      <header className="w-full fixed top-0 left-0 z-50 font-sans">
        {/* ================= Top Bar ================= */}
        <div className={`hidden md:block bg-[#0b0514]/95 backdrop-blur-md text-purple-200/80 text-xs border-b border-white/10 transition-all duration-300 ${isScrolled ? 'hidden md:block' : 'block'}`}>
          <div className="container mx-auto px-6 py-2.5 flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-purple-400"><FaMapMarkerAlt /></span>
                <span>465 NT Road. North West, England</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400"><FaEnvelope /></span>
                <a href="mailto:needhelpflowtrack@gmail.com" className="hover:text-white transition-colors">
                  needhelpflowtrack@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-purple-300/60 font-medium">Follow us:</span>
              <div className="flex items-center gap-2">
                <a href="/" className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all text-xs text-purple-200"><FaFacebookF /></a>
                <a href="/" className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all text-xs text-purple-200"><FaInstagram /></a>
                <a href="/" className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all text-xs text-purple-200"><FaTwitter /></a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Main Navbar with Glassmorphism ================= */}
        <nav className={`w-full transition-all duration-500 ${isScrolled ?
          'bg-white/85 backdrop-blur-xl shadow-lg py-3 border-b border-gray-200/50' :
          'bg-[#100622]/80 backdrop-blur-2xl border-b border-white/10 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
          }`}>
          <div className="container mx-auto px-6 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-9 md:h-10 w-auto object-contain" />
            </Link>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink to="/" className={navLinkStyles}>Home</NavLink>
              <NavLink to="/services" className={navLinkStyles}>Services</NavLink>
              <NavLink to="/track-package" className={navLinkStyles}>Track Package</NavLink>
              <NavLink to="/aboutus" className={navLinkStyles}>About Us</NavLink>
              <NavLink to="/contactus" className={navLinkStyles}>Contact</NavLink>

              {user ? (
                <NavLink to={ad ? "/dashboard/AdminDashboard" : "/dashboard/dashboard"} className={navLinkStyles}>
                  Dashboard
                </NavLink>
              ) : (
                <NavLink to="/singUp" className={navLinkStyles}>Register</NavLink>
              )}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`py-2 pl-3.5 pr-9 rounded-xl text-xs focus:outline-none transition-all duration-300 ${isScrolled
                    ? 'bg-gray-100 text-gray-800 border border-gray-200 focus:border-purple-500'
                    : 'bg-white/5 text-white placeholder-purple-300/50 border border-white/15 focus:border-purple-400 focus:bg-white/10'
                    }`}
                />
                <a className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/70 hover:text-white">
                  <FaSearch className="text-xs" />
                </a>
              </div>

              <Link to="/cart" className={`p-2.5 rounded-xl transition-all ${isScrolled ? 'hover:bg-purple-50 text-gray-700' : 'hover:bg-white/10 text-purple-200 hover:text-white'}`}>
                <FaShoppingBag className="text-base" />
              </Link>

              {!user ? (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 transition-all uppercase tracking-wider"
                >
                  Login
                </Link>
              ) : (
                <a
                  onClick={logOutUser}
                  className="cursor-pointer bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-rose-600/30 transition-all uppercase tracking-wider cursor-pointer"
                >
                  Logout
                </a>
              )}
            </div>

            {/* Mobile Toggle */}
            <a
              className={`cursor-pointer lg:hidden p-2.5 rounded-xl text-lg ${isScrolled ? 'text-gray-800 bg-gray-100' : 'text-white bg-white/10'}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FaBars />
            </a>

          </div>
        </nav>
      </header>

      {/* ================= Mobile Drawer ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#100622] border-r border-white/10 shadow-2xl flex flex-col p-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <a onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <FaTimes />
              </a>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-3 font-medium text-sm">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-purple-200 hover:bg-white/10">Home</NavLink>
              <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-purple-200 hover:bg-white/10">Services</NavLink>
              <NavLink to="/track-package" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-purple-200 hover:bg-white/10">Track Package</NavLink>
              <NavLink to="/aboutus" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-purple-200 hover:bg-white/10">About Us</NavLink>
              <NavLink to="/contactus" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-purple-200 hover:bg-white/10">Contact</NavLink>
              {user ? (
                <NavLink to={ad ? "/dashboard/AdminDashboard" : "/dashboard/dashboard"} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-purple-200 hover:bg-white/10">Dashboard</NavLink>
              ) : (
                <NavLink to="/singUp" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-purple-200 hover:bg-white/10">Register</NavLink>
              )}

              <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-purple-200">
                <div className="flex items-center gap-2"><FaEnvelope className="text-purple-400" /> needhelpflowtrack@gmail.com</div>
                <div className="flex items-center gap-2"><FaPhoneAlt className="text-purple-400" /> 666 888 0000</div>
              </div>

              <div className="pt-4">
                {!user ? (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center bg-purple-600 text-white py-3 rounded-xl font-bold text-xs uppercase">Login</Link>
                ) : (
                  <a onClick={() => { logOutUser(); setIsMobileMenuOpen(false); }} className="cursor-pointer w-full bg-rose-600 text-white py-3 rounded-xl font-bold text-xs uppercase">Logout</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Header;