import { useState, useCallback } from "react";
import { Toast } from "../../components/ui";
import { NotificationContext } from "./context";

export default function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const pushNotification = useCallback((status, message, duration = 3000) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, status, message }]);

    if (duration) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ pushNotification }}>
      {children}

      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            status={toast.status}
            message={toast.message}
            onClose={removeToast}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
