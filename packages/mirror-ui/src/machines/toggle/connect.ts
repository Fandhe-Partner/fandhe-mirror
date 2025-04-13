/**
 * Connect function for the Toggle component
 */
import { createActor } from 'xstate';
import type { ToggleMachine } from './machine';
import type { ToggleIndicatorProps, ToggleMachineAPI, ToggleRootProps } from './types';

export function connect(machine: ToggleMachine): {
  rootProps: ToggleRootProps;
  indicatorProps: ToggleIndicatorProps;
  api: ToggleMachineAPI;
} {
  const disabled = false; // Default value
  const actor = createActor(machine);
  actor.start();
  const snapshot = actor.getSnapshot();
  const pressed = snapshot.context.pressed;

  const api: ToggleMachineAPI = {
    toggle: () => {
      actor.send({ type: 'PRESS.TOGGLE' });
    },
    setPressed: (pressed: boolean) => {
      actor.send({ type: 'PRESS.SET', pressed });
    },
  };

  const rootProps: ToggleRootProps = {
    type: 'button',
    disabled: disabled,
    'aria-pressed': pressed,
    'data-state': pressed ? 'on' : 'off',
    'data-pressed': pressed ? 'true' : 'false',
    'data-disabled': disabled ? 'true' : undefined,
    onClick: (event) => {
      if (disabled) return;
      if (event && typeof event === 'object' && 'preventDefault' in event) {
        (event as { preventDefault: () => void }).preventDefault();
      }
      api.toggle();
    },
  };

  const indicatorProps: ToggleIndicatorProps = {
    'data-state': pressed ? 'on' : 'off',
    'data-pressed': pressed ? 'true' : 'false',
    'data-disabled': disabled ? 'true' : undefined,
  };

  return {
    rootProps,
    indicatorProps,
    api,
  };
}
