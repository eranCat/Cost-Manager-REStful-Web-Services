require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const costRoutes = require("./routes/costRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to DB
connectDB()//.then(r => print(r));

// Middleware
app.use(express.json());

// Routes
app.use("/api", costRoutes);
app.use("/api", userRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
