import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import lightlogo from './images/wf-logo-transparent.png';
import darklogo from './images/wf-logo-dark-removebg.png';
import 'react-toastify/dist/ReactToastify.css';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from './ThemeContext';

const Header = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    if (section === 'resume') {
      const resumeUrl = 'https://fosterportfolioresume.blob.core.windows.net/resume/Will Foster Resume 2024.pdf';
      window.open(resumeUrl, '_blank');
    } else if (section === 'testimony') {
      const referralURL = 'https://fosterportfolioresume.blob.core.windows.net/letterofrecomendation/Will Foster Referral.pdf';
      window.open(referralURL, '_blank');
    } else if (section === 'qa') {
      navigate('/qa');
    } else if (location.pathname !== '/') {
      navigate(`/?section=${section}`);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm shadow-md z-50 transition-colors duration-300`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img 
            src={isDarkTheme ? darklogo : lightlogo} 
            alt="Will Foster Logo" 
            className="h-12 w-auto" // Adjust the size as needed
          />
        </a>
        <div className="space-x-5">
          {['Q&A', 'About', 'Skills', 'Projects', 'Experience', 'Contact', 'Testimony', 'Resume'].map((item) => (
            <button 
              key={item}
              onClick={() => handleNavigation(item.toLowerCase().replace('&', ''))}
              className="text-lg font-thin relative group dark:text-white"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;