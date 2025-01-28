const mongoose = require("mongoose");

const connectDB = async () => {
    const MONGO_URI = "mongodb+srv://username:password@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority";
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
