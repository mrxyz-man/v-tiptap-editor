import glob from 'fast-glob';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

const files = glob.sync(['./lib/{extensions,components,renders,utils}/**/*.{vue,js,scss}'])
  .map((file) => {
    const key = file.match(/(?<=\.\/lib\/).*(?=\.js|\.vue|\.scss)/) || [''];
    return [key[0], file];
  });
const filesEntries = Object.fromEntries(files);

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './lib/assets',
  build: {
    target: 'es2015',
    lib: {
      entry: {
        ...filesEntries,
        index: resolve(__dirname, 'lib/index.js'),
      },
      name: 'TiptapEditor',
    },
    rollupOptions: {
      external: [
        'vue',
        /^@tiptap($|\/)/,
        /^vuetify($|\/)/,
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['vuetify'],
  },
  plugins: [
    vue2(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },
});
