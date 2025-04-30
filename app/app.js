// Import core modules
const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const cors = require("cors");
const database = require('./config/database');

// Connect to MongoDB Atlas
database.connect();

// Create an Express app
const app = express();

// Import app routes
const indexRoutes = require("./routes/indexRoutes");
const productRoutes = require("./routes/productRoutes");
const timeSlotRoutes = require("./routes/timeSlotRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Set up middleware
app.use(cors());            // Enable Cross-Origin Resource Sharing
app.use(express.json());    // Parse JSON request bodies

// Use imported routes
app.use('/', indexRoutes);
app.use('/api/products', productRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/bookings', bookingRoutes);

// Choose port from environment or default to 5000 (Falta crear .env)
const PORT = process.env.PORT || 5000;

// Start the HTTP server
http.createServer(app).listen(PORT, () => {
    console.log(`(OK) Server is running at http://localhost:${PORT}`);
});


module.exports = app