---
name: "[Test] Implement tests for Toggle component"
about: Implement tests for Toggle component in mirror-ui-base
title: "[Test] Implement tests for Toggle component in packages/mirror-ui-base"
labels: test, component:toggle
assignees: ''
---

## Task Description

This issue is for implementing tests for the Toggle component in the `packages/mirror-ui-base` package.

### Tasks

1. Implement tests for the Toggle component:
   - `packages/mirror-ui-base/src/machines/toggle/machine.test.ts`: Unit tests for the XState machine
   - `packages/mirror-ui-base/src/adapters/react/use-machine.test.tsx` (or in a test directory): React component-level tests using the Toggle machine

### Expected Deliverables

- Unit tests for the Toggle component
- Integration tests for the Toggle component with React

### Notes

This issue is specifically for Toggle component test implementation in the `packages/mirror-ui-base` directory.
The implementation assumes a Vitest/Testing Library environment.
