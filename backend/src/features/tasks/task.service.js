import Task from "./task.model";

export async function createTaskService(userId, data) {
  return Task.create({
    ...data,
    user: userId,
  });
}

export async function getTasksService(userId) {
  return Task.find({ user: userId }).sort({ createdAt: -1 });
}

export async function getTaskService(userId, taskId) {
  return Task.findOne({ _id: taskId, user: userId });
}
