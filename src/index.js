import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './HomePage';
import Fazah from './projects/Fazah';
import LungVision from './projects/LungVision';
import reportWebVitals from './reportWebVitals';
import QA from './Q&A';
import BadgerPlus from './projects/BadgerPlus'
import { ThemeProvider } from './ThemeContext';  // Import ThemeProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>  {/* Wrap everything with ThemeProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fazah" element={<Fazah />} />
          <Route path="/lungvision" element={<LungVision />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/badgerplus" element={<BadgerPlus />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();