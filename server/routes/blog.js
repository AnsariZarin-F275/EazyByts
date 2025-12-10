const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all published blog posts (public)
router.get('/', async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all blog posts including unpublished (admin)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const result = await db.pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single blog post
router.get('/:slug', async (req, res) => {
  try {
    const result = await db.pool.query('SELECT * FROM blog_posts WHERE slug = $1', [req.params.slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create blog post (admin only)
router.post('/', [
  authenticateToken,
  body('title').notEmpty(),
  body('content').notEmpty(),
  body('slug').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, slug, content, excerpt, featured_image, author, published } = req.body;

    const result = await db.pool.query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, slug, content, excerpt, featured_image, author || 'Admin', published || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: 'Slug already exists' });
    }
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update blog post (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, slug, content, excerpt, featured_image, author, published } = req.body;

    const result = await db.pool.query(
      `UPDATE blog_posts 
       SET title = $1, slug = $2, content = $3, excerpt = $4, 
           featured_image = $5, author = $6, published = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, slug, content, excerpt, featured_image, author, published, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete blog post (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await db.pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;



