import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/blog');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="page-title">Blog</h1>
        {posts.length === 0 ? (
          <p className="no-posts">No blog posts available yet. Check back soon!</p>
        ) : (
          <div className="blog-grid">
            {posts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card card">
                {post.featured_image && (
                  <img src={post.featured_image} alt={post.title} className="blog-image" />
                )}
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt || post.content.substring(0, 200) + '...'}</p>
                  <div className="blog-meta">
                    <span className="blog-author">By {post.author || 'Admin'}</span>
                    <span className="blog-date">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;



