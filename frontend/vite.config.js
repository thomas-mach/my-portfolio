import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  root: '.', // Cartella contenente il codice Vue
  build: {
    outDir: '../backend/public', // Cartella di output del build
    emptyOutDir: true, // Pulire la cartella di output prima della build
    manifest: true, // Abilita la creazione di manifest.json
  },
});
