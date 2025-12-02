import { Router } from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import validate from "../../middleware/validate.js";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from "./task.controller.js";

import {
  createTaskSchema,
  updateTaskSchema
} from "./validations/task.validation.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", validate(createTaskSchema), createTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
