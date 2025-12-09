import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

// Define a flag to ensure DB connection only runs once (critical for serverless)
let isDbConnected = false;

// The Vercel function handler
// This explicit format tells Vercel exactly what to execute for every incoming request.
export default async (req, res) => {
  // 1. Ensure DB Connection is established only once across cold starts
  if (!isDbConnected) {
    try {
      await connectDB();
      isDbConnected = true;
      console.log("MongoDB connected successfully for serverless instance.");
    } catch (err) {
      console.error("MONGODB connection failed!!! ", err);
      // Optionally send a 500 error if DB connection fails here
      // return res.status(500).send('Database connection failed');
    }
  }

  // 2. Delegate the request handling to your Express app instance
  // The Express app instance (app) is itself a function handler
  return app(req, res);
};
