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
