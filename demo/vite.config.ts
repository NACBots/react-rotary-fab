import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-rotary-fab': path.resolve(__dirname, '../src/index.ts')
    }
  }
});
