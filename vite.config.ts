import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'VTiptapEditor',
      fileName: 'index',
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        'vue',
        /^vuetify($|\/)/,
      ],
      output: {
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
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
