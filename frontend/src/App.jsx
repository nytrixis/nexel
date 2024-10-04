import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/LandingPage';
import Footer from './components/Footer';
import './styles/custom.css';
import EmployerLanding from './components/EmployerLanding';
import LoginNavbar from './components/LoginNavbar';
import ProfilePage from './components/ProfilePage';
import AddJob from './components/AddJob';
import ReviewApplications from './components/ReviewApplication';
import Notifications from './components/Notifications';
import EmployeeLanding from './components/EmployeeLanding';
import MakeCV from './components/MakeCV';
import ProfilePageEmp from './components/ProfilePageEmp';
import AppliedJobs from './components/AppliedJobs';
import NotificationsEmp from './components/NotificationsEmp';
import About from './components/About';
import Contact from './components/Contact';

const NavbarWrapper = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/employe')) {
    return <LoginNavbar />;
  }
  return <Navbar />;
};

const App = () => {
  return (
    <Router>
      <div className="bg-[#f3f4f6] min-h-screen text-[#333333] font-sans flex flex-col">
        <NavbarWrapper />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employer" element={<EmployerLanding />} />
            <Route path="/employer/profile" element={<ProfilePage />} />
            <Route path="/employer/add-job" element={<AddJob />} />
            <Route path="/employer/review-applications" element={<ReviewApplications />} />
            <Route path="/employer/notifications" element={<Notifications />} />
            <Route path="/employee" element={<EmployeeLanding />} />
            <Route path="/employee/make-cv" element={<MakeCV />} />
            <Route path="/employee/profileemp" element={<ProfilePageEmp />} />
            <Route path="/employee/applied-jobs" element={<AppliedJobs />} />
            <Route path="/employee/notifications" element={<NotificationsEmp />} />
            <Route path="/about us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Add other routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;