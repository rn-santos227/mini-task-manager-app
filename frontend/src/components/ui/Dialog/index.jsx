import "./index.css";
import { STATUS_PRESETS } from "@/constants/status";

export default function Dialog({
  open,
  status,
  title,
  children,
  footer,
  onClose,
}) {
  if (!open) return null;

  const preset = STATUS_PRESETS[status] || STATUS_PRESETS.INFORMATION;

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

        {/* FOOTER */}
        <div className="ui-dialog-footer">
          {footer ? (
            footer
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
