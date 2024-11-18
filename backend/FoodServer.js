// foodMenuServer.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002; // Different port for food menu server

// MongoDB connection for foodMenuDB
const foodMenuDBConnection = mongoose.createConnection('mongodb://localhost:27017/foodMenuDB');

// Log when connected to foodMenuDB
foodMenuDBConnection.once('open', () => {
    console.log('Connected to foodMenuDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Define Schedule schema and model for weekly food schedules (on foodMenuDB)
const scheduleSchema = new mongoose.Schema({
    week: Number,
    days: [
        {
            day: String,
            breakfast: String,
            lunch: String,
            snacks: String,
            dinner: String,
        },
    ],
});
const Schedule = foodMenuDBConnection.model('Schedule', scheduleSchema);

// Endpoint to get all weekly schedules from foodMenuDB
app.get('/api/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Food menu server running on http://localhost:${PORT}`);
});
