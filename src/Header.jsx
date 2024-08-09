import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import resume from './images/Resume.png';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    if (section === 'resume') {
      // Replace '/path/to/your/resume.pdf' with the actual path to your resume PDF
      const resumeUrl = resume;
      window.open(resumeUrl, '_blank');
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
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-60 backdrop-blur-sm shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-thin">Will Foster</a>
        <div className="space-x-6">
          {['Q&A', 'About', 'Skills', 'Projects', 'Experience', 'Contact', 'Resume'].map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavigation(item.toLowerCase().replace('&', ''))}
              className="text-lg font-thin relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;