import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import "./index.css";
import { Button, Card, DataTable } from "@/components/ui";
import { formatDateTime } from "@/utils/date";
import TaskCreateModal from "../../components/TaskCreateModal";
import TaskUpdateModal from "../../components/TaskUpdateModal";
import TaskDeleteModal from "../../components/TaskDeleteModal";
import useTasks from "../../hooks/useTasks";
import useOverdueTaskAlerts from "../../hooks/useOverdueTaskAlerts";

export default function TaskPage() {
  const {
    tasks,
    loading,
    selectedTask,
    listTasks,
    selectTask,
    createTask,
    updateTask,
    removeTask,
  } = useTasks();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(true);

  const intervalRef = useRef(null);

  useEffect(() => {
    listTasks();
  }, [listTasks]);

  useOverdueTaskAlerts(tasks, updateTask);

  useEffect(() => {    
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleEdit = useCallback(
    (task) => {
      selectTask(task.id);
      setOpenUpdate(true);
    },
    [selectTask]
  );

  const handleDelete = useCallback(
    (task) => {
      selectTask(task.id);
      setOpenDelete(true);
    },
    [selectTask]
  );

  const columns = useMemo(
    () => [
      { key: "title", label: "Title" },
      {
        key: "description",
        label: "Description",
        render: (value) => <span className="task-desc">{value}</span>,
      },
      {
        key: "startDate",
        label: "Start Date",
        render: (value) => formatDateTime(value),
      },
      {
        key: "endDate",
        label: "End Date",
        render: (value) => formatDateTime(value),
      },
      {
        key: "completed",
        label: "Status",
        render: (_, row) => {
          const status = row.status || (row.completed ? "completed" : "pending");
          const statusLabel =
            status === "completed" ? "Completed" : status === "overdue" ? "Overdue" : "Pending";
          const statusClass =
            status === "completed"
              ? "task-status-completed"
              : status === "overdue"
                ? "task-status-overdue"
                : "task-status-pending";

          return <span className={`task-status ${statusClass}`}>{statusLabel}</span>;
        },
      },
      {
        key: "actions",
        label: "Actions",
        render: (_, row) => (
          <div className="task-actions">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(row)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  const closeAllModals = () => {
    setOpenCreate(false);
    setOpenUpdate(false);
    setOpenDelete(false);
    selectTask(null);
  };

  return (
    <div className="task-page">
      <div className="task-page-header">
        <div>
          <h2 className="task-page-title">Tasks</h2>
          <p className="task-page-subtitle">
            wait {timeLeft} seconds for the task to be completed.
          </p>
        </div>
        <Button onClick={() => setOpenCreate(true)}>Create Task</Button>
      </div>

      <Card className="task-table-card">
        <DataTable
          columns={columns}
          data={tasks}
          loading={loading}
          emptyMessage="No tasks found. Start by creating a new task."
        />
      </Card>

      {openCreate && (
        <TaskCreateModal
          open={openCreate}
          onClose={closeAllModals}
          onSubmit={createTask}
        />
      )}

      {openUpdate && (
        <TaskUpdateModal
          key={selectedTask?.id || "update-modal"}
          open={openUpdate}
          task={selectedTask}
          onClose={closeAllModals}
          onSubmit={updateTask}
        />
      )}

      {openDelete && (
        <TaskDeleteModal
          open={openDelete}
          task={selectedTask}
          onClose={closeAllModals}
          onConfirm={removeTask}
        />
      )}
    </div>
  );
}
