/**
 * State machine definition for the Toggle component
 */
import { createMachine, assign } from 'xstate';
import type { ToggleContext, ToggleEvent, ToggleProps } from './types';

export function createToggleMachine(props: ToggleProps = {}) {
  return createMachine(
    {
      id: 'toggle',
      initial: 'idle',
      context: {
        pressed: props.pressed ?? false,
      },
      types: {} as {
        context: ToggleContext;
        events: ToggleEvent;
      },
      states: {
        idle: {
          on: {
            'PRESS.TOGGLE': {
              actions: 'togglePressed',
            },
            'PRESS.SET': {
              actions: 'setPressed',
            },
          },
        },
      },
    },
    {
      actions: {
        togglePressed: assign(({ context }) => {
          const pressed = !context.pressed;
          props.onPressedChange?.(pressed);
          return { pressed };
        }),
        setPressed: assign(({ context, event }) => {
          if (event.type !== 'PRESS.SET') return { pressed: context.pressed };
          props.onPressedChange?.(event.pressed);
          return { pressed: event.pressed };
        }),
      },
    },
  );
}

export type ToggleMachine = ReturnType<typeof createToggleMachine>;
