import "./index.css";

export default function Card({
  title,
  header,
  children,
  footer,
  className = "",
  noPadding = false,
}) {
  return (
    <div className={`ui-card ${className}`}>
      {(title || header) && (
        <div className="ui-card-header">
          {header ? (
            header
          ) : (
            <h3 className="ui-card-title">{title}</h3>
          )}
        </div>
      )}

      <div className={`ui-card-body ${noPadding ? "p-0" : ""}`}>
        {children}
      </div>

      {footer && (
        <div className="ui-card-footer">
          {footer}
        </div>
      )}

    </div>
  );
}
