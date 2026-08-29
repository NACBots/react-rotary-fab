import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['react', 'react-dom'],
  treeshake: true,
  splitting: false,
  outDir: 'dist',
  async onSuccess() {
    const srcCss = path.resolve(__dirname, 'src/styles/rotary-fab.css');
    const distStylesCss = path.resolve(__dirname, 'dist/styles.css');
    if (fs.existsSync(srcCss)) {
      fs.copyFileSync(srcCss, distStylesCss);
      console.log('✅ Copied CSS to dist/styles.css');
    }
  }
});
