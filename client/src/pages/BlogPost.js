import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/blog/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <p>Blog post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <article className="blog-post">
        <div className="container">
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="post-featured-image" />
          )}
          <div className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span>By {post.author || 'Admin'}</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;



