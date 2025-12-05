import { STORAGE_KEYS } from "../constants/storage";

const BASE_URL = (() => {
  const raw = import.meta.env.VITE_API_URL || "";
  const withProtocol = raw.replace(/^(https?):\/(?!\/)/, "$1://");
  return withProtocol.replace(/\/+$/, "");
})();

function getToken() {
  try {
  const stored = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
}

export async function apiService(endpoint, options = {}) {
  const token = getToken();

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body || null,
  };

  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}
