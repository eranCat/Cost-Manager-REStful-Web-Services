/**
 * @fileoverview Database connection configuration
 * @module utils/db
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.set('debug', true);

/**
 * Establishes connection to MongoDB
 * @async
 * @function connectDB
 * @throws {Error} If connection fails
 * @returns {Promise<void>}
 */
const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
