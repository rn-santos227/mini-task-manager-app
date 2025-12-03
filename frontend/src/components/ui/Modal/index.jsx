import "./index.css";

export default function Modal({
  open,
  children,
  onClose,
  size = "md",
  closeOnBackdrop = true,
  closeOnEscape = true,
}) {
  if (!open) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && closeOnEscape) {
      onClose && onClose();
    }
  };

  return (
    <div
      className="ui-modal-backdrop"
      onClick={() => closeOnBackdrop && onClose && onClose()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={`ui-modal-container ui-modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
