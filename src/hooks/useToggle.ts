import { useCallback, useState } from 'react';

type ToggleFunction = (value?: boolean) => void;

/**
 *
 * @param initialState
 * @returns
 */
export function useToggle(initialState = false): [boolean, ToggleFunction] {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback((value?: boolean) => {
    setIsToggled(value != undefined ? value : !value);
  }, []);

  return [isToggled, toggle];
}
