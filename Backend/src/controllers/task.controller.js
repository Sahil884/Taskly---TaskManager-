import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create a new task
export const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    priority,
    dueDate,
    category,
    status,
    assignedTo,
  } = req.body;

  // validating
  if (!title || !description || !dueDate) {
    throw new ApiError(400, "Missing reaquired fields");
  }

  const taskData = {
    title,
    description,
    priority,
    dueDate,
    status,
    owner: req.user.id,
  };

  // only add assignedTo if it's truthy and not empty string
  if (assignedTo && assignedTo.trim() !== "") {
    taskData.assignedTo = assignedTo;
  }

  if (category && category.trim() !== "") {
    taskData.category = category;
  }

  const task = await Task.create(taskData);

  if (!task) {
    throw new ApiError(400, "Task cant be created");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, task, "Task created Successfully"));
});

// Get all task for logged in user

export const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id })
    .sort({
      createdAt: -1,
    })
    .populate("assignedTo", "fullName");

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "tasks fetched successfully"));
});

//  get single task by id (must belong to that user)

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    owner: req.user.id,
  }).populate("assignedTo", "fullName username _id");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, task, "task by user fetched successfult "));
});

// Get tasks assigned to the logged-in user
export const getAssignedTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id })
    .sort({ createdAt: -1 })
    .populate("owner", "fullName email"); // 👈 show who assigned it

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Assigned tasks fetched successfully"));
});

// Update a task
export const updateTask = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.completed !== undefined) {
    data.completed = data.completed === "Yes" || data.completed === true;
  }

  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    data,
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new ApiError(404, "Task not found or not yours");
  }

  res
    .status(201)
    .json(new ApiResponse(200, updated, "Task updated successfully"));
});

// Delete task

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // Only allow the owner (creator) to delete
  if (task.owner.toString() !== req.user.id) {
    throw new ApiError(403, "You are not allowed to delete this task");
  }

  await task.deleteOne();

  res.status(200).json(new ApiResponse(200, "Task deleted"));
});
