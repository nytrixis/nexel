import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import backgroundImage from '../assets/profile.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center py-20" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="absolute inset-0 bg-black opacity-70 h-[1000px]"></div>
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-center text-white mb-8"
          variants={itemVariants}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-xl text-center text-gray-300 mb-12"
          variants={itemVariants}
        >
          We're here to help. Reach out to us for any queries or support.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <FaEnvelope className="mr-3 text-blue-400" />
                  info@nexel.com
                </li>
                <li className="flex items-center text-gray-300">
                  <FaPhone className="mr-3 text-blue-400" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="mr-3 text-blue-400" />
                  123 Job Street, Career City, 12345
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
