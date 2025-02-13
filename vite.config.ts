// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "axeCoreModern",
      formats: ["es", "umd"],
      fileName: (format) => `axe-core-modern.${format}.js`,
    },
    rollupOptions: {
      // Provide external dependencies if necessary
      external: [],
      output: {
        globals: {
          // For UMD builds, define globals
        },
      },
    },
  },
});
