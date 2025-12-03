export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
  },
  TASKS: {
    BASE: "/api/tasks",
    BY_ID: (id) => `/api/tasks/${id}`,
  },
};
