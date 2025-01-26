#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

// Common build configuration
const buildConfig = {
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
};

// Run tsup with common configuration
const result = spawnSync('tsup', [
  'src/index.ts',
  '--format',
  ...buildConfig.format,
  buildConfig.dts ? '--dts' : '',
  buildConfig.clean ? '--clean' : '',
  buildConfig.minify ? '--minify' : '',
], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

process.exit(result.status);
