const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Optional: for storing sessions in MongoDB
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
// const groupRoutes = require('./routes/groupRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Set secure to true in production
    httpOnly: true, // Optional: helps prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000 // Optional: session expiration time
  },
  store: MongoStore.create({ mongoUrl: mongoURI }) // Store sessions in MongoDB
}));

// Middleware
app.use(cors({ 
  origin: 'http://localhost:5173', // Ensure this matches the origin of your frontend
  credentials: true 
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));