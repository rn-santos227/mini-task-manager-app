import { apiService } from "@/services/apiService";
import { API_ENDPOINTS } from "@/constants/endpoints";

export function loginRequest(payload) {
  return apiService(API_ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    body: payload,
  });
}

export function registerRequest(payload) {
  return apiService(API_ENDPOINTS.AUTH.REGISTER, {
    method: "POST",
    body: payload,
  });
}

export function logoutRequest() {
  return Promise.resolve({ message: "Logged out" });
}
