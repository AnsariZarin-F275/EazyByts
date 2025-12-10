const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public: get skills
router.get('/', async (req, res) => {
  try {
    const result = await db.pool.query('SELECT * FROM skills ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: create skill
router.post(
  '/',
  authenticateToken,
  [body('name').notEmpty().withMessage('Name is required')],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, level, category } = req.body;
      const result = await db.pool.query(
        `INSERT INTO skills (name, level, category)
         VALUES ($1, $2, $3) RETURNING *`,
        [name, level || 'Intermediate', category || null]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating skill:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Admin: update skill
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, level, category } = req.body;
    const result = await db.pool.query(
      `UPDATE skills
       SET name = $1, level = $2, category = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 RETURNING *`,
      [name, level, category, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: delete skill
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await db.pool.query('DELETE FROM skills WHERE id = $1 RETURNING *', [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

