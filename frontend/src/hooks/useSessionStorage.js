import { useState } from "react";

export default function useSessionStorage(key, initial = null) {
  const [value, setValue] = useState(() => {
    try {
      const json = sessionStorage.getItem(key);
      return json ? JSON.parse(json) : initial;
    } catch {
      return initial;
    }
  });

  const update = (newValue) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  const remove = () => {
    setValue(null);
    sessionStorage.removeItem(key);
  };

  return [value, update, remove];
}
