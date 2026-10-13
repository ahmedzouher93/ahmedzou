import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Node build of scripts/export-content.ts (images inlined as data: URIs)
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: {
    ssr: path.resolve(__dirname, "scripts/export-content.ts"),
    outDir: "node_modules/.mutah-export",
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    rollupOptions: { output: { format: "es", entryFileNames: "export.mjs" } },
  },
  ssr: { noExternal: true },
});
