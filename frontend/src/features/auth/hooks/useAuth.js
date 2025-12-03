import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";
import useNotification from "@/hooks/useNotification";
import { STORAGE_KEYS } from "@/constants/storage";
import { ROUTES } from "@/constants/routes";
import {
  authFailure,
  authStart,
  authSuccess,
  logout as logoutAction,
} from "../redux/auth.slice";
import * as authService from "../api/auth.service";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotification();
  const auth = useSelector((state) => state.auth);

  const [storedToken, setStoredToken, removeStoredToken] = useLocalStorage(
    STORAGE_KEYS.TOKEN,
    null
  );
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage(
    STORAGE_KEYS.USER,
    null
  );

  useEffect(() => {
    if (!auth.isAuthenticated && storedToken) {
      dispatch(authSuccess({ user: storedUser, token: storedToken }));
    }
  }, [auth.isAuthenticated, dispatch, storedToken, storedUser]);

  const handleAuthSuccess = useCallback(
    (data, message = "Success") => {
      setStoredToken(data.token);
      setStoredUser(data.user);
      dispatch(authSuccess({ user: data.user, token: data.token }));
      notifications.pushToast?.("success", message);
    },
    [dispatch, notifications, setStoredToken, setStoredUser]
  );

  const handleAuthError = useCallback(
    (message) => {
      dispatch(authFailure(message));
      notifications.pushToast?.("error", message);
    },
    [dispatch, notifications]
  );

  const login = useCallback(
    async (form) => {
      dispatch(authStart());
      const response = await authService.login(form);
      if (response.success && response.data?.token) {
        handleAuthSuccess(response.data, response.message);
        navigate(ROUTES.TASKS);
      } else {
        handleAuthError(response.message);
      }
      return response;
    },
    [dispatch, handleAuthError, handleAuthSuccess, navigate]
  );

  const register = useCallback(
    async (form) => {
      dispatch(authStart());
      const response = await authService.register(form);
      if (response.success && response.data?.token) {
        handleAuthSuccess(response.data, response.message);
        navigate(ROUTES.TASKS);
      } else {
        handleAuthError(response.message);
      }
      return response;
    },
    [dispatch, handleAuthError, handleAuthSuccess, navigate]
  );

  const logoutUser = useCallback(async () => {
    await authService.logout();
    removeStoredToken();
    removeStoredUser();
    dispatch(logoutAction());
    notifications.pushToast?.("info", "Logged out successfully");
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate, notifications, removeStoredToken, removeStoredUser]);

  return {
    ...auth,
    login,
    register,
    logoutUser,
    user: auth.user || storedUser,
    token: auth.token || storedToken,
  };
}
