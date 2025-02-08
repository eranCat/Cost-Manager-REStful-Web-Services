/**
 * @fileoverview Express router handling cost-related endpoints
 * @module routes/cost_routes
 */

const express = require('express');
const Cost = require('../models/cost_model');
const User = require('../models/user_model');

const router = express.Router();


/**
 * Add a new cost entry
 * @route POST /api/add
 * @param {Object} req.body - Cost entry details
 * @param {string} req.body.description - Description of the cost
 * @param {string} req.body.category - Category of the cost
 * @param {string} req.body.userid - User ID associated with the cost
 * @param {number} req.body.sum - Amount of the cost
 * @param {Date} [req.body.created_at] - Creation date of the cost entry
 * @returns {Object} Created cost entry
 */
router.post('/add', async (req, res) => {
    try {
        const {description, category, userid, sum, created_at} = req.body;
        const cost = new Cost({
            description,
            category,
            userid,
            sum,
            created_at: created_at || new Date(),
        });
        const savedCost = await cost.save();
        await updateTotalExpenses(userid);
        res.status(201).json(savedCost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Updates the total expenses for a specific user
 * @async
 * @param {string} userId - The ID of the user to update
 * @returns {Promise<void>}
 */
async function updateTotalExpenses(userId) {
    const total = await Cost.aggregate([
        {$match: {userid: userId}},
        {$group: {_id: null, total: {$sum: "$sum"}}}
    ]);
    await User.updateOne({id: userId},
        {$set: {total: total[0]?.total || 0,}}
    );
}

/**
 * Get monthly cost report for a user
 * @route GET /api/report
 * @param {Object} req.query
 * @param {string} req.query.id - User ID
 * @param {number} req.query.year - Year for the report
 * @param {number} req.query.month - Month for the report (1-12)
 * @returns {Object} Monthly cost report grouped by categories
 */
router.get('/report', async (req, res) => {
    try {
        const {id, year, month} = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const costs = await Cost.aggregate([
            {
                $match: {
                    userid: id,
                    created_at: {$gte: startDate, $lt: endDate},
                },
            },
            {
                $group: {
                    _id: '$category',
                    total: {$sum: '$sum'},
                    items: {
                        $push: {
                            description: '$description',
                            sum: '$sum',
                            created_at: '$created_at'
                        }
                    },
                },
            },
        ]);

        const response = {
            userid: id, year: year, month: month,
            costs: {},
        };
        costs.forEach((cost) => {
            cost.items.forEach(
                (costItem) => {
                    costItem["day"] = new Date(costItem["created_at"]).getDay();
                    delete costItem["created_at"];
                }
            )

            response["costs"][cost._id] = {
                total: cost.total,
                items: cost.items,
            };
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
