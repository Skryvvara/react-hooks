import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to simplify usage of timeouts.
 *
 * @param callback function to be called after delay
 * @param delay in milliseconds
 * @returns tuple containing reset and clear function
 */
export function useTimeout(
  callback: Function,
  delay: number
): [() => void, () => void] {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return [reset, clear];
}
