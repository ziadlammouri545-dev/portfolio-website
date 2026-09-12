import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" so the build works from GitHub Pages subpaths
export default defineConfig({
  plugins: [react()],
  base: "./",
});