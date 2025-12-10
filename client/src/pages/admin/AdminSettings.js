import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    site_title: '',
    site_description: '',
    theme_color: '#6366f1',
    theme_mode: 'light'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await api.put('/settings', settings);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      
      // Apply theme immediately
      if (settings.theme_mode) {
        document.documentElement.setAttribute('data-theme', settings.theme_mode);
      }
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-settings">
      <h1>Site Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form card">
        <div className="form-group">
          <label>Site Title</label>
          <input
            type="text"
            name="site_title"
            value={settings.site_title || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Site Description</label>
          <textarea
            name="site_description"
            value={settings.site_description || ''}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Theme Color</label>
          <input
            type="color"
            name="theme_color"
            value={settings.theme_color || '#6366f1'}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Theme Mode</label>
          <select
            name="theme_mode"
            value={settings.theme_mode || 'light'}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;



