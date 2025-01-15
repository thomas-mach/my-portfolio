import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'VueRecaptcha', 
        },
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // altre opzioni di configurazione di Rollup se necessario
      },
    },
  },
  optimizeDeps: {
    include: ['vue-recaptcha-v3'],  // Includi vue-recaptcha-v3 per l'ottimizzazione
  },
});
