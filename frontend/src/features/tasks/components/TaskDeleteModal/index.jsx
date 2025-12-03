import { useState } from "react";
import "./index.css";
import { Dialog } from "@/components/ui";
import { STATUS_TYPES } from "@/constants/status";

export default function TaskDeleteModal({ open, task, onClose, onConfirm }) {
  const [processing, setProcessing] = useState(false);

  const handleConfirm = async () => {
    if (!task?.id) return;
    setProcessing(true);
    const response = await onConfirm?.(task.id);
    setProcessing(false);

    if (response?.success) {
      onClose?.();
    }
  };

  return (
    <Dialog
      open={open}
      status={STATUS_TYPES.QUESTION}
      title="Delete Task"
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText={processing ? "Deleting..." : "Delete"}
      cancelText="Cancel"
    >
      <div className="task-delete-body">
        <p>
          Are you sure you want to delete
          <span className="task-delete-name"> {task?.title || "this task"}</span>
          ? This action will mark the task as inactive.
        </p>
      </div>
    </Dialog>
  );
}
