/**
 * Type definitions for the Toggle component
 */

export interface ToggleContext {
  /**
   * Whether the toggle is pressed
   */
  pressed: boolean;
}

export type ToggleState = {
  value: 'idle';
  context: ToggleContext;
};

export type ToggleEvent = { type: 'PRESS.TOGGLE' } | { type: 'PRESS.SET'; pressed: boolean };

export interface ToggleProps {
  /**
   * Whether the toggle is pressed
   * @default false
   */
  pressed?: boolean;

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when the pressed state changes
   */
  onPressedChange?: (pressed: boolean) => void;
}

export interface ToggleMachineAPI {
  /**
   * Toggle the pressed state
   */
  toggle: () => void;

  /**
   * Set the pressed state
   */
  setPressed: (pressed: boolean) => void;
}

export interface ToggleRootProps {
  type: 'button';
  disabled?: boolean;
  'aria-pressed': boolean;
  'data-state': 'on' | 'off';
  'data-pressed': string;
  'data-disabled'?: string;
  onClick: (event: unknown) => void;
}

export interface ToggleIndicatorProps {
  'data-disabled'?: string;
  'data-pressed': string;
  'data-state': 'on' | 'off';
}
