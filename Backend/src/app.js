import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  "https://taskly-task-manager-icrv.vercel.app", // Your client URL
  "https://taskly-task-manager.vercel.app", // If the client could also be here
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Include all methods your API uses
  credentials: true, // If you need to send cookies/auth headers
  optionsSuccessStatus: 204,
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// ✅ Handle preflight requests explicitly
app.options("*", cors(corsOptions));

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

export default app;
