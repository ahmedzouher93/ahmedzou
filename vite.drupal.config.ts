import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Builds the site as a Drupal theme library: drupal/mutah_theme/dist/app.js + app.css
// (images and fonts are inlined, so the theme folder is self-contained)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  base: "./",
  build: {
    outDir: "drupal/mutah_theme/dist",
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 100_000,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.tsx"),
      output: { entryFileNames: "app.js", assetFileNames: "app[extname]", inlineDynamicImports: true },
    },
  },
});
