import Task from "./task.model.js";

export async function createTaskService(userId, data) {
  return Task.create({
    ...data,
    user: userId,
    active: true,
  });
}

export async function getTasksService(userId) {
  return Task.find({ user: userId, active: true }).sort({ createdAt: -1 });
}

export async function getTaskService(userId, taskId) {
  return Task.findOne({ _id: taskId, user: userId, active: true });
}

export async function updateTaskService(userId, taskId, data) {
  return Task.findOneAndUpdate(
    { _id: taskId, user: userId, active: true },
    data,
    { new: true }
  );
}

export async function deleteTaskService(userId, taskId) {
  return Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    { active: false },
    { new: true }
  );
}
