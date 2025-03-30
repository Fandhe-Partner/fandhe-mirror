---
name: "[Feature] Implement React adapter"
about: Implement React adapter for mirror-ui-base
title: "[Feature] Implement React adapter in packages/mirror-ui-base"
labels: enhancement, feature, framework:react
assignees: ''
---

## Task Description

This issue is for implementing the React adapter in the `packages/mirror-ui-base` package to use the core logic with React.

### Tasks

1. Implement React adapter files:
   - `packages/mirror-ui-base/src/adapters/react/normalize-props.ts`: Implement the `normalizeProps` function for React
   - `packages/mirror-ui-base/src/adapters/react/use-machine.ts`: Implement the `useMachine` hook (referencing or wrapping `@xstate/react`)
   - `packages/mirror-ui-base/src/adapters/react/index.ts`: Create the entry point file

### Expected Deliverables

- React adapter files in the `src/adapters/react/` directory

### Notes

This issue is specifically for React adapter implementation in the `packages/mirror-ui-base` directory.
