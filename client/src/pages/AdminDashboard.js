import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import AdminHome from './admin/AdminHome';
import AdminProjects from './admin/AdminProjects';
import AdminBlog from './admin/AdminBlog';
import AdminMessages from './admin/AdminMessages';
import AdminSettings from './admin/AdminSettings';
import AdminSkills from './admin/AdminSkills';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>CMS Dashboard</h2>
        <nav className="admin-nav">
          <NavLink to="/admin" end className="nav-item">
            Overview
          </NavLink>
          <NavLink to="/admin/projects" className="nav-item">
            Projects
          </NavLink>
          <NavLink to="/admin/skills" className="nav-item">
            Skills
          </NavLink>
          <NavLink to="/admin/blog" className="nav-item">
            Blog Posts
          </NavLink>
          <NavLink to="/admin/messages" className="nav-item">
            Messages
          </NavLink>
          <NavLink to="/admin/settings" className="nav-item">
            Settings
          </NavLink>
        </nav>
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/projects" element={<AdminProjects />} />
          <Route path="/skills" element={<AdminSkills />} />
          <Route path="/blog" element={<AdminBlog />} />
          <Route path="/messages" element={<AdminMessages />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;



