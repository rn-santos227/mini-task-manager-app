import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

import UIProvider from "./providers/UIProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </React.StrictMode>
);
