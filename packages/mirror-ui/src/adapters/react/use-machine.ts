/**
 * React adapter for using XState machines with Mirror UI components
 */
import { useMachine as useXStateMachine } from '@xstate/react';
import type { AnyStateMachine, InterpreterFrom, StateFrom } from 'xstate';

/**
 * Hook for using XState machines in React components
 * This is a wrapper around @xstate/react's useMachine hook
 * 
 * @param machine The XState machine to use
 * @param options Optional configuration options
 * @returns A tuple containing the current state and a send function
 */
export function useMachine<TMachine extends AnyStateMachine>(
  machine: TMachine,
  options?: Parameters<typeof useXStateMachine<TMachine>>[1]
): [
  StateFrom<TMachine>,
  InterpreterFrom<TMachine>['send'],
  InterpreterFrom<TMachine>
] {
  return useXStateMachine(machine, options);
}
