import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPlus, FaClipboardList, FaBell, FaSignOutAlt, FaTimes, FaBars } from 'react-icons/fa';
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


const NewsCard = ({ title, content, imageUrl }) => (
    <motion.div
      className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4 rounded" />
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{content}</p>
    </motion.div>
  );
  

const EmployerLanding = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [news, setNews] = useState([]);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=IT+MBA+business&sortBy=publishedAt&apiKey=f35616008cea420fa4ba17725decdc7f');
        const data = await response.json();
        setNews(data.articles.slice(0, 5));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center relative" style={{backgroundImage: `url(${employer})`}}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative z-10 min-h-screen px-8 pb-8 pt-[70px]">
      
      <main className="relative z-10 overflow-y-auto p-8">
      <button onClick={toggleSidebar} className="mb-6 text-2xl text-white">
  <FaBars />
</button>
        <div className="mb-8 z-20">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 rounded-lg shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
                <NewsCard
                key={index}
                title={article.title}
                content={article.description}
                imageUrl={article.urlToImage}
                />
            ))}
        </div>
      </main>
      </div>
    </div>
  );
};

export default EmployerLanding;