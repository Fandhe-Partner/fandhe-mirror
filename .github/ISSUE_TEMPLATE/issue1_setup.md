---
name: "[Setup] Adjust directory structure for Toggle component and ensure dependencies"
about: Setup task for Toggle component in mirror-ui-base
title: "[Setup] Adjust directory structure for Toggle component and ensure dependencies in packages/mirror-ui-base"
labels: enhancement, setup
assignees: ''
---

## Task Description

This issue is for setting up the directory structure and dependencies for the Toggle component in `packages/mirror-ui-base`.

### Tasks

1. Add `xstate` dependency to `packages/mirror-ui-base/package.json` if not already present
2. Organize the `packages/mirror-ui-base/src` directory according to the proposed structure:
   - `core/`
   - `machines/toggle/`
   - `adapters/react/`
   - Create the `machines/toggle` directory

### Expected Deliverables

- `xstate` installed as a dependency in `packages/mirror-ui-base`
- Directory structure in `packages/mirror-ui-base/src` following the proposed organization (including `machines/toggle`)

### Notes

This issue is specifically for setup work in the `packages/mirror-ui-base` directory.
