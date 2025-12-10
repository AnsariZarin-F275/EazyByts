import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="skills-page">
      <div className="container">
        <h1 className="page-title">Skills</h1>
        {skills.length === 0 ? (
          <p className="no-skills">No skills added yet. Check back soon!</p>
        ) : (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.id || skill.name} className="skill-card card">
                <h3>{skill.name}</h3>
                <p>{skill.level}</p>
                {skill.category && <span className="skill-category">{skill.category}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;

