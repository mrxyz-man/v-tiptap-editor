import glob from 'fast-glob';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const files = glob.sync(['./src/{extensions,components,renders,utils,assets}/**/*.{vue,js,scss}'])
  .map(file => {
    const key = file.match(/(?<=\.\/src\/).*(?=\.js|\.vue|\.scss)/) || [''];
    return [key[0], file];
  });
const filesEntries = Object.fromEntries(files);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: {
        ...filesEntries,
        index: resolve(__dirname, 'lib/index.js'),
      },
      name: 'VTiptapEditor',
    },
    copyPublicDir: false,
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
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: function customJsAssetsfilterFunction(outputChunk) {
        return (
          outputChunk.fileName == 'components/VTiptapEditor.js'
          || outputChunk.fileName == 'components/VTiptapEditor.cjs'
        );
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
