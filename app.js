const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/group");
const resourceRoutes = require("./routes/resource");

dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/resources", resourceRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
