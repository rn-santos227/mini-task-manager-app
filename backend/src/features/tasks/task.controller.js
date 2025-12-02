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

export async function getTasks(req, res, next) {
  try {
    const tasks = await getTasksService(req.user._id);
    res.json({
      success: true,
      tasks,
    });
  } catch (err) {
    next(err);
  }
}


export async function getTask(req, res, next) {
  try {
    const task = await getTaskService(req.user._id, req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await updateTaskService(
      req.user._id,
      req.params.id,
      req.body
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found or inactive" });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await deleteTaskService(req.user._id, req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({
      success: true,
      message: "Task deactivated",
    });
  } catch (err) {
    next(err);
  }
}
