import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import Header from '../Header';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../ThemeContext';

// Animation variants for fade-in effect
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.1, 0.25, 0.3, 1],
    } 
  }
};

// Section title component
const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-thin mb-6 relative inline-block dark:text-white">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600"></span>
  </h2>
);

const BadgerPlus = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''} bg-gradient-to-br from-blue-200 via-white to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-black dark:text-white transition-colors duration-300`}>
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h1 
            className="text-6xl font-thin mb-12 text-center dark:text-white"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Badger Plus
          </motion.h1>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Project Overview</SectionTitle>
            <p className="mb-4 dark:text-gray-300">
              Badger Plus is an innovative application developed exclusively for UW-Madison students, providing personalized academic advice and information. This project was a winning entry at the MadData Hackathon in 2024, showcasing our team's ability to create a practical and impactful solution within a 24-hour timeframe.
            </p>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Key Features</SectionTitle>
            <ul className="list-disc pl-6 mb-4 dark:text-gray-300">
              <li>Seamless integration with Canvas API for access to personalized academic information</li>
              <li>Utilization of OpenAI's language model (LLM) to answer questions about student schedules and campus-related inquiries</li>
              <li>User-friendly interface designed with wireframes, prototypes, and high-fidelity mockups</li>
              <li>Optimized performance for handling large datasets</li>
            </ul>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Technologies Used</SectionTitle>
            <ul className="list-disc pl-6 mb-4 dark:text-gray-300">
              <li>Flask: Web application framework</li>
              <li>HTML, CSS, JavaScript: Front-end development</li>
              <li>Python: Back-end logic and data processing</li>
              <li>OpenAI API: For natural language processing and question answering</li>
              <li>Canvas API: For accessing student academic information</li>
            </ul>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Development Process</SectionTitle>
            <p className="mb-4 dark:text-gray-300">
              The development of Badger Plus was an intense and rewarding experience. Our team of four engaged in:
            </p>
            <ul className="list-disc pl-6 mb-4 dark:text-gray-300">
              <li>Innovative problem-solving to address real student needs</li>
              <li>Effective teamwork and collaboration under time constraints</li>
              <li>Efficient project management to deliver a working prototype in 24 hours</li>
              <li>User experience design, including wireframing and prototyping</li>
              <li>Rapid development and integration of multiple technologies</li>
            </ul>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Impact and Future Development</SectionTitle>
            <p className="mb-4 dark:text-gray-300">
              Badger Plus has the potential to significantly improve the academic experience for UW-Madison students by providing personalized, AI-powered assistance. Future developments may include expanded features, integration with more university systems, and potential adoption by other educational institutions.
            </p>
          </motion.section>

          <motion.div 
            className="flex justify-center space-x-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <a 
              href="https://maddata-24.devpost.com/project-gallery" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-3xl text-black dark:text-white relative group inline-block font-thin transform hover:scale-105 transition-transform duration-300"
              >
              View on Devpost
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 flex flex-col justify-center items-center">
          <p className="text-center">&copy; 2024 Will Foster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BadgerPlus;