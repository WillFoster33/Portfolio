import React, {useEffect} from 'react';
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

const LungVision = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 text-black">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h1 
            className="text-6xl font-thin mb-12 text-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            LungVision
          </motion.h1>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Project Overview</SectionTitle>
            <p className="mb-4">
              LungVision is an advanced AI tool designed for analyzing lung images to assist in medical diagnostics. The project involves creating a working image recognition model using a neural network with convolutional layers. The model is built to take in X-ray images of lungs and diagnose the image as healthy or identify various conditions such as COVID-19, bacterial pneumonia, viral pneumonia, and bronchitis.
            </p>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Development Process and Challenges</SectionTitle>
            <p className="mb-4">
              The development of LungVision came with its share of challenges. Initially, the model struggled with accuracy due to overfitting issues. To address this, I reduced the number of epochs and implemented image augmentation techniques on the dataset. This approach allowed the model to become more accurate when processing user-uploaded photos, ultimately achieving an impressive 97%+ accuracy rate.
            </p>
            <p className="mb-4">
              One notable challenge was the imbalance in the dataset, with some categories having more photos than others. This resulted in slight variations in accuracy across different classifications. In future iterations, I would address this by ensuring a more balanced dataset for all categories.
            </p>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Technologies Used</SectionTitle>
            <ul className="list-disc pl-6 mb-4">
              <li>PyTorch: Used as the primary framework for creating the train and test files.</li>
              <li>Google Cloud Platform (GCP): Utilized for storing and managing the database of thousands of images.</li>
              <li>Convolutional Neural Networks (CNN): Implemented for image recognition and classification.</li>
              <li>Data Augmentation: Applied to improve model accuracy and prevent overfitting.</li>
            </ul>
          </motion.section>

          <motion.section 
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Key Learnings</SectionTitle>
            <ul className="list-disc pl-6 mb-4">
              <li>Implementing convolutional neural networks for image recognition tasks</li>
              <li>Managing and preprocessing large datasets using cloud platforms (GCP)</li>
              <li>Techniques for preventing overfitting in machine learning models</li>
              <li>The importance of data augmentation in improving model accuracy</li>
              <li>Handling imbalanced datasets and its impact on model performance</li>
              <li>Perseverance and problem-solving skills in overcoming technical challenges</li>
            </ul>
          </motion.section>

          <motion.div 
          className="flex justify-center space-x-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <a 
            href="https://github.com/WillFoster33/Lung-Recognition-Model" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-lg text-black relative group inline-block font-thin transform hover:scale-105 transition-transform duration-300"
          >
            View on GitHub
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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

export default LungVision;