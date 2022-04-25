import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@sample": path.resolve(__dirname, "./sample"),
    },
  },
});
