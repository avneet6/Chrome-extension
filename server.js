// Import necessary modules
const express = require('express'); // Express framework for building web applications
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const cors = require('cors'); // CORS middleware for handling Cross-Origin requests
const path = require('path'); // Path module for working with file and directory paths
const app = express(); // Initialize Express application
const PORT = 5001; // Define the port on which the server will run

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productivity_manager', {
  useNewUrlParser: true, // Use new URL parser to avoid deprecation warnings
  useUnifiedTopology: true // Use new unified topology engine for MongoDB
});

// Import task routes
const taskRoutes = require('./routes/tasks'); // Import task routes
app.use('/api/tasks', taskRoutes); // Use task routes with the '/api/tasks' endpoint

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log message when server is up and running
});
