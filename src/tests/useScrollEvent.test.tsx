import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { useScrollEvent } from '..';

function TestComponent() {
  const [state, setState] = useState('');
  useScrollEvent(() => {
    setState('scrolled');
  });

  return <p>{state}</p>;
}

describe('useScrollEvent', () => {
  test('scoll event is fired', () => {
    render(<TestComponent />);

    fireEvent.scroll(window, 100);
    expect(screen.getByText(/scrolled/));
  });
});
