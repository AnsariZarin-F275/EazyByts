import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiFolder, FiFileText, FiMail } from 'react-icons/fi';
import './AdminHome.css';

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-home">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon projects">
            <FiFolder />
          </div>
          <div className="stat-content">
            <h3>{stats?.projects || 0}</h3>
            <p>Projects</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon blog">
            <FiFileText />
          </div>
          <div className="stat-content">
            <h3>{stats?.blogPosts || 0}</h3>
            <p>Blog Posts</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon messages">
            <FiMail />
          </div>
          <div className="stat-content">
            <h3>{stats?.messages || 0}</h3>
            <p>Total Messages</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon unread">
            <FiMail />
          </div>
          <div className="stat-content">
            <h3>{stats?.unreadMessages || 0}</h3>
            <p>Unread Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

