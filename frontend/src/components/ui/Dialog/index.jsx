import "./index.css";
import { STATUS_PRESETS, STATUS_TYPES } from "@/constants/status";

export default function Dialog({
  open,
  status = STATUS_TYPES.INFORMATION,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Yes",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  const preset = STATUS_PRESETS[status] || STATUS_PRESETS.INFORMATION;
  const isQuestion = status === STATUS_TYPES.QUESTION;
  return (
    <div className="ui-dialog-backdrop" onClick={onClose}>
      <div
        className="ui-dialog-container"
        style={{ borderColor: preset.color }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="ui-dialog-header flex items-center gap-3">
          <span className={`text-${preset.color}-600`}>
            {preset.icon}
          </span>

          <h2 className={`ui-dialog-title text-${preset.color}-600`}>
            {title || preset.title}
          </h2>
        </div>

        {/* BODY */}
        <div className="ui-dialog-body">
          {children}
        </div>

        <div className="ui-dialog-footer flex justify-end gap-3">
          {isQuestion ? (
            <>
              <button
                onClick={onClose}
                className="ui-dialog-cancel-btn"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className={`ui-dialog-confirm-btn bg-${preset.color}-600 text-white px-4 py-2 rounded`}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button onClick={onClose} className="ui-dialog-close-btn">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
