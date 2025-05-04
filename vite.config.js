import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@import \"_variable\";' }
    },
    postcss: 'postcss.config.js'
  }
});
