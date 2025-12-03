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
