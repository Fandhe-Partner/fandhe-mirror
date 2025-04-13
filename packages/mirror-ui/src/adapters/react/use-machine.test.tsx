import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMachine, assign } from 'xstate';
import { useMachine } from './use-machine';
import * as React from 'react';
import '@testing-library/jest-dom';

const createCounterMachine = () => {
  return createMachine({
    id: 'counter',
    initial: 'idle',
    context: {
      count: 0,
    },
    states: {
      idle: {
        on: {
          INCREMENT: {
            actions: assign({
              count: (context) => context.count + 1
            }),
          },
          DECREMENT: {
            actions: assign({
              count: (context) => context.count - 1
            }),
          },
          SET: {
            actions: assign({
              count: (_, event) => event.value
            }),
          },
        },
      },
    },
    types: {
      context: {} as { count: number },
      events: {} as 
        | { type: 'INCREMENT' }
        | { type: 'DECREMENT' }
        | { type: 'SET', value: number },
    },
  });
};

describe('useMachine React Hook', () => {
  it('should initialize with the machine state', () => {
    const TestComponent = () => {
      const [state] = useMachine(createCounterMachine());
      return React.createElement('div', null, `Count: ${state.context.count}`);
    };

    render(React.createElement(TestComponent));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('should update state when sending events', () => {
    const TestComponent = () => {
      const [state, send] = useMachine(createCounterMachine());
      
      return React.createElement(
        'div',
        null,
        React.createElement('div', null, `Count: ${state.context.count}`),
        React.createElement(
          'button',
          { onClick: () => send({ type: 'INCREMENT' }) },
          'Increment'
        ),
        React.createElement(
          'button',
          { onClick: () => send({ type: 'DECREMENT' }) },
          'Decrement'
        )
      );
    };

    render(React.createElement(TestComponent));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Decrement'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should handle events with payload', () => {
    const TestComponent = () => {
      const [state, send] = useMachine(createCounterMachine());
      
      return React.createElement(
        'div',
        null,
        React.createElement('div', null, `Count: ${state.context.count}`),
        React.createElement(
          'button',
          { onClick: () => send({ type: 'SET', value: 10 }) },
          'Set to 10'
        )
      );
    };

    render(React.createElement(TestComponent));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Set to 10'));
    expect(screen.getByText('Count: 10')).toBeInTheDocument();
  });

  it('should provide the service as the third return value', () => {
    const onTransitionMock = vi.fn();
    
    const TestComponent = () => {
      const [state, send, actor] = useMachine(createCounterMachine());
      
      React.useEffect(() => {
        const subscription = actor.subscribe(onTransitionMock);
        return () => subscription.unsubscribe();
      }, [actor]);
      
      return React.createElement(
        'div',
        null,
        React.createElement('div', null, `Count: ${state.context.count}`),
        React.createElement(
          'button',
          { onClick: () => send({ type: 'INCREMENT' }) },
          'Increment'
        )
      );
    };

    render(React.createElement(TestComponent));
    fireEvent.click(screen.getByText('Increment'));
    
    expect(onTransitionMock).toHaveBeenCalled();
  });
});
