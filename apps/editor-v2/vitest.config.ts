import { resolve } from "path";
import { defineConfig } from "vitest/config";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteTsconfigPaths()],
  resolve: {
    alias: {
      "@eclectic-ai/wiremd": resolve(
        __dirname,
        "../../packages/core/src/index.ts",
      ),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    passWithNoTests: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
