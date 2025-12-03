import { createContext, useContext } from "react";

export const AlertContext = createContext(null);

export function useAlert() {
  return useContext(AlertContext);
}
