import { useCallback, useEffect, useMemo, useState } from "react";
import "./index.css";
import { Button, Card, DataTable } from "@/components/ui";
import TaskCreateModal from "../../components/TaskCreateModal";
import TaskUpdateModal from "../../components/TaskUpdateModal";
import TaskDeleteModal from "../../components/TaskDeleteModal";
import useTasks from "../../hooks/useTasks";

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

  useEffect(() => {
    listTasks();
  }, [listTasks]);

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
      { key: "startDate", label: "Start Date" },
      { key: "endDate", label: "End Date" },
      {
        key: "completed",
        label: "Status",
        render: (value) => (
          <span
            className={`task-status ${value ? "task-status-completed" : "task-status-pending"}`}
          >
            {value ? "Completed" : "Pending"}
          </span>
        ),
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
            Manage your tasks with quick create, edit, and delete actions.
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
