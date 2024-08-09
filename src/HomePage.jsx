import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone } from 'lucide-react';
import Header from './Header';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutMeSection from './AboutMeSection';

// Import images
import headshot from './images/Headshot2.png';
import fazahLogo from './images/fazah-logo.png';
import LungVision from './images/lungvision.png';
import python from './images/skills-logos/python-logo.png';
import java from './images/skills-logos/java-logo.png';
import react from './images/skills-logos/react-logo.png';
import flask from './images/skills-logos/flask-logo.png';
import fastapi from './images/skills-logos/fastapi-logo.png';
import azure from './images/skills-logos/azure-logo.png';
import html from './images/skills-logos/HTML-logo.png';
import css from './images/skills-logos/css-logo.png';
import tailwind from './images/skills-logos/tailwind-logo.png';
import next from './images/skills-logos/next-js-logo.png';
import cosmos from './images/skills-logos/Cosmos-DB-logo.png';
import pytorch from './images/skills-logos/pytorch-logo.png';
import a2 from './images/ann-arbor-michigan-downtown.jpg';
import football from './images/football.png';
import hackathon from './images/hackathon.png';
import wisco from './images/wisconsin.png';
import qmark from './images/question.png';
import aiy from './images/aiykit.jpg';
import scale from './images/Scale_AI.svg'
import ls from './images/LS-Logo-Black.svg';
import quanta from './images/Quanta-Logo.png';
import bp from './images/bplogo.png';
import arcatwo from './images/ArcaTwo-Logo.svg';

// Timeline events data
const timelineEvents = [
  { year: 2003, title: "The Journey Begins!", description: "I was born on September 2, 2003, in Ann Arbor, MI.", image: a2 },
  { year: 2020, title: "Gridiron Leader", description: "I was named captain of the high school varsity football team as a sophomore. That is my favorite sport to this day, Go Lions!", image: football },
  { year: 2021, title: "Vision Quest", description: "I built a camera using Google AIY Vision Kit and trained it to recognize sign language in real-time. This project really propelled me to want to do CS in college.", image: aiy },
  { year: 2022, title: "Badger Beginnings", description: "Embarked on my academic adventure at UW-Madison. I am double majoring in computer science and data science.", image: wisco },
  { year: 2023, title: "Hack-cess Story", description: "Stormed the MadData hackathon with team 'Badger Plus'. We came, we coded, we conquered! (Our team was the middle four)", image: hackathon },
  { year: 2024, title: "Double Internship Domination", description: "Software Developer for Lean Snapshot and Software Engineer Intern at Quanta." },
  { year: 2025, title: "Future: Loading...", description: "Gearing up for my next big leap!", image: qmark },
];

// Skills data
const skills = [
  { name: 'Python', logo: python },
  { name: 'Java', logo: java },
  { name: 'React', logo: react },
  { name: 'Flask', logo: flask },
  { name: 'FastAPI', logo: fastapi },
  { name: 'Azure', logo: azure },
  { name: 'HTML', logo: html },
  { name: 'CSS', logo: css },
  { name: 'Tailwind', logo: tailwind },
  { name: 'Next.js', logo: next, isNew: true },
  { name: 'Cosmos DB', logo: cosmos, isNew: true },
  { name: 'PyTorch', logo: pytorch, isNew: true },
];

// Projects data
const projects = [
  { 
    name: 'Fazah', 
    image: fazahLogo,
    description: 'An AI-powered language learning platform revolutionizing how people acquire new languages.',
  },
  { 
    name: 'LungVision', 
    image: LungVision,
    description: 'Advanced AI tool for analyzing lung images, assisting medical professionals in diagnostics.',
  },
  {
    name: 'BadgerPlus',
    image: bp,
    description: 'Innovative project developed during the MadData hackathon, showcasing data-driven solutions.',
  }
];

// Experience data
const experiences = [
  { title: 'Software Engineer Inteern', company: 'Quanta', duration: 'May 2024 - Present', logo: quanta },
  { title: 'Software Developer', company: 'Lean Snapshot', duration: 'July 2024 - September 2024', logo: ls },
  { title: 'Software Engineer for Training AI', company: 'Scale AI/Outlier AI', duration: 'April 2024 - July 2024', logo: scale },
  { title: 'Co-founder/Lead Developer', company: 'ArcaTwo', duration: 'May 2024 - November 2025', logo: arcatwo },
];

// Animation variants for fade-in effect
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2,
      ease: [0.1, 0.25, 0.3, 1],
    } 
  }
};

// Section title component with animated border
const SectionTitle = ({ children }) => (
  <h2 className="text-5xl font-thin mb-12 relative inline-block p-4">
    {children}
    <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 animate-border-top"></span>
    <span className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-purple-400 to-blue-400 animate-border-right"></span>
    <span className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-blue-400 to-purple-400 animate-border-bottom"></span>
    <span className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-purple-400 to-blue-400 animate-border-left"></span>
  </h2>
);

// Project logo component with flip animation
const ProjectLogo = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getStyles = (projectName) => {
    switch(projectName) {
      case 'BadgerPlus':
        return {
          front: { backgroundImage: 'linear-gradient(to top right, #FFB6C1, white)' },
          back: { backgroundImage: 'linear-gradient(to top left, #FFB6C1, white)' },
          text: {}
        };
      case 'LungVision':
        return {
          front: { backgroundColor: '#4682b8' },
          back: { backgroundColor: '#4682b8' },
          text: { color: 'white' }
        };
      case 'Fazah':
        return {
          front: { backgroundColor: '#1c1c1c' },
          back: { backgroundColor: '#1c1c1c' },
          text: { color: 'white' }
        };
      default:
        return { front: {}, back: {}, text: {} };
    }
  };

  const { front: frontStyle, back: backStyle, text: textStyle } = getStyles(project.name);

  return (
    <motion.div 
      className="project-logo-container"
      variants={fadeIn}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flipper ${isFlipped ? 'flipped' : ''}`}>
        <div className="front" style={frontStyle}>
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="back" style={{...backStyle, ...textStyle}}>
          <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
          <p className="text-sm mb-4">{project.description}</p>
          <Link 
            to={`/${project.name.toLowerCase()}`}
            className={`font-medium hover:text-opacity-80 transition-colors relative group ${
              project.name === 'BadgerPlus' ? 'text-black hover:text-black' : 'text-white hover:text-gray-200'
            }`}
          >
            More
            <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-in-out origin-center ${
              project.name === 'BadgerPlus' ? 'bg-blue-500' : 'bg-white'
            }`}></span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};


// Main HomePage component
export default function HomePage() {
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 text-black">
      <Header />
      <ToastContainer />
      <main className="pt-16">
        {/* Hero section */}
        {/* Hero section */}
        <motion.section 
          id="top" 
          className="min-h-screen flex flex-col justify-start items-center pt-24"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img 
            src={headshot} 
            alt="Will Foster" 
            className="w-48 h-48 rounded-full mb-8 object-cover"
            variants={fadeIn}
            style={{ imageRendering: 'high-quality' }}
          />
          <motion.h1 
            className="text-7xl font-thin tracking-normal mb-4 text-center"
            variants={fadeIn}
          >
            Will Foster
          </motion.h1>
          <motion.p 
            className="text-xl text-center font-light mb-12"
            variants={fadeIn}
          >
            Computer Science and Data Science Major at the University of Wisconsin-Madison
          </motion.p>
          <motion.div 
            variants={fadeIn} 
            className="relative mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link 
              to="/qa" 
              className="text-2xl text-black relative group inline-block font-thin transform hover:scale-105 transition-transform duration-300"
            >
              Get to know me by visiting my Q&A!
              <motion.span 
                className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5,
                  ease: "easeInOut"
                }}
              />
            </Link>
          </motion.div>
        </motion.section>

        {/* About Me section */}
        <AboutMeSection timelineEvents={timelineEvents} fadeIn={fadeIn} />

        {/* Skills section */}
        <motion.section 
          id="skills" 
          className="py-16 mt-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto px-4 text-center">
            <SectionTitle>Skills</SectionTitle>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-8"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {skills.map((skill) => (
                <motion.div 
                  key={skill.name} 
                  className="relative group"
                  variants={fadeIn}
                >
                  <div className="w-full h-32 bg-white bg-opacity-50 rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden">
                    <div className={`flex items-center justify-center ${skill.isNew ? 'w-29 h-28' : 'w-20 h-20'}`}>
                      <img 
                        src={skill.logo} 
                        alt={skill.name} 
                        className={`max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110 ${skill.isNew ? 'new-logo' : ''}`}
                        onError={(e) => {
                          console.error(`Error loading image for ${skill.name}`);
                          e.target.src = '/path/to/placeholder-image.png'; // Fallback to placeholder
                        }}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <p className="text-lg font-semibold">{skill.name}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/*Projects section*/}
        <motion.section 
  id="projects" 
  className="py-16 mt-16"
  variants={fadeIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  <div className="container mx-auto px-4 text-center">
    <SectionTitle>Projects</SectionTitle>
    <motion.div 
      className="flex justify-center items-center space-x-8 mt-8"
      variants={fadeIn}
    >
      {projects.map((project) => (
        <ProjectLogo key={project.name} project={project} />
      ))}
    </motion.div>
  </div>
</motion.section>

        {/* Updated Experience section */}
        <motion.section 
          id="experience" 
          className="py-16 mt-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto px-4 text-center">
            <SectionTitle>Experience</SectionTitle>
            <motion.div 
              className="space-y-6 max-w-5xl mx-auto"
              variants={fadeIn}
            >
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white bg-opacity-50 p-6 rounded-lg hover:shadow-md transition-all duration-300 border border-gray-200 hover:scale-105 flex justify-between items-center"
                  variants={fadeIn}
                >
                  <div className="text-left flex-grow pr-4">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  </div>
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                    {exp.logo ? (
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">
                          {exp.company.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact section */}
        <motion.section 
        id="contact" 
        className="py-16 mt-16"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <SectionTitle>Contact Me</SectionTitle>
          <motion.div 
            className="flex flex-col items-center"
            variants={fadeIn}
          >
            <div className="flex items-center mb-4 cursor-pointer" onClick={() => copyToClipboard("foster.will.j@gmail.com", "Email copied!")}>
              <Mail className="mr-2" />
              <span className="hover:underline">foster.will.j@gmail.com</span>
            </div>
            <div className="flex items-center mb-4 cursor-pointer" onClick={() => copyToClipboard("+17348827361", "Phone number copied!")}>
              <Phone className="mr-2" />
              <span className="hover:underline">+1 (734) 882-7361</span>
            </div>
            <div className="flex items-center cursor-pointer">
              <Linkedin className="mr-2" />
              <a 
                href="https://www.linkedin.com/in/will--foster" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/will--foster
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
      </main>

      {/* Footer */}
<footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto px-4 flex flex-col justify-center items-center">
    <p className="text-center">&copy; 2024 Will Foster. All rights reserved.</p>
  </div>
</footer>
</div>
);

}