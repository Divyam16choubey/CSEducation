const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

dotenv.config();

async function main() {
  const [, , username, password] = process.argv;

  if (!username || !password) {
    console.error("Usage: node src/scripts/createAdmin.js <username> <password>");
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in environment (.env)");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log(`Admin "${username}" already exists (id: ${existing._id}).`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });

    console.log(`Created admin "${admin.username}" (id: ${admin._id}).`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to create admin:", err?.message || err);
    process.exit(1);
  } finally {
    try {
      await mongoose.disconnect();
    } catch {
      // ignore
    }
  }
}

main();

