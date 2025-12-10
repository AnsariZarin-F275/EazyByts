import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiTrash2, FiMail } from 'react-icons/fi';
import './AdminMessages.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contact');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      fetchMessages();
    } catch (error) {
      alert('Error updating message');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contact/${id}`);
        fetchMessages();
      } catch (error) {
        alert('Error deleting message');
      }
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-messages">
      <h1>Contact Messages</h1>
      <div className="messages-list">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet.</p>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`message-item card ${!message.read ? 'unread' : ''}`}>
              <div className="message-header">
                <div>
                  <h3>{message.name}</h3>
                  <p className="message-email">{message.email}</p>
                </div>
                {!message.read && (
                  <button className="btn btn-secondary" onClick={() => markAsRead(message.id)}>
                    <FiMail /> Mark as Read
                  </button>
                )}
              </div>
              {message.subject && (
                <p className="message-subject"><strong>Subject:</strong> {message.subject}</p>
              )}
              <p className="message-text">{message.message}</p>
              <div className="message-footer">
                <span className="message-date">
                  {new Date(message.created_at).toLocaleString()}
                </span>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(message.id)}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;



