import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"; // Importa il plugin Vue

export default defineConfig({
  root: "frontend", // La cartella con i file sorgenti
  build: {
    outDir: "../backend/public", // Percorso della cartella principale (portfolio)
    emptyOutDir: true, // Non eliminare altri file nella cartella principale
  },
  plugins: [
    vue(), // Aggiungi il plugin Vue per il supporto a Vue 3
  ],
});
