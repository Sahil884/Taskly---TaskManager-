import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js"; // Import your error class

const app = express();

// const allowedOrigins = process.env.CORS_ORIGIN
//   ? process.env.CORS_ORIGIN.split(",")
//   : [
//       "https://taskly-task-manager-icrv.vercel.app",
//       "https://taskly-task-manager.vercel.app",
//     ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps or curl)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Include all methods your API uses
//   credentials: true, // If you need to send cookies/auth headers
//   optionsSuccessStatus: 204,
//   allowedOrigins: allowedOrigins,
// };

// Apply CORS to all routes
app.use(
  cors({
    origin: "https://taskly-task-manager-icrv.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    credentials: true,
  })
);

// ✅ Handle preflight requests explicitly
// app.options("*", cors(corsOptions));

app.options(
  "*",
  cors({
    origin: "https://taskly-task-manager-icrv.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// --- In your app.js, AFTER all routes are declared ---

app.use((err, req, res, next) => {
  // Check if the error is a custom ApiError
  const isApiError = err instanceof ApiError;

  // Use the status code from ApiError, default to 500
  const statusCode = isApiError ? err.statusCode : err.status || 500;

  // Use the message from ApiError, default to a generic message
  const message = isApiError ? err.message : "Internal Server Error";

  // Ensure all response methods (like status/json) are used
  return res.status(statusCode).json({
    success: false,
    message: message,
    errors: isApiError ? err.errors : [],
    // Optionally, include stack trace for debugging (remove in production)
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
