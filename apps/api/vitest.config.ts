import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./__tests__/helpers/setup.ts"],
    include: ["__tests__/**/*.test.ts"],
    testTimeout: 15000,
  },
  resolve: {
    alias: {
      "@dataflow/config": path.resolve(__dirname, "../../packages/config/src"),
      "@dataflow/database": path.resolve(
        __dirname,
        "../../packages/database/src",
      ),
      "@dataflow/queue": path.resolve(__dirname, "../../packages/queue/src"),
      "@dataflow/types": path.resolve(__dirname, "../../packages/types/src"),
      "@dataflow/logger": path.resolve(__dirname, "../../packages/logger/src"),
      "@dataflow/validation": path.resolve(
        __dirname,
        "../../packages/validation/src",
      ),
    },
  },
});
