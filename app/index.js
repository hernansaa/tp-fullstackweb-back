// index.js — Main entry point of the server

// Load environment variables (e.g., from .env file)
// require("dotenv").config(); 

// Import core modules
const express = require("express");
const http = require("http");
const cors = require("cors");

// Import app routes
const routes = require("./routes/routes");

// Create an Express app
const app = express();

// Set up middleware
app.use(cors());            // Enable Cross-Origin Resource Sharing
app.use(express.json());    // Parse JSON request bodies

// Use imported routes
app.use("/", routes);       // Mount all routes at the root path

// Choose port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the HTTP server
http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
