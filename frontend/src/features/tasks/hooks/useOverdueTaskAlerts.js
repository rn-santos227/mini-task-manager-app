import { useEffect, useRef } from "react";
import { formatDateTime } from "@/utils/date";
import { STATUS_TYPES } from "@/constants/status";
import useNotification from "@/hooks/useNotification";

export default function useOverdueTaskAlerts(tasks, updateTask) {
  const notifications = useNotification();
  const overdueNotifiedIdsRef = useRef([]);
  const updatingIdsRef = useRef(new Set());

  useEffect(() => {
    const checkOverdueTasks = async () => {
      const now = new Date();
      const overdueTasks = (tasks || []).filter(
        (task) =>
          task &&
          !task.completed &&
          task.status !== "completed" &&
          task.endDate &&
          new Date(task.endDate).getTime() < now.getTime()
      );

      const previousSet = new Set(overdueNotifiedIdsRef.current);
      const newAlerts = overdueTasks.filter((task) => !previousSet.has(task.id));

      newAlerts.forEach((task) => {
        notifications.showAlert?.(
          STATUS_TYPES.ERROR,
          `Task "${task.title}" is overdue (due ${formatDateTime(task.endDate)}).`
        );
      });

      overdueNotifiedIdsRef.current = overdueTasks.map((task) => task.id);

      const needsStatusUpdate = overdueTasks.filter(
        (task) => task.status !== "overdue" && !updatingIdsRef.current.has(task.id)
      );

      if (updateTask && needsStatusUpdate.length) {
        await Promise.all(
          needsStatusUpdate.map(async (task) => {
            updatingIdsRef.current.add(task.id);
            await updateTask(task.id, { status: "overdue" });
            updatingIdsRef.current.delete(task.id);
          })
        );
      }
    };

    checkOverdueTasks();
    const interval = setInterval(checkOverdueTasks, 60 * 1000);

    return () => clearInterval(interval);
  }, [notifications, tasks, updateTask]);
}
