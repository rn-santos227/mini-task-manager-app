import { apiService } from "@/services/apiService";
import { API_ENDPOINTS } from "@/constants/endpoints";

export function getTasks() {
  return apiService(API_ENDPOINTS.API_ENDPOINTS.TASKS.BASE);
}

export function getTask(id) {
  return apiService(`${API_ENDPOINTS.TASKS.BASE}/${id}`);
}

export function createTask(payload) {
  return apiService(API_ENDPOINTS.TASKS.BASE, {
    method: "POST",
    body: payload,
  });
}

export function updateTask(id, payload) {
  return apiService(`${API_ENDPOINTS.TASKS.BASE}/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteTask(id) {
  return apiService(`${API_ENDPOINTS.TASKS.BASE}/${id}`, {
    method: "DELETE",
  });
}
