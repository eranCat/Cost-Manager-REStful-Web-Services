const express = require('express');
const Cost = require('../models/cost_model');

const router = express.Router();

// Add Cost
router.post('/add', async (req, res) => {
    try {
        const { description, category, userid, sum, created_at } = req.body;
        const cost = new Cost({
            description,
            category,
            userid,
            sum,
            created_at: created_at || new Date(),
        });
        const savedCost = await cost.save();
        res.status(201).json(savedCost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Monthly Report
router.get('/report', async (req, res) => {
    try {
        const { id, year, month } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const costs = await Cost.aggregate([
            {
                $match: {
                    userid: id,
                    created_at: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$sum' },
                    items: { $push: { description: '$description', sum: '$sum' } },
                },
            },
        ]);

        const response = {};
        costs.forEach((cost) => {
            response[cost._id] = {
                total: cost.total,
                items: cost.items,
            };
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/reports', async (req, res) => {
    try{
        const costs = await Cost.find({});
        res.json(costs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
