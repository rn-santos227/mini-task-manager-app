export function validateTitle(title = "") {
  if (!title.trim()) return "Title is required";
  if (title.trim().length < 3) return "Title must be at least 3 characters";
  return "";
}

export function validateDescription(description = "") {
  if (description && description.length > 500) {
    return "Description must be less than 500 characters";
  }
  return "";
}

export function validateDateRange(start, end) {
  if (!start) return "Start date is required";
  if (!end) return "End date is required";
  if (new Date(start) > new Date(end)) return "End date must be after start date";
  return "";
}

export function validateTaskForm(form = {}) {
  const errors = {};

  const titleError = validateTitle(form.title || "");
  if (titleError) errors.title = titleError;

  const descriptionError = validateDescription(form.description || "");
  if (descriptionError) errors.description = descriptionError;

  const dateError = validateDateRange(form.startDate, form.endDate);
  if (dateError) {
    errors.startDate = dateError.includes("Start") ? dateError : "";
    errors.endDate = dateError.includes("End") || dateError.includes("after") ? dateError : "";
  }

  return errors;
}
