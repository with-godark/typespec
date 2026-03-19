import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/test/**/*.test.ts'],
    isolate: false, // Your test shouldn't have side effects doing this will improve performance.
  },
});
