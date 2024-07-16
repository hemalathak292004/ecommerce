const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const dbUrl = 'mongodb+srv://ecommerce:ecommerce.29@cluster0.8gtppaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbUrl).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Sign-Up Route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  await newUser.save();
  
  res.status(201).send('User Registered');
});

// Sign-In Route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.status(200).send('Sign-In Successful');
  } else {
    res.status(400).send('Invalid Credentials');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
