import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression({
    algorithm: 'gzip',
    ext: '.gz',
  }), viteCompression({
    algorithm: 'brotliCompress',
    ext: '.br',
  })],
  resolve: {
    alias: {
      "firebase/firestore": path.resolve(__dirname, "./src/lib/d1Shim.ts"),
      'quill/modules/normalizeExternalHTML/index.js': path.resolve(__dirname, 'patch-quill-alias.js'),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const normalized = id.replace(/\\/g, "/");
            if (
              normalized.includes("/react/") ||
              normalized.includes("/react-dom/") ||
              normalized.includes("/react-router")
            ) {
              return "vendor-react";
            }
            if (normalized.includes("/framer-motion/")) {
              return "vendor-framer-motion";
            }
            if (normalized.includes("/lucide-react/")) {
              return "vendor-lucide";
            }
            if (normalized.includes("/lenis/")) {
              return "vendor-lenis";
            }
            if (normalized.includes("/firebase/")) {
              return "vendor-firebase";
            }
            if (normalized.includes("/@calcom/")) {
              return "vendor-calcom";
            }
          }
        },
      },
    },
  },
})
