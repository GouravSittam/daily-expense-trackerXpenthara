import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * Database connection configuration
 * Handles MongoDB connection with proper error handling
 * Optimized for serverless environments
 */

// Cache the database connection
let cachedConnection = null;

/**
 * Connects to MongoDB database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  // If we have a cached connection and it's connected, use it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("📦 Using cached MongoDB connection");
    return cachedConnection;
  }

  try {
    // Set mongoose options for serverless
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedConnection = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Connection event listeners
    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
      cachedConnection = null;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️  MongoDB disconnected");
      cachedConnection = null;
    });

    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    cachedConnection = null;
    throw error;
  }
};

export default connectDB;
