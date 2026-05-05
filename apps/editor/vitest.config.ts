import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: __dirname,
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: ['src/examples.ts'],
      thresholds: {
        global: {
          branches: 65,
          functions: 65,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
  resolve: {
    alias: {
      wiremd: resolve(__dirname, '../../packages/core/src/index.ts'),
    },
  },
});
