const cors = require('cors');
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user'); 

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Adjust this to match your frontend's origin
  methods: ['GET', 'POST'], // Specify the methods you want to allow
  credentials: true, // Include credentials (e.g., cookies) if needed
}));

// Middleware
app.use(express.static(path.join(__dirname,'..',"frontend")));

app.use(bodyParser.json());

// MongoDB Connection
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(dbUri)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Route to register a new user (Signup)
app.post('/signup', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
      }

      // Create a new user
      const user = new User({ email, password });
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to login a user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
