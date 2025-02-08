/**
 * @fileoverview Express router handling user-related endpoints
 * @module routes/user_routes
 */
const express = require('express');
const User = require('../models/user_model');
const router = express.Router();

/**
 * Get user details by ID
 * @route GET /api/users/:id
 * @param {string} req.params.id - User ID
 * @returns {Object} User details
 */
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Getting user ${id}`)
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ error: `User ${id} not found` });
        }

        res.status(200).json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total:user.total,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get all users
 * @route GET /api/users
 * @returns {Array} List of all users
 */
router.get('/users/', async (req, res) => {
    try {
        console.log(`Getting all users`)
        const users = await User.find({});
        console.log('All Users:', users);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get team information
 * @route GET /api/about
 * @returns {Array} List of team members
 */
router.get('/about', (req, res) => {
    res.json([
        { first_name: 'Eran', last_name: 'Karaso' },
        { first_name: 'Maor', last_name: 'Michaeli' },
        { first_name: 'Netanel', last_name: 'Musaev' },
    ]);
});

module.exports = router;
