import { useEffect } from "react";

export const useClickOutside = (ref: any, callbackFn: () => void) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackFn();
      }
    };
    window.addEventListener("mousedown", listener);
    window.addEventListener("touchstart", listener);
    return () => {
      window.removeEventListener("mousedown", listener);
      window.removeEventListener("touchstart", listener);
    };
  }, [ref, callbackFn]);
};

export default useClickOutside;
