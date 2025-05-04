import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',           // Entwicklungs­ordner
  build: {
    outDir: '../dist',   // Ausgabepfad
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@import \"_variables\";' } // falls du globale Vars hast
    },
    postcss: 'postcss.config.js'
  }
});
