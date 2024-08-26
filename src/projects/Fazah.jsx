import React, { useEffect, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { motion } from 'framer-motion';
import Header from '../Header';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';


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
  <h2 className="text-3xl font-thin mb-6 relative inline-block">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
  </h2>
);

const Fazah = () => {
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
            className="text-6xl font-thin mb-12 text-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Fazah
          </motion.h1>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Project Overview</SectionTitle>
            <p className="mb-4">
              Fazah is an innovative Python library designed to enhance the multilingual capabilities of Language Learning Models (LLMs). It addresses a critical limitation in LLMs where the quality of responses can vary significantly based on the input language. Fazah ensures high-quality responses regardless of the input language, making it an essential tool for developers integrating LLMs into their products or projects.
            </p>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>The Problem</SectionTitle>
            <p className="mb-4">
              During experimentation with LLMs, I discovered that prompting in languages other than English often resulted in lower quality responses. This is because LLMs typically search for information relevant to the prompt only within the input language. Given that over 52% of websites are in English, non-English prompts can lead to significantly limited information access and, consequently, poorer responses.
            </p>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>The Solution</SectionTitle>
            <p className="mb-4">
              Fazah solves this problem by acting as an intermediary between the user and the LLM. Here's how it works:
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li>It takes the user's prompt in any language.</li>
              <li>Translates the prompt to English.</li>
              <li>Sends the English prompt to the LLM.</li>
              <li>Receives the English response from the LLM.</li>
              <li>Translates the response back to the original input language.</li>
            </ol>
            <p className="mb-4">
              All of this is accomplished in just a few lines of code, making it incredibly easy for developers to integrate into their projects.
            </p>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Key Features</SectionTitle>
            <ul className="list-disc pl-6 mb-4">
              <li>Language-agnostic input handling</li>
              <li>Automatic translation to and from English</li>
              <li>Seamless integration with existing LLM implementations</li>
              <li>Improved response quality for non-English inputs</li>
              <li>Easy-to-use API with comprehensive documentation</li>
              <li>Published on PyPI for easy installation and updates</li>
            </ul>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Technologies Used</SectionTitle>
            <ul className="list-disc pl-6 mb-4">
              <li>Python: Primary programming language</li>
              <li>Natural Language Processing (NLP) libraries</li>
              <li>Translation APIs</li>
              <li>PyPI for package distribution</li>
            </ul>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Impact and Future Development</SectionTitle>
            <p className="mb-4">
              Fazah has the potential to significantly improve the accessibility and effectiveness of LLMs in multilingual contexts. Future developments may include support for more languages, optimization for specific LLMs, and additional features to enhance the quality of translations and responses.
            </p>
          </motion.section>

          <motion.div 
  className="flex justify-center space-x-8"
  variants={fadeIn}
  initial="hidden"
  animate="visible"
>
  <a 
    href="https://pypi.org/project/fazah/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-3xl text-black dark:text-white relative group inline-block font-thin transform hover:scale-105 transition-transform duration-300"
  >
    View on PyPI
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </a>
</motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto px-4 flex flex-col justify-center items-center">
    <p className="text-center">&copy; 2024 Will Foster. All rights reserved.</p>
  </div>
</footer>
    </div>
  );
};

export default Fazah;