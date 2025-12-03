import "./index.css";

export default function Spinner({ size = "md", fullScreen = false, className = "" }) {
  const sizeClass = {
    sm: "ui-spinner-sm",
    md: "ui-spinner-md",
    lg: "ui-spinner-lg",
  }[size];

  if (fullScreen) {
    return (
      <div className="ui-spinner-fullscreen">
        <div className={`ui-spinner ${sizeClass} ${className}`} />
      </div>
    );
  }

  return <div className={`ui-spinner ${sizeClass} ${className}`} />;
}
