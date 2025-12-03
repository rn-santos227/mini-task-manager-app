import { apiService } from "@/services/apiService";
import TASKS from  "@/constants/endpoints";

export function getTasks() {
  return apiService(TASKS.BASE);
}

export function getTask(id) {
  return apiService(`${TASKS.BASE}/${id}`);
}

export function createTask(payload) {
  return apiService(TASKS.BASE, {
    method: "POST",
    body: payload,
  });
}

export function updateTask(id, payload) {
  return apiService(`${TASKS.BASE}/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteTask(id) {
  return apiService(`${TASKS.BASE}/${id}`, {
    method: "DELETE",
  });
}
