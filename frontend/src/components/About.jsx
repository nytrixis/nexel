import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBriefcase, FaHandshake, FaUsers, FaChartLine } from 'react-icons/fa';
import backgroundImage from '../assets/profile.jpg'; // Make sure to have this image in your assets folder

const About = () => {
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

  const features = [
    { icon: FaSearch, title: 'Smart Job Matching', description: 'Our AI-powered algorithm finds the perfect job matches for you.' },
    { icon: FaBriefcase, title: 'Diverse Opportunities', description: 'From startups to Fortune 500 companies, find your ideal workplace.' },
    { icon: FaHandshake, title: 'Direct Connections', description: 'Connect directly with employers and recruiters.' },
    { icon: FaUsers, title: 'Community Support', description: 'Join our community of job seekers for support and advice.' },
    { icon: FaChartLine, title: 'Career Growth', description: 'Access resources and tools to accelerate your career growth.' },
  ];

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center py-20" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="absolute inset-0 bg-black opacity-70 overflow-y-auto h-[1000px]"></div>
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-center text-white mb-8"
          variants={itemVariants}
        >
          About Nexel
        </motion.h1>
        <motion.p 
          className="text-xl text-center text-gray-300 mb-12"
          variants={itemVariants}
        >
          Empowering your career journey with cutting-edge technology and human-centric approach.
        </motion.p>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
              variants={itemVariants}
            >
              <feature.icon className="text-4xl text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <a 
            href="/register" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Join Nexel Today
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
