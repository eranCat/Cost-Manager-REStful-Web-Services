/**
 * @fileoverview Defines the MongoDB schema and model for cost entries
 * @module models/cost_model
 */

const mongoose = require('mongoose');

/**
 * MongoDB schema for cost entries
 * @typedef {Object} CostSchema
 * @property {string} description - Description of the cost entry
 * @property {('food'|'health'|'housing'|'sport'|'education')} category - Category of the expense
 * @property {string} userid - Reference to the User model
 * @property {number} sum - Amount of the expense
 * @property {Date} created_at - Timestamp of the cost entry
 */
const costSchema = new mongoose.Schema({
    description: {type: String, required: true},
    category: {
        type: String,
        required: true,
        enum: ['food', 'health', 'housing', 'sport', 'education'],
    },
    userid: {type: String, required: true, ref: 'User'},
    sum: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Cost', costSchema);
