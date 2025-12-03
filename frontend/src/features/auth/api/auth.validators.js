import { validateRequired, validateEmail as validateEmailField } from "@/utils/validator";

export function validateName(name) {
  const required = validateRequired(name, "Name");
  if (required) return required;
  if (name.length < 2) return "Name must be at least 2 characters.";
  return "";
}

export function validateEmail(email) {
  return validateEmailField(email);
}

export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return "";
}

export function validateAuthForm(form) {
  const errors = {};
  if (Object.prototype.hasOwnProperty.call(form, "name")) {
    errors.name = validateName(form.name);
  }
  if (Object.prototype.hasOwnProperty.call(form, "email")) {
    errors.email = validateEmail(form.email);
  }
  if (Object.prototype.hasOwnProperty.call(form, "password")) {
    errors.password = validatePassword(form.password);
  }
  return errors;
}
