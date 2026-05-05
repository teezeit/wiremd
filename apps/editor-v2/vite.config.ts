import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@eclectic-ai/wiremd": resolve(
        __dirname,
        "../../packages/core/src/index.ts",
      ),
      fs: resolve(__dirname, "src/stubs/fs.ts"),
      path: resolve(__dirname, "src/stubs/path.ts"),
    },
  },
  server: {
    port: 5176,
    open: true,
    strictPort: true,
  },
  build: {
    target: "esnext",
    outDir: "dist",
    chunkSizeWarningLimit: 3900,
    rollupOptions: {
      output: {
        manualChunks: {
          "monaco-editor": ["monaco-editor"],
          "wiremd-core": ["@eclectic-ai/wiremd"],
        },
      },
    },
  },
});
