import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAssignedTasks,
  getTask,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/task").get(verifyJwt, getTask).post(verifyJwt, createTask);
router.route("/assignedTask").get(verifyJwt, getAssignedTasks);

router
  .route("/:id/task")
  .get(verifyJwt, getTaskById)
  .post(verifyJwt, updateTask)
  .delete(verifyJwt, deleteTask);

export default router;
