import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useToggle } from '..';

function TestComponent() {
  const [state, toggle] = useToggle();

  return (
    <>
      <p data-testid="text">{state ? 'On' : 'Off'}</p>
      <button data-testid="button" onClick={() => toggle()}>
        Toggle
      </button>
      <button data-testid="button2" onClick={() => toggle(false)}>
        Toggle
      </button>
    </>
  );
}

describe('useToggle', () => {
  test('state is set correctly', () => {
    const element = render(<TestComponent />);

    expect(element.getByTestId('text').textContent).toEqual('Off');
  });

  test('toggle function works, when using no parameter', () => {
    const element = render(<TestComponent />);

    const button = element.getByTestId('button');
    fireEvent.click(button);

    expect(element.getByTestId('text').textContent).toEqual('On');
  });

  test('toggle function works, when using parameter', () => {
    const element = render(<TestComponent />);

    const button = element.getByTestId('button2');
    fireEvent.click(button);

    expect(element.getByTestId('text').textContent).toEqual('Off');
  });
});
