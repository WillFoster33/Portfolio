import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import arcatwo from './images/ArcaTwo-Logo.svg';
import quanta from './images/Quanta-Logo.png';

const SectionTitle = ({ children }) => (
  <h2 className="text-5xl font-thin mb-12 relative inline-block p-4 dark:text-white">
    {children}
    <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 animate-border-top"></span>
    <span className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-600 animate-border-right"></span>
    <span className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 animate-border-bottom"></span>
    <span className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-600 animate-border-left"></span>
  </h2>
);

const AboutMeSection = ({ timelineEvents, fadeIn }) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const handleTimelineClick = (index) => {
    setCurrentEventIndex(index);
  };

  const handleNavigation = (direction) => {
    const newIndex = currentEventIndex + direction;
    if (newIndex >= 0 && newIndex < timelineEvents.length) {
      setCurrentEventIndex(newIndex);
    }
  };

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.section 
      id="about" 
      className="py-4 mt-4 flex flex-col items-center"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-center mb-12">
        <SectionTitle>About Me</SectionTitle>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8 w-full max-w-5xl">
        <motion.div 
          className="w-full md:w-2/5"
          variants={fadeIn}
        >
          <div className="timeline relative">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.year} 
                className={`timeline-event cursor-pointer ${index === currentEventIndex ? 'active' : ''}`}
                onClick={() => handleTimelineClick(index)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="timeline-content dark:bg-gray-800 dark:text-white">
                  <div className="timeline-year dark:text-blue-400">{event.year}</div>
                  <div className="timeline-title dark:text-gray-300">{event.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="w-full md:w-3/5 flex flex-col items-center justify-center"
          variants={fadeIn}
        >
          <div className="relative w-full mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentEventIndex}`}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.5 }
                }}
                className="w-full h-96 relative overflow-hidden rounded-lg"
              >
                {timelineEvents[currentEventIndex].image && (
                  <img 
                    src={timelineEvents[currentEventIndex].image} 
                    alt={timelineEvents[currentEventIndex].title}
                    className="w-full h-full object-cover"
                  />
                )}
                {currentEventIndex === 5 && ( // Assuming the double internship is at index 5
                  <div className="absolute inset-0 flex justify-center items-center">
                    <img 
                      src={arcatwo} 
                      alt="ArcaTwo Logo" 
                      className="w-1/2 h-1/2 object-contain mr-4"
                    />
                    <img 
                      src={quanta} 
                      alt="Quanta Logo" 
                      className="w-1/2 h-1/2 object-contain ml-4"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative w-full">
            <button 
              onClick={() => handleNavigation(-1)} 
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 dark:text-gray-400 transition-all duration-300 z-10 ${currentEventIndex === 0 ? 'opacity-30 pointer-events-none' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
              disabled={currentEventIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="snippet-container bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 p-8 rounded-lg shadow-lg min-h-[200px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentEventIndex}`}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    opacity: { duration: 0.5 }
                  }}
                  className="text-center absolute w-full left-0 right-0 px-8"
                >
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">{timelineEvents[currentEventIndex].title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">{timelineEvents[currentEventIndex].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <button 
              onClick={() => handleNavigation(1)} 
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 dark:text-gray-400 transition-all duration-300 z-10 ${currentEventIndex === timelineEvents.length - 1 ? 'opacity-30 pointer-events-none' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
              disabled={currentEventIndex === timelineEvents.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutMeSection;