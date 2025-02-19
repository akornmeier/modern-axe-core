import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vitest.config.ts',
  {
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: ["test/**/*.{test,spec}.ts", "test/**/*.unit.{test,spec}.ts"],
      name: "unit",
      environment: "node",
    },
  },
  {
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: [
        "test-browser/**/*.{test,spec}.ts",
        "test/**/*.browser.{test,spec}.ts",
      ],
      name: "browser",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
      },
    },
  },
]);
