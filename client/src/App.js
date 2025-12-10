import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { FiSun, FiMoon } from 'react-icons/fi';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load theme from settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(settings => {
        if (settings.theme_mode) {
          setTheme(settings.theme_mode);
          document.documentElement.setAttribute('data-theme', settings.theme_mode);
        }
      })
      .catch(err => console.error('Error loading theme:', err));
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/admin/login" 
          element={!user ? <AdminLogin /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/*" 
          element={user ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </div>
  );
}

export default App;



