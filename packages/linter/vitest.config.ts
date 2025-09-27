import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    isolate: false, // Your test shouldn't have side effects doing this will improve performance.
  },
});
