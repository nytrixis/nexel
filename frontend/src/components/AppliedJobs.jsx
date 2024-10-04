import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPlus, FaClipboardList, FaBell, FaSignOutAlt, FaTimes, FaBars, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaList, FaClock } from 'react-icons/fa';
import employer from '../assets/employer.jpg';
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


const AppliedJobs = () => {
  // State to store applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Commented out code for fetching data from backend
  /*
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('/api/applied-jobs');
        const data = await response.json();
        setAppliedJobs(data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);
  */

  // Hardcoded values for demonstration
  useEffect(() => {
    setAppliedJobs([
      {
        id: 1,
        company: 'TechCorp',
        role: 'Frontend Developer',
        location: 'New York, NY',
        experience: '3-5 years',
        salary: '$80,000 - $120,000',
        status: 'submitted'
      },
      {
        id: 2,
        company: 'DataSoft',
        role: 'Data Analyst',
        location: 'San Francisco, CA',
        experience: '2-4 years',
        salary: '$70,000 - $100,000',
        status: 'approved'
      },
      {
        id: 3,
        company: 'CloudNet',
        role: 'DevOps Engineer',
        location: 'Austin, TX',
        experience: '4-6 years',
        salary: '$90,000 - $130,000',
        status: 'rejected'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center relative" style={{backgroundImage: `url(${employer})`}}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="relative z-10 min-h-screen px-8 pb-8 pt-[70px]">
          <main className="relative z-10 overflow-y-auto p-8">
            <button onClick={toggleSidebar} className="mb-6 text-2xl text-white">
              <FaBars />
            </button>
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Applied Jobs</h1>
      <div className="space-y-6">
        {appliedJobs.map((job) => (
          <motion.div
            key={job.id}
            className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-white">{job.role}</h2>
              <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(job.status)}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center"><FaBuilding className="mr-2" /> {job.company}</p>
              <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {job.location}</p>
              <p className="flex items-center"><FaClock className="mr-2" /> {job.experience}</p>
              <p className="flex items-center"><FaDollarSign className="mr-2" /> {job.salary}</p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300">
                View Details
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300">
                Withdraw Application
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      </main>
    </div>
    </div>
  );
};

export default AppliedJobs;
