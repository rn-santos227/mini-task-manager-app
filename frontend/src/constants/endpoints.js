export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  TASKS: {
    BASE: "/tasks",
    BY_ID: (id) => `/tasks/${id}`,
  },
};
