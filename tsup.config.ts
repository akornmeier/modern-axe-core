// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
  },
  {
    // For a browser-ready bundle that attaches to window (if needed)
    entry: ["src/custom-axe.ts"],
    format: ["iife"],
    globalName: "axe",
    outDir: "dist/browser",
    minify: true,
    sourcemap: false,
  },
]);
