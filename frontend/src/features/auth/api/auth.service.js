import {
  loginRequest,
  registerRequest,
  logoutRequest,
} from "./auth.api";
import { transformAuthResponse } from "./auth.response";

function buildSuccess(data, message = "Success") {
  return { success: true, data, message };
}
