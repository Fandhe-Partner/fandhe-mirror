import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['json-summary', 'json'],
      reportOnFailure: true,
      exclude: ['**/*.test.{js,jsx,ts,tsx}']
    },
    setupFiles: ['./src/__tests__/setup.ts']
  },
});
