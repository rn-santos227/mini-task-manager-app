import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./tasks.api";
import { transformSingleTask, transformTaskList } from "./tasks.response";

function buildSuccess(data, message = "Success") {
  return { success: true, data, message };
}

function buildError(error) {
  const message = error?.message || "Something went wrong";
  return { success: false, message };
}

export async function list() {
  try {
    const response = await getTasks();
    const data = transformTaskList(response);
    return buildSuccess(data, response?.message || "Tasks fetched successfully");
  } catch (error) {
    return buildError(error);
  }
}

export async function get(id) {
  try {
    const response = await getTask(id);
    const data = transformSingleTask(response);
    return buildSuccess(data, response?.message || "Task loaded");
  } catch (error) {
    return buildError(error);
  }
}

export async function create(payload) {
  try {
    const response = await createTask(payload);
    const data = transformSingleTask(response);
    return buildSuccess(data, response?.message || "Task created successfully");
  } catch (error) {
    return buildError(error);
  }
}

export async function update(id, payload) {
  try {
    const response = await updateTask(id, payload);
    const data = transformSingleTask(response);
    return buildSuccess(data, response?.message || "Task updated successfully");
  } catch (error) {
    return buildError(error);
  }
}

export async function remove(id) {
  try {
    const response = await deleteTask(id);
    return buildSuccess(true, response?.message || "Task removed successfully");
  } catch (error) {
    return buildError(error);
  }
}
