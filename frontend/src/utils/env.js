export function env(key, fallback = "") {
  return import.meta.env[key] ?? fallback;
}

export const API_URL = env("VITE_API_URL");
