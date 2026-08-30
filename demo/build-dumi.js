import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Building Dumi documentation site for Vercel...');
const rootDir = path.resolve(__dirname, '..');

// Install root dependencies and build dumi docs
execSync('npm install', { cwd: rootDir, stdio: 'inherit' });
execSync('npm run docs:build', { cwd: rootDir, stdio: 'inherit' });

const srcDir = path.join(rootDir, 'docs-dist');
const destDir = path.resolve(__dirname, 'dist');

if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.cpSync(srcDir, destDir, { recursive: true });

console.log('✅ Successfully prepared docs-dist in demo/dist for Vercel deployment!');
