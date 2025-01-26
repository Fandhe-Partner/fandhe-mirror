#!/usr/bin/env node

const { spawnSync } = require('child_process');

// Common lint configuration
const lintConfig = {
  fix: process.env.CI ? false : true,
};

// Run biome with common configuration
const result = spawnSync('biome', [
  'check',
  '.',
  lintConfig.fix ? '--apply' : '',
], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

process.exit(result.status);
