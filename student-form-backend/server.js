const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5001;

// Only start server if not testing
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app; // 👈 needed for tests
