import {
  loginRequest,
  registerRequest,
  logoutRequest,
} from "./auth.api";
import { transformAuthResponse } from "./auth.response";

function buildSuccess(data, message = "Success") {
  return { success: true, data, message };
}

function buildError(error) {
  const message = error?.message || "Something went wrong";
  return { success: false, message };
}

export async function login(payload) {
  try {
    const response = await loginRequest(payload);
    const data = transformAuthResponse(response);
    return buildSuccess(data, response?.message || "Logged in successfully");
  } catch (error) {
    return buildError(error);
  }
}

export async function register(payload) {
  try {
    const response = await registerRequest(payload);
    const data = transformAuthResponse(response);
    return buildSuccess(data, response?.message || "Registered successfully");
  } catch (error) {
    return buildError(error);
  }
}

export async function logout() {
  try {
    const response = await logoutRequest();
    return buildSuccess(transformAuthResponse(response), response?.message);
  } catch (error) {
    return buildError(error);
  }
}
