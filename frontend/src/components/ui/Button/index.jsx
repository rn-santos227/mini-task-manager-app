import "./index.css";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      {...props}
      className={`
        ui-btn
        ui-btn-${variant}
        ui-btn-${size}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {leftIcon && <span className="ui-btn-icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ui-btn-icon-right">{rightIcon}</span>}
    </button>
  );
}
