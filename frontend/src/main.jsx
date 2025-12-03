import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

import DialogProvider from "./providers/DialogProvider";
import AlertProvider from "./providers/AlertProvider";
import NotificationProvider from "./providers/NotificationProvider";
import ModalProvider from "./providers/ModalProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DialogProvider>
      <AlertProvider>
        <NotificationProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </NotificationProvider>
      </AlertProvider>
    </DialogProvider>
  </React.StrictMode>
);
