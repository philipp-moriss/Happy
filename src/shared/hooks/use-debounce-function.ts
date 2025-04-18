import { useEffect, useCallback, useRef } from "react";

export function useDebounceFunction(callback: () => void, delay: number) {
  // Store the callback in a ref to keep it consistent across renders
  const callbackRef = useRef(callback);

  // Update the callback ref if the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Store the timeout ID in a ref
  const timeoutRef = useRef(null);

  // Create a debounced function using useCallback
  const debouncedFunction = useCallback(
    // @ts-ignore
    (...args) => {
      // Clear the previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      // @ts-ignore
      timeoutRef.current = setTimeout(() => {
        // @ts-ignore
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  // Cleanup function to clear the timeout when the component unmounts or dependencies change
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}
