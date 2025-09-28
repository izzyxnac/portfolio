import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['./tests/integration/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        runScripts: 'dangerously',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
