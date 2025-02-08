/**
 * @fileoverview Defines the MongoDB schema and model for users
 * @module models/user_model
 */

const mongoose = require('mongoose');

/**
 * MongoDB schema for users
 * @typedef {Object} UserSchema
 * @property {string} id - Unique identifier for the user
 * @property {string} first_name - User's first name
 * @property {string} last_name - User's last name
 * @property {Date} birthday - User's date of birth
 * @property {string} marital_status - User's marital status
 * @property {number} total - Computed total expenses for the user
 */
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true },
    marital_status: { type: String, required: true },
    total: { type: Number, default: 0 },// Computed pattern for total expenses
});

module.exports = mongoose.model('User', userSchema);
