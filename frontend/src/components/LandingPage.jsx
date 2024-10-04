import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Bg from '../assets/bg.jpg';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('employee');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement backend logic for login/signup
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center relative" style={{backgroundImage: `url(${Bg})`}}>
    <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg w-96 z-10 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex mb-4">
          <button 
            className={`flex-1 py-2 ${activeTab === 'employee' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('employee')}
          >
            Employee
          </button>
          <button 
            className={`flex-1 py-2 ${activeTab === 'employer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('employer')}
          >
            Employer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
              <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
            </>
          ) : (
            <>
              <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
              <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" required />
              <input type="date" placeholder="Date of Birth" className="w-full p-2 mb-4 border rounded" required />
              <select className="w-full p-2 mb-4 border rounded" required>
                <option value="">Select Role</option>
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
              </select>
              <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
            </>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
