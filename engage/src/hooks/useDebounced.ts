import { useRef } from 'react';

const useDebounced = (timer = 3000) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (callback: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, timer);
  };
};

export default useDebounced; 