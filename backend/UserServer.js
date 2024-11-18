const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection for usersDB
mongoose.connect('mongodb://localhost:27017/usersDB')
    .then(() => console.log('Connected to usersDB'))
    .catch(err => console.error('Failed to connect to usersDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// User schema: storing username and password as plain text
const userSchema = new mongoose.Schema({
    username: String,
    password: String // Storing password as plain text
});
const User = mongoose.model('User', userSchema);

// Register user route (backend)
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Received registration request:', { username, password });

        // Create a new user with plain text password
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login user route (backend)
app.post('/api/users', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Login request received:', { username, password });

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        // Compare plain text password directly
        if (user.password !== password) {
            console.log('Password mismatch for user:', username);
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        // Create JWT token if passwords match
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
