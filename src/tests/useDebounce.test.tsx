import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDebounce } from '..';

function TestComponent() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);
  const [deb, setDeb] = useState(0);
  useDebounce(
    () => {
      setDeb(deb + 1);
    },
    500,
    [value]
  );

  useEffect(() => {
    setCount(count + 1);
  }, [value]);

  return (
    <>
      <h2 data-testid="value">{value}</h2>
      <h2 data-testid="count">{count}</h2>
      <h2 data-testid="deb">{deb}</h2>
      <input
        data-testid="input"
        type="text"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

describe('useDebounce', () => {
  test('Debounce callback is only called once', async () => {
    render(<TestComponent />);

    const input = screen.getByTestId('input');
    await act(async () => {
      await userEvent.type(input, 'Testing the use debounce hook');
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    const count = screen.getByTestId('count');
    const deb = screen.getByTestId('deb');

    expect(deb.textContent).not.toEqual(count.textContent);
  });
});
