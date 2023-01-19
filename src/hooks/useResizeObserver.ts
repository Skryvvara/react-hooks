import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

/**
 * Hook to make using ResizeObserver easier.
 *
 * @param {HTMLElement} ref Ref of the element to be observed
 * @param {Function} callback Optional callback to be called when the window is resized
 * @returns An array containing the width and height of the observed element
 */
export function useResizeObserver(
  ref: RefObject<HTMLElement>,
  callback?: (entry: DOMRectReadOnly) => void
): [number, number] {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];
      // target.getBoundingClientRect() is used to include padding/borders in height calculation
      setWidth(entry.target.getBoundingClientRect().width);
      setHeight(entry.target.getBoundingClientRect().height);

      if (!callback) return;
      callback(entry.contentRect);
    },
    [callback]
  );

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    let resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      handleResize(entries)
    );
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, handleResize]);

  return [width, height];
}
