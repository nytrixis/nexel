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

const NotificationCard = ({ notification }) => (
  <motion.div
    className="bg-white bg-opacity-10 rounded-lg p-6 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-start">
      <FaBell className="text-yellow-400 mr-4 mt-1 text-xl" />
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">{notification.title}</h3>
        <p className="text-gray-300">{notification.message}</p>
        <p className="text-sm text-gray-400 mt-2">{notification.time}</p>
      </div>
    </div>
  </motion.div>
);

const NotificationsEmp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const notifications = [
    {
      id: 1,
      title: "New Application Received",
      message: "You have received a new job application for the position of Senior Developer.",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Interview Scheduled",
      message: "An interview has been scheduled with John Doe for tomorrow at 2 PM.",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Job Posting Expiring Soon",
      message: "Your job posting for Marketing Manager will expire in 3 days. Consider renewing it.",
      time: "2 days ago"
    },
    {
      id: 4,
      title: "New Message from Applicant",
      message: "You have a new message from Sarah Smith regarding her application.",
      time: "3 days ago"
    }
  ];

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
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Notifications</h2>
            {notifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsEmp;
