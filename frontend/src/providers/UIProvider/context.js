import { createContext } from "react";

export const UIContext = createContext({
  showAlert: () => {},
  showDialog: () => {},
  hideDialog: () => {},
  pushToast: () => {},
});
