import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: "",
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});
