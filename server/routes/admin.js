const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get dashboard stats (admin only)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const [projects, blogPosts, messages, unreadMessages] = await Promise.all([
      db.pool.query('SELECT COUNT(*) FROM projects'),
      db.pool.query('SELECT COUNT(*) FROM blog_posts'),
      db.pool.query('SELECT COUNT(*) FROM contact_messages'),
      db.pool.query('SELECT COUNT(*) FROM contact_messages WHERE read = false')
    ]);

    res.json({
      projects: parseInt(projects.rows[0].count),
      blogPosts: parseInt(blogPosts.rows[0].count),
      messages: parseInt(messages.rows[0].count),
      unreadMessages: parseInt(unreadMessages.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;



