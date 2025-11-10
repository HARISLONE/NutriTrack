const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Get MongoDB connection string from .env file
    // Make sure your .env file has: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/test?...
    let mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

    // Simple fix: If URI doesn't have /test, add it
    // MongoDB Atlas format: mongodb+srv://user:pass@cluster.mongodb.net/test?appName=...
    if (mongoURI.includes(".mongodb.net")) {
      // For MongoDB Atlas
      if (!mongoURI.includes("/test")) {
        // If URI ends with .net? or .net/, add /test before the ?
        if (mongoURI.includes("?")) {
          mongoURI = mongoURI.replace("?", "/test?");
        } else {
          mongoURI = mongoURI.replace(/\.net\/?$/, ".net/test");
        }
        console.log("✅ Added /test to MongoDB URI");
      }
    } else {
      // For local MongoDB
      if (!mongoURI.includes("/test")) {
        mongoURI = mongoURI.replace(/\/$/, "") + "/test";
        console.log("✅ Added /test to local MongoDB URI");
      }
    }

    console.log("🔌 Connecting to MongoDB...");

    // Connect to MongoDB with 'test' database
    await mongoose.connect(mongoURI, {
      dbName: "test", // Use 'test' database
    });

    // Check if connected successfully
    const dbName = mongoose.connection.name;

    console.log("✅ MongoDB Connected Successfully!");
    console.log(`   Database Name: ${dbName} ✅`);
    console.log(`   Host: ${mongoose.connection.host}`);

    // Show collections in the database
    try {
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      console.log(
        `📁 Collections: ${collections.map((c) => c.name).join(", ") || "None"}`
      );
    } catch (err) {
      // This is OK if database is new
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!");
    console.error("Error:", error.message);

    // Helpful error messages
    if (error.message.includes("authentication")) {
      console.error("💡 Check your username and password in .env file");
    }
    if (
      error.message.includes("timeout") ||
      error.message.includes("ECONNREFUSED")
    ) {
      console.error(
        "💡 Check your internet connection and MongoDB Atlas IP whitelist"
      );
    }

    // Exit the application if connection fails
    process.exit(1);
  }
};

// Handle connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("✅ MongoDB Reconnected");
});

module.exports = connectDB;
