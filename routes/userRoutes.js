const express = require("express");
const User = require("../models/userModel");
const Cost = require("../models/costModel");

const router = express.Router();

// Get User Details
router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Getting user ${id}`)
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ error: `User ${id} not found` });
        }

        const totalCosts = await Cost.aggregate([
            { $match: { userid: id } },
            { $group: { _id: null, total: { $sum: "$sum" } } },
        ]);

        const total = totalCosts[0]?.total || 0;

        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total:total,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/users/", async (req, res) => {
    try {
        console.log(`Getting all users`)
        const users = await User.find({});
        console.log("All Users:", users);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// About Team
router.get("/about", (req, res) => {
    res.json([
        { first_name: "Eran", last_name: "Karaso" },
    //     TODO add yourself
    ]);
});

module.exports = router;
