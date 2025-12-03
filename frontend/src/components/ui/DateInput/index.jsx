import "./index.css";

export default function DateInput({
  label,
  value,
  onChange,
  min,
  max,
  required = false,
  error = "",
  className = "",
  ...props
}) {
  return (
    <div className={`ui-date-input ${className}`}>
      {label && (
        <label className="ui-date-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type="date"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        min={min}
        max={max}
        required={required}
        className={`ui-date-field ${error ? "ui-date-error" : ""}`}
        {...props}
      />

      {error && <p className="ui-date-error-text">{error}</p>}
    </div>
  );
}
