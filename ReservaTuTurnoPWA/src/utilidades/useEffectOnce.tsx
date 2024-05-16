import { useEffect, useRef } from "react";

export const useEffectOnce = (callback: () => void) => {
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      callback();
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
