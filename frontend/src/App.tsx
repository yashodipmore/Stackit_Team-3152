import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import AskQuestionPage from './pages/AskQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import HealthCheck from './components/HealthCheck';
import './styles/main.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('newest');

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  searchQuery={searchQuery} 
                  filter={filter} 
                />
              } 
            />
            <Route 
              path="/ask" 
              element={
                <PrivateRoute>
                  <AskQuestionPage />
                </PrivateRoute>
              } 
            />
            <Route path="/question/:id" element={<QuestionDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboardPage />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          {/* Development Health Check */}
          {process.env.NODE_ENV === 'development' && <HealthCheck />}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
