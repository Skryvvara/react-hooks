import { useEffect } from 'react';

/**
 * Allows to easily add a function to the onScroll eventlistener.
 *
 * @param callback Function to be called on scroll
 */
export function useScrollEvent(callback: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, [callback]);
}
