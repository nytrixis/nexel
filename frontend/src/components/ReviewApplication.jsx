import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPlus, FaClipboardList, FaBell, FaSignOutAlt, FaTimes, FaBars, FaFileAlt } from 'react-icons/fa';
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

const ApplicationCard = ({ application }) => (
  <motion.div
    className="bg-white bg-opacity-10 rounded-lg p-6 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-2xl font-bold mb-2 text-white">{application.name}</h3>
    <div className="grid grid-cols-2 gap-4 text-gray-300">
      <p><strong>Experience:</strong> {application.experience}</p>
      <p><strong>Gender:</strong> {application.gender}</p>
      <p><strong>Age:</strong> {application.age}</p>
      <p><strong>Contact:</strong> {application.contact}</p>
    </div>
    <motion.a
      href={application.resume}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaFileAlt className="mr-2" />
      View Resume
    </motion.a>
  </motion.div>
);

const ReviewApplications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    // Simulated backend fetch
    // const fetchApplications = async () => {
    //   try {
    //     const response = await fetch('/api/applications');
    //     const data = await response.json();
    //     setApplications(data);
    //   } catch (error) {
    //     console.error('Error fetching applications:', error);
    //   }
    // };
    // fetchApplications();

    // Hardcoded data for demonstration
    setApplications([
      {
        id: 1,
        name: "Ewie",
        experience: "5 years",
        gender: "Female",
        age: 28,
        contact: "ewie@email.com",
        resume: "#"
      },
      {
        id: 2,
        name: "Brewie",
        experience: "2 years",
        gender: "Female",
        age: 23,
        contact: "brewie@email.com",
        resume: "#"
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="absolute inset-0 bg-black opacity-80 h-[1000px]"></div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative z-10 min-h-screen px-8 pb-8 pt-[70px]">
        <main className="relative z-10 overflow-y-auto p-8">
          <button onClick={toggleSidebar} className="mb-6 text-2xl text-white">
            <FaBars />
          </button>
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Review Applications</h2>
            {applications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ReviewApplications;
