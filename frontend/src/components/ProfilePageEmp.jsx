import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPlus, FaClipboardList, FaBell, FaSignOutAlt, FaTimes, FaBars, FaList } from 'react-icons/fa';
import profileBg from '../assets/profile.jpg';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween' }}
          className="fixed left-0 top-0 h-full w-64 bg-black bg-opacity-90 text-white p-5 z-50"
        >
          <button onClick={toggleSidebar} className="absolute top-5 right-5 text-white mt-[60px]">
            <FaTimes size={24} />
          </button>
          <nav className="mt-[80px] space-y-6">
            {[
              { icon: FaList, text: 'Menu', link: '/employee' },
              { icon: FaUser, text: 'Profile', link: '/employee/profileemp' },
              { icon: FaPlus, text: 'Make CV', link: '/employee/make-cv' },
              { icon: FaClipboardList, text: 'Applied Jobs', link: '/employee/applied-jobs' },
              { icon: FaBell, text: 'Notifications', link: '/employee/notifications' },
            ].map((item, index) => (
              <React.Fragment key={item.text}>
                <Link to={item.link}>
                  <motion.div
                    className="flex items-center space-x-3 text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={20} />
                    <span>{item.text}</span>
                  </motion.div>
                </Link>
                {index < 4 && <hr className="border-gray-600 pt-4" />}
              </React.Fragment>
            ))}
          </nav>
          <Link to="/">
            <motion.div
              className="absolute bottom-5 left-5 flex items-center space-x-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt size={20} />
              <span>Logout</span>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ProfilePageEmp = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
    return (
      <div className="min-h-screen bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${profileBg})`}}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="relative z-10 min-h-screen px-8 pb-8 pt-[70px]">
          <main className="relative z-10 overflow-y-auto p-8">
            <button onClick={toggleSidebar} className="mb-6 text-2xl text-white">
              <FaBars />
            </button>
            <motion.div
              className="max-w-4xl mx-auto text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-start mb-8">
                <div className="md:w-1/3 mb-8 md:mb-0">
                  <motion.img
                    src="https://placekitten.com/200/200"
                    alt="Profile"
                    className="w-48 h-48 rounded-full object-cover mb-4"
                    whileHover={{ scale: 1.05 }}
                  />
                  <h1 className="text-3xl font-bold mb-2">Saket Jha</h1>
                  <p className="text-xl text-gray-300">Senior Software Engineer</p>
                </div>
                <div className="md:w-2/3 ml-[40px]">
                  <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[50px]">
                    <p><strong>Email:</strong> saket.jha@techcorp.com</p>
                    <p><strong>Date of Birth:</strong> September 9, 2005</p>
                    <p><strong>Gender:</strong> Male</p>
                    <p><strong>Role:</strong> Team Lead</p>
                    <p><strong>Address:</strong> XYZ, 24/A CA</p>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">Qualifications</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>B.Tech in Computer Science, SRM</li>
                    <li>M.Tech in Software Engineering, MIT</li>
                    <li>Certified Scrum Master</li>
                    <li>AWS Certified Solutions Architect</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    );
  };
  
  
export default ProfilePageEmp;
