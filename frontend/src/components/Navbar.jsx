import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      className="fixed w-full bg-opacity-90 bg-[#1a1a2e] text-[#f3f4f6] p-4 font-sans z-20"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 0.7, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold text-[#007bff]"
          whileHover={{ scale: 1.1 }}
        >
          Nexel
        </motion.div>
        <ul className="flex space-x-20 text-xl">
          {['Home', 'About Us', 'Contact'].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }}>
              <Link 
                to={`/${item.toLowerCase()}`} 
                className="hover:text-[#00ffab] transition-colors duration-300"
              >
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.button
          className="bg-[#00ffab] text-[#1a1a2e] px-4 py-2 rounded-full font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
