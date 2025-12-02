import Task from "./task.model";

export async function createTaskService(userId, data) {
  return Task.create({
    ...data,
    user: userId,
  });
}
