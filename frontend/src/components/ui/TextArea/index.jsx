import "./index.css";

export default function TextArea({
  label,
  error,
  helperText,
  className = "",
  leftIcon,
  rightIcon,
  fullWidth = false,
  resize = true,
  rows = 4,
  ...props
}) {
  return (
    <div className={`ui-textarea ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="ui-textarea-label">
          {label}
        </label>
      )}

      <div
        className={`ui-textarea-wrapper ${error ? "ui-textarea-error" : ""}`}
      >
        {leftIcon && (
          <span className="ui-textarea-icon-left">{leftIcon}</span>
        )}

        <textarea
          {...props}
          rows={rows}
          className={`ui-textarea-input ${!resize ? "resize-none" : ""} ${className}`}
        />

        {rightIcon && (
          <span className="ui-textarea-icon-right">{rightIcon}</span>
        )}
      </div>

      {error ? (
        <p className="ui-textarea-error-text">{error}</p>
      ) : helperText ? (
        <p className="ui-textarea-helper">{helperText}</p>
      ) : null}
    </div>
  );
}
