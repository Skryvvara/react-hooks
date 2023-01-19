import { fireEvent, render, screen } from '@testing-library/react';
import React, { useRef, useState } from 'react';
import * as ResizeObserverModule from 'resize-observer-polyfill';
import { useResizeObserver } from '..';

interface Props {
  dontRenderChildren?: boolean;
}

function TestComponent(props: Props) {
  const ref = useRef(null);
  const [width, height] = useResizeObserver(ref, () => {
    window.localStorage.setItem('test', '500px');
  });

  return (
    <>
      <div data-testid="div" style={{ height: '200vh' }}>
        {props.dontRenderChildren ? (
          <h1 data-testid="no-ref">
            {width} {height}
          </h1>
        ) : (
          <h1 ref={ref} data-testid="header" style={{ fontSize: '4%' }}>
            {width} {height}
          </h1>
        )}
      </div>
    </>
  );
}

global.ResizeObserver = ResizeObserverModule.default;

describe('useResizeObserver', () => {
  test('width and height are set to 0 if ref is missing', () => {
    render(<TestComponent dontRenderChildren />);

    const element = screen.getByTestId('no-ref');
    expect(element.textContent).toEqual('0 0');
  });
});
