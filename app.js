const express = require('express');
const connectDB = require('./utils/db');
const costRoutes = require('./routes/cost_routes');
const userRoutes = require('./routes/user_routes');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', costRoutes);
app.use('/api', userRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
