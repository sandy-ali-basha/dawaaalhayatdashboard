import { useRef } from "react";

export const useDebounce = (fun, time) => {
  const ref = useRef(null);
  return (e) => {
    ref.current && clearTimeout(ref.current);
    ref.current = setTimeout(() => fun(e), time);
  };
};
