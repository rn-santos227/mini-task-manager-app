import { useState, useCallback } from "react";
import { Dialog } from "../../components/ui";
import { DialogContext } from "./context";

export default function DialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    open: false,
    status: null,
    title: "",
    message: "",
    footer: null,
  });

  const showDialog = useCallback((status, message, title = null, footer = null) => {
    setDialog({
      open: true,
      status,
      message,
      title,
      footer,
    });
  }, []);

  const hideDialog = useCallback(() => {
    setDialog((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}

      <Dialog
        open={dialog.open}
        status={dialog.status}
        title={dialog.title}
        footer={dialog.footer}
        onClose={hideDialog}
      >
        {dialog.message}
      </Dialog>
    </DialogContext.Provider>
  );
}
