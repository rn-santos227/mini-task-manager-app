export function capitalize(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str = "", length = 50) {
  if (!str) return "";
  return str.length > length ? str.slice(0, length) + "…" : str;
}

export function isEmail(str = "") {
  return /\S+@\S+\.\S+/.test(str);
}
