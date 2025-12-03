import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useNotification from "@/hooks/useNotification";
import { STATUS_TYPES } from "@/constants/status";
import * as taskService from "../api/tasks.service";
import {
  taskCreated,
  taskRemoved,
  taskSelected,
  taskUpdated,
  tasksFailure,
  tasksStart,
  tasksSuccess,
} from "../redux/tasks.slice";

export default function useTasks() {
  const dispatch = useDispatch();
  const notifications = useNotification();
  const { items, loading, selected } = useSelector((state) => state.tasks || {});

  const tasks = useMemo(() => items || [], [items]);

  const listTasks = useCallback(async () => {
    dispatch(tasksStart());
    const response = await taskService.list();

    if (response.success) {
      dispatch(tasksSuccess(response.data));
    } else {
      dispatch(tasksFailure(response.message));
      notifications.showAlert?.(STATUS_TYPES.ERROR, response.message);
    }

    return response;
  }, [dispatch, notifications]);

  const selectTask = useCallback(
    (id) => {
      const found = tasks.find((task) => task.id === id) || null;
      dispatch(taskSelected(found));
      return found;
    },
    [dispatch, tasks]
  );

  const createTask = useCallback(
    async (form) => {
      dispatch(tasksStart());
      const response = await taskService.create(form);

      if (response.success && response.data) {
        dispatch(taskCreated(response.data));
        notifications.showAlert?.(STATUS_TYPES.SUCCESS, response.message);
        await listTasks();
      } else {
        dispatch(tasksFailure(response.message));
        notifications.showAlert?.(STATUS_TYPES.ERROR, response.message);
      }

      return response;
    },
    [dispatch, listTasks, notifications]
  );

  const updateTask = useCallback(
    async (id, form) => {
      dispatch(tasksStart());
      const response = await taskService.update(id, form);

      if (response.success && response.data) {
        dispatch(taskUpdated(response.data));
        notifications.showAlert?.(STATUS_TYPES.SUCCESS, response.message);
        await listTasks();
      } else {
        dispatch(tasksFailure(response.message));
        notifications.showAlert?.(STATUS_TYPES.ERROR, response.message);
      }

      return response;
    },
    [dispatch, listTasks, notifications]
  );

  const removeTask = useCallback(
    async (id) => {
      dispatch(tasksStart());
      const response = await taskService.remove(id);

      if (response.success) {
        dispatch(taskRemoved(id));
        notifications.showAlert?.(STATUS_TYPES.SUCCESS, response.message);
        await listTasks();
      } else {
        dispatch(tasksFailure(response.message));
        notifications.showAlert?.(STATUS_TYPES.ERROR, response.message);
      }

      return response;
    },
    [dispatch, listTasks, notifications]
  );

  return {
    tasks,
    loading,
    selectedTask: selected,
    listTasks,
    selectTask,
    createTask,
    updateTask,
    removeTask,
  };
}
