const mongoose = require('mongoose');

mongoose.set('debug', true);

const connectDB = async () => {

    const PASSWORD = 'e6kovBuO6X9xbwLN';
    const MONGO_URI = `mongodb+srv://eranka12:${PASSWORD}@mazemeshane.unux6.mongodb.net/?retryWrites=true&w=majority&appName=MaZeMeshane`;

    try {
        const res = await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
