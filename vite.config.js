import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@server-runtime": path.resolve(__dirname, "./server-runtime"),
    },
  },
});
