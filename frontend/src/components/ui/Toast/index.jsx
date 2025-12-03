import "./index.css";
import { STATUS_PRESETS } from "@/constants/status";

export default function Toast({ id, status, message, onClose }) {
  const preset = STATUS_PRESETS[status] || STATUS_PRESETS.INFORMATION;

  return (
    <div className={`ui-toast ui-toast-${preset.color}`}>
      <span className="ui-toast-icon">{preset.icon}</span>
      <p className="ui-toast-message">{message}</p>
      <button className="ui-toast-close" onClick={() => onClose(id)}>
        ✕
      </button>
    </div>
  );
}
