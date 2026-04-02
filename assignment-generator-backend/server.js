
require("dotenv").config();

const express = require("express");

const assignmentRoutes = require("./routes/assignmentRoutes");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Assignment Generator Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});