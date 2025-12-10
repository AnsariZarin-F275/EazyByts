import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="projects-page">
      <div className="container">
        <h1 className="page-title">My Projects</h1>
        {projects.length === 0 ? (
          <p className="no-projects">No projects available yet. Check back soon!</p>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card card">
                {project.image_url && (
                  <img src={project.image_url} alt={project.title} className="project-image" />
                )}
                <div className="project-content">
                  {project.featured && <span className="featured-badge">Featured</span>}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="technologies">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                  <div className="project-links">
                    {project.project_url && (
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        View Project
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;



