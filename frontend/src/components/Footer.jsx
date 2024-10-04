import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-[#1a1a2e] text-[#f3f4f6] py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-[#007bff]">Nexel</h2>
            <p className="text-sm text-[#00ffab]">Connect to What's Next</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#00ffab]">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-[#00ffab]">Jobs</Link></li>
              <li><Link to="/profile" className="hover:text-[#00ffab]">Profile</Link></li>
              <li><Link to="/about" className="hover:text-[#00ffab]">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p>Email: info@nexel.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-2xl hover:text-[#00ffab]" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-2xl hover:text-[#00ffab]" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-2xl hover:text-[#00ffab]" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-2xl hover:text-[#00ffab]" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Nexel. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
