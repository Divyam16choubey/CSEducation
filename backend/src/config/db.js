const mongoose = require("mongoose");
const dns = require("dns");

// Set DNS servers to Google / Cloudflare to fix Windows querySrv ECONNREFUSED issues
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Fallback if custom DNS setting fails
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

