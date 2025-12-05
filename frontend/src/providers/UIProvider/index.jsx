import { useState, useCallback } from "react";
import { Alert, Dialog, Toast } from "@/components/ui";
import { UIContext } from "./context";
import "./index.css";

export default function UIProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    (status, message, duration = 3000) => {
      const id = Date.now();
      setAlerts((prev) => [...prev, { id, status, message }]);

      if (duration) {
        setTimeout(() => removeAlert(id), duration);
      }
    },
    [removeAlert]
  );

  const [dialog, setDialog] = useState({
    open: false,
    status: null,
    title: "",
    message: "",
    footer: null,
  });

  const showDialog = useCallback(
    (status, message, title = null, footer = null) => {
      setDialog({
        open: true,
        status,
        title,
        message,
        footer,
      });
    },
    []
  );

  const hideDialog = useCallback(() => {
    setDialog((prev) => ({ ...prev, open: false }));
  }, []);

  const [toasts, setToasts] = useState([]);
  const pushToast = useCallback((status, message, duration = 3000) => {
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
    <UIContext.Provider
      value={{ showAlert, showDialog, hideDialog, pushToast }}
    >
      {children}

      <div className="ui-provider-alert-root">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            status={alert.status}
            message={alert.message}
          />
        ))}
      </div>

      {dialog.open && (
        <div className="ui-provider-dialog-backdrop">
          <Dialog
            open={dialog.open}
            status={dialog.status}
            title={dialog.title}
            footer={dialog.footer}
            onClose={hideDialog}
          >
            {dialog.message}
          </Dialog>
        </div>
      )}

      <div className="ui-provider-toast-root">
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
    </UIContext.Provider>
  );
}
