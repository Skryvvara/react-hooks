import { useEffect } from 'react';
import { useTimeout } from './useTimeout';

/**
 * UseDebounce hook executes the callback if the given dependencies
 * changed at least once but then didn't change within the given delay period.
 *
 * @param callback function to be called after delay
 * @param delay in milliseconds
 * @param dependencies
 */
export function useDebounce(
  callback: Function,
  delay: number,
  ...dependencies: any
) {
  const [reset, clear] = useTimeout(callback, delay);
  useEffect(reset, dependencies);
  useEffect(clear, []);
}
