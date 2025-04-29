// index.js — Main entry point of the server

// Load environment variables (e.g., from .env file)
// require("dotenv").config();

// Import core modules
const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const cors = require("cors");
const database = require('./config/database');  // adjust the path if needed

// Connect to MongoDB Atlas
database.connect();

// Create an Express app
const app = express();

// Import app routes
const indexRoutes = require("./routes/indexRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

// Set up middleware
app.use(cors());            // Enable Cross-Origin Resource Sharing
app.use(express.json());    // Parse JSON request bodies
app.use(bodyParser.urlencoded({extended: false}))

// Use imported routes
app.use('/', indexRoutes);
app.use('/api', rentalRoutes);

// Choose port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the HTTP server
http.createServer(app).listen(PORT, () => {
    console.log(`(OK) Server is running at http://localhost:${PORT}`);
});


module.exports = app 