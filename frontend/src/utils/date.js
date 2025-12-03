export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return "";
  return date.toLocaleDateString();
}

export function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return "";
  return date.toLocaleString();
}

export function isAfter(start, end) {
  return new Date(start) > new Date(end);
}

export function today() {
  return new Date().toISOString().split("T")[0];
}
