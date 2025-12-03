import "./index.css";
import { Button, Card, DateInput, Modal, TextArea, TextField } from "@/components/ui";
import useTaskForm, { taskFormDefaults } from "../../hooks/useTaskForm";

export default function TaskCreateModal({ open, onClose, onSubmit }) {
  const { form, errors, submitting, isValid, handleChange, submit, reset } =
    useTaskForm(taskFormDefaults);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await submit(onSubmit);

    if (response?.success) {
      onClose?.();
      reset();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Card className="task-modal-card">
        <div className="task-modal-header">
          <div>
            <h3 className="task-modal-title">Create Task</h3>
            <p className="task-modal-subtitle">
              Add a new task to your list and track its progress.
            </p>
          </div>
          <button className="task-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="task-modal-form" onSubmit={handleSubmit}>
          <div className="task-modal-grid">
            <TextField
              label="Title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={errors.title}
              required
              fullWidth
            />

            <div className="task-modal-row">
              <DateInput
                label="Start Date"
                value={form.startDate}
                onChange={(value) => handleChange("startDate", value)}
                error={errors.startDate}
                required
              />
              <DateInput
                label="End Date"
                value={form.endDate}
                onChange={(value) => handleChange("endDate", value)}
                error={errors.endDate}
                required
              />
            </div>
          </div>

          <TextArea
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            rows={3}
            fullWidth
          />

          <label className="task-modal-toggle">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={(e) => handleChange("completed", e.target.checked)}
            />
            <span>Mark as completed</span>
          </label>

          {errors.form && <p className="task-modal-error">{errors.form}</p>}

          <div className="task-modal-actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || submitting}>
              {submitting ? "Saving..." : "Create Task"}
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}
