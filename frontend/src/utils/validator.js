import { isEmail } from "./string";
import { isAfter } from "./date";

export function validateRequired(value, field = "Field") {
  if (!value) return `${field} is required.`;
  return "";
}

export function validateEmail(value) {
  if (!value) return "Email is required.";
  if (!isEmail(value)) return "Invalid email format.";
  return "";
}

export function validateDateRange(start, end) {
  if (start && end && isAfter(start, end)) {
    return "End date cannot be before start date.";
  }
  return "";
}
