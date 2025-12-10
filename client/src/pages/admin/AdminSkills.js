import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import './AdminSkills.css';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 'Intermediate',
    category: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.put(`/skills/${editingSkill.id}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      fetchSkills();
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.error || 'Error saving skill');
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level || 'Intermediate',
      category: skill.category || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
      } catch (error) {
        alert('Error deleting skill');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'Intermediate',
      category: ''
    });
    setEditingSkill(null);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-skills">
      <div className="admin-header">
        <h1>Manage Skills</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          <FiPlus /> Add Skill
        </button>
      </div>

      <div className="skills-list">
        {skills.length === 0 ? (
          <p className="no-skills">No skills yet. Add one to get started.</p>
        ) : (
          skills.map(skill => (
            <div key={skill.id} className="skill-item card">
              <div className="skill-info">
                <h3>{skill.name}</h3>
                <p>{skill.level}</p>
                {skill.category && <span className="skill-category">{skill.category}</span>}
              </div>
              <div className="skill-actions">
                <button className="btn-icon" onClick={() => handleEdit(skill)}>
                  <FiEdit />
                </button>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(skill.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <h2>{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Frontend / Backend / Database / Tools"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSkill ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;

