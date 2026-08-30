import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/',
  publicPath: '/',
  locales: [
    { id: 'en-US', name: 'English', suffix: '' }
  ],
  favicons: ['/logo.png'],
  themeConfig: {
    name: 'react-rotary-fab',
    logo: '/logo.png',
    nav: [
      { title: 'Guide', link: '/guide' },
      { title: 'RotaryFab', link: '/components/rotary-fab' },
      { title: 'RotaryDial', link: '/components/rotary-dial' },
      { title: 'Interactive Studio', link: '/components/interactive-studio' },
      { title: 'GitHub', link: 'https://github.com/nikhileashy/react-rotary-fab' },
    ],
    socialLinks: {
      github: 'https://github.com/nikhileashy/react-rotary-fab',
    },
    footer: 'MIT Licensed | Built with ❤️ by Nikhil Eashy & Neeha Nazer',
  },
  resolve: {
    docDirs: ['docs'],
  },
  alias: {
    'react-rotary-fab/styles.css': path.resolve(__dirname, 'src/styles/rotary-fab.css'),
    'react-rotary-fab': path.resolve(__dirname, 'src/index.ts'),
  },
  styles: [
    `@import '${path.resolve(__dirname, 'src/styles/rotary-fab.css').replace(/\\/g, '/')}';`,
    `[data-prefers-color='dark'] .dumi-default-header-left img, [data-prefers-color='dark'] .dumi-default-logo img, [data-prefers-color='dark'] header img, [data-prefers-color='dark'] .dumi-default-navbar-logo img { filter: invert(1) brightness(1.3) contrast(1.1); }`,
  ],
});
