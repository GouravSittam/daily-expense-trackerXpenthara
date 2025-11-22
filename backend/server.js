import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
/**
 * Health check endpoint
 * @route GET /api/health
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

/**
 * API information endpoint
 * @route GET /api
 */
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expense Tracker API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      expenses: "/api/expenses",
      health: "/api/health",
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 5000;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  /**
   * Start the server
   */
  const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Expense Tracker API Server                          ║
║                                                           ║
║   📡 Server running on port: ${PORT}                        ║
║   🌍 Environment: ${
      process.env.NODE_ENV || "development"
    }                      ║
║   📂 Database: ${
      process.env.MONGODB_URI ? "Connected" : "Not configured"
    }                                ║
║                                                           ║
║   Endpoints:                                             ║
║   - POST   /api/auth/register                            ║
║   - POST   /api/auth/login                               ║
║   - POST   /api/auth/logout                              ║
║   - GET    /api/auth/profile                             ║
║   - GET    /api/health                                   ║
║   - GET    /api/expenses                                 ║
║   - POST   /api/expenses                                 ║
║   - GET    /api/expenses/:id                             ║
║   - PUT    /api/expenses/:id                             ║
║   - DELETE /api/expenses/:id                             ║
║   - GET    /api/expenses/summary/statistics              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
  });

  /**
   * Handle unhandled promise rejections
   */
  process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Promise Rejection:", err);
    server.close(() => {
      process.exit(1);
    });
  });

  /**
   * Handle uncaught exceptions
   */
  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
  });
}

export default app;
