import "./index.css";
import { STATUS_PRESETS } from "@/constants/status";

export default function Alert({
  status,
  message,
  title,
  className = "",
}) {
  const preset = STATUS_PRESETS[status] || STATUS_PRESETS.INFORMATION;

  return (
    <div
      className={`
        ui-alert
        ui-alert-${preset.color}
        ${className}
      `}
    >
      <span className="ui-alert-icon">{preset.icon}</span>
      <div className="ui-alert-text">
        <strong className="ui-alert-title">
          {title || preset.title}
        </strong>
        <span className="ui-alert-message">{message}</span>
      </div>
    </div>
  );
}
