import { useState } from "react";

export default function useLocalStorage(key, initial = null) {
  const [value, setValue] = useState(() => {
    try {
      const json = localStorage.getItem(key);
      return json ? JSON.parse(json) : initial;
    } catch {
      return initial;
    }
  });

  const update = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const remove = () => {
    setValue(null);
    localStorage.removeItem(key);
  };

  return [value, update, remove];
}
