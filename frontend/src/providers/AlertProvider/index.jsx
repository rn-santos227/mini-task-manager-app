import { useState, useCallback } from "react";
import { Alert } from "../../components/ui";
import { AlertContext } from "./context";

export default function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((status, message, duration = 3000) => {
    setAlert({ status, message });

    if (duration) {
      setTimeout(() => setAlert(null), duration);
    }
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <div className="fixed top-4 right-4 z-50">
        {alert && <Alert status={alert.status} message={alert.message} />}
      </div>
    </AlertContext.Provider>
  );
}
