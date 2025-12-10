import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, blogRes, skillsRes] = await Promise.all([
          api.get('/projects'),
          api.get('/blog'),
          api.get('/skills')
        ]);
        setProjects(projectsRes.data.slice(0, 3));
        setBlogPosts(blogRes.data.slice(0, 3));
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Hi, I'm Zarin — Full Stack Student Developer</h1>
          <p className="hero-subtitle">
            Building real-world projects while learning full stack development. I focus on modern JavaScript, React, Node.js, and clean UI/UX.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
          </div>
        </div>
      </section>

      <section className="featured-projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card card">
                {project.image_url && (
                  <img src={project.image_url} alt={project.title} className="project-image" />
                )}
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
            ))}
          </div>
          <div className="section-footer">
            <Link to="/projects" className="btn btn-secondary">View All Projects</Link>
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="container">
          <h2>Skills</h2>
          {skills.length === 0 ? (
            <p className="no-skills">No skills added yet.</p>
          ) : (
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.id || skill.name} className="skill-card card">
                  <h3>{skill.name}</h3>
                  <p>{skill.level}</p>
                  {skill.category && <span className="tech-tag">{skill.category}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="card">
            <h2>About Me</h2>
            <p>
              I'm a student-level full stack developer focused on building real products while learning fast. 
              I enjoy crafting clean UIs, integrating APIs, and managing data with PostgreSQL. 
              This portfolio is powered by a custom CMS so I can add projects, blog posts, and skills from the admin panel without exposing any credentials.
            </p>
          </div>
        </div>
      </section>

      <section className="recent-blog">
        <div className="container">
          <h2>Recent Blog Posts</h2>
          <div className="blog-grid">
            {blogPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card card">
                {post.featured_image && (
                  <img src={post.featured_image} alt={post.title} className="blog-image" />
                )}
                <h3>{post.title}</h3>
                <p>{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                <span className="blog-date">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/blog" className="btn btn-secondary">Read More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;



