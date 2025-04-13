import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMachine, assign } from 'xstate';
import { useMachine } from './use-machine';
import React from 'react';

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
            actions: assign(({ context }) => ({ count: context.count + 1 })),
          },
          DECREMENT: {
            actions: assign(({ context }) => ({ count: context.count - 1 })),
          },
          SET: {
            actions: assign(({ event }) => ({ count: event.value })),
          },
        },
      },
    },
  });
};

describe('useMachine React Hook', () => {
  it('should initialize with the machine state', () => {
    const TestComponent = () => {
      const [state] = useMachine(createCounterMachine());
      return <div>Count: {state.context.count}</div>;
    };

    render(<TestComponent />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('should update state when sending events', () => {
    const TestComponent = () => {
      const [state, send] = useMachine(createCounterMachine());
      
      return (
        <div>
          <div>Count: {state.context.count}</div>
          <button onClick={() => send({ type: 'INCREMENT' })}>Increment</button>
          <button onClick={() => send({ type: 'DECREMENT' })}>Decrement</button>
        </div>
      );
    };

    render(<TestComponent />);
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
      
      return (
        <div>
          <div>Count: {state.context.count}</div>
          <button onClick={() => send({ type: 'SET', value: 10 })}>Set to 10</button>
        </div>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Set to 10'));
    expect(screen.getByText('Count: 10')).toBeInTheDocument();
  });

  it('should provide the service as the third return value', () => {
    const onTransitionMock = vi.fn();
    
    const TestComponent = () => {
      const [state, send, service] = useMachine(createCounterMachine());
      
      React.useEffect(() => {
        const subscription = service.subscribe(onTransitionMock);
        return () => subscription.unsubscribe();
      }, [service]);
      
      return (
        <div>
          <div>Count: {state.context.count}</div>
          <button onClick={() => send({ type: 'INCREMENT' })}>Increment</button>
        </div>
      );
    };

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Increment'));
    
    expect(onTransitionMock).toHaveBeenCalled();
  });
});
