const mongoose = require("mongoose");

mongoose.set("debug", true);

const connectDB = async () => {

    const PASSWORD = "SNpolRiFaAk6JqHN";
    const DB_NAME = "CostManagerREST";
    const MONGO_URI = `mongodb+srv://eranka12:${PASSWORD}@cluster0.wegtd.mongodb.net/
    ${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
