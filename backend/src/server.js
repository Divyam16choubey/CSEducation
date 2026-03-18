const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Health check
app.get("/", (req, res) => {
  res.send("CSEducation Backend API Running");
});

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
