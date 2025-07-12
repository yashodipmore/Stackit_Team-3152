import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import QASection from './pages/QASection';
import SkillExchange from './pages/SkillExchange';
import LearningPath from './pages/LearningPath';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/qa" element={<QASection />} />
            <Route path="/skills" element={<SkillExchange />} />
            <Route path="/learning" element={<LearningPath />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;