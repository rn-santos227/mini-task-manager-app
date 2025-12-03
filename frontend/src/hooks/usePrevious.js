import { useEffect, useState } from "react";

export default function usePrevious(value) {
  const [prev, setPrev] = useState();

  useEffect(() => {
    setPrev(value);
  }, [value]);

  return prev;
}
