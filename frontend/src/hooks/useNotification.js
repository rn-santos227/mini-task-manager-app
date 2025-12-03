import { useContext } from "react";
import { UIContext } from "@/providers/UIProvider/context";

export default function useNotification() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useNotification must be used within a UIProvider");
  }
  return context;
}
