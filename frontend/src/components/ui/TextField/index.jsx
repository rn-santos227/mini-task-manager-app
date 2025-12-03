import "./index.css";
import { TEXT_TYPES } from "../../constants/texts";

export default function TextField({
  label,
  type = TEXT_TYPES.TEXT,
  className = "",
  leftIcon,
  rightIcon,
  error,
  helperText,
  fullWidth = false,
  ...props
}) {
  return (
    <div className={`ui-textfield ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="ui-textfield-label">
          {label}
        </label>
      )}

      <div
        className={`ui-textfield-wrapper ${error ? "ui-textfield-error" : ""}`}
      >
        {leftIcon && (
          <span className="ui-textfield-icon-left">{leftIcon}</span>
        )}

        <input
          {...props}
          type={type}
          className={`ui-textfield-input ${className}`}
        />

        {rightIcon && (
          <span className="ui-textfield-icon-right">{rightIcon}</span>
        )}
      </div>

      {error ? (
        <p className="ui-textfield-error-text">{error}</p>
      ) : helperText ? (
        <p className="ui-textfield-helper">{helperText}</p>
      ) : null}
    </div>
  );
}
