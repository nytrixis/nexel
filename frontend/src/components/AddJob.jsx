import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPlus, FaClipboardList, FaBell, FaSignOutAlt, FaTimes, FaBars } from 'react-icons/fa';
import backgroundImage from '../assets/employer.jpg';
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
              { icon: FaUser, text: 'Profile', link: '/employer/profile' },
              { icon: FaPlus, text: 'Add Job', link: '/employer/add-job' },
              { icon: FaClipboardList, text: 'Review Applications', link: '/employer/review-applications' },
              { icon: FaBell, text: 'Notifications', link: '/employer/notifications' },
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
                {index < 3 && <hr className="border-gray-600 pt-4" />}
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


const AddJob = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend connection code would go here
    console.log('Job data submitted:', jobData);
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="absolute inset-0 bg-black opacity-70 h-[1000px]"></div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative z-10 min-h-screen px-8 pb-8 pt-[70px]">
        <main className="relative z-10 overflow-y-auto p-8">
          <button onClick={toggleSidebar} className="mb-6 text-2xl text-white">
            <FaBars />
          </button>
          <motion.div
            className="max-w-2xl mx-auto bg-white bg-opacity-20 rounded-lg p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Add New Job</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {['title', 'company', 'location', 'description', 'requirements', 'salary'].map((field) => (
                <motion.div key={field} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'salary' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    value={jobData[field]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${field}`}
                    required
                  />
                </motion.div>
              ))}
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Job
              </motion.button>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AddJob;
