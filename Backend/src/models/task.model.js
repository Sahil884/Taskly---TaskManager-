import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
      default: "medium",
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: false },
    dueDate: { type: Date, required: true },
    category: {
      type: String,
      enum: [
        "development",
        "design",
        "marketing",
        "documentation",
        "testing",
        "other",
      ],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
