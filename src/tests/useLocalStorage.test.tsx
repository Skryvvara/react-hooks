import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useLocalStorage } from '..';

interface Props {
  initialState?: string;
}

function TestComponent(props: Props) {
  const [state, setState] = useLocalStorage<string>(
    'test',
    props.initialState ? props.initialState : 'initial-state'
  );

  function onClick(e: any) {
    const a = { b: {} };
    const b = { a };
    a.b = b;
    //@ts-ignore
    setState(a);
  }

  return (
    <>
      <p>{state}</p>
      <input
        data-testid="input"
        type="text"
        defaultValue={state}
        onChange={(e) => setState(e.target.value)}
      />
      <button data-testid="button" onClick={onClick}>
        Set Invalid State
      </button>
    </>
  );
}

describe('useLocalStorage', () => {
  // console.error is disabled for this suite because errors are expected and triggered with force to test hook behaviour
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Set Initial State
  test('sets the initial state', () => {
    render(<TestComponent />);
    expect(screen.getByText(/initial-state/));
  });

  // Set Local Storage
  test('sets local storage', async () => {
    render(<TestComponent />);

    const item = window.localStorage.getItem('test');
    expect(item).not.toBeNull();
    expect(JSON.parse(item!)).toEqual('initial-state');
  });

  // Reflect State
  test('changing state is reflected', async () => {
    render(<TestComponent />);

    const input = await screen.findByTestId('input');
    await userEvent.clear(input);
    await userEvent.type(input, 'new-super-value');
    expect(screen.getByText(/new-super-value/));
  });

  // Overwrites the saved localStorage with initial value if it is invalid
  test('Overwrites localStorage with initValue if invalid', async () => {
    //@ts-ignore
    window.localStorage.setItem('test', undefined);
    render(<TestComponent />);

    expect(screen.getByText(/initial-state/));
  });

  // Setting invalid sate is prevented
  test('setting invalid sate is prevented ', async () => {
    render(<TestComponent />);

    const input = await screen.findByTestId('button');
    await userEvent.click(input);

    expect(screen.getByText(/initial-state/));
  });
});
