import {
  createTaskService,
  getTasksService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
} from "./task.service.js";

export async function createTask(req, res, next) {
  try {
    const task = await createTaskService(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    next(err);
  }
}
