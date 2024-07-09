import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Customize file extensions and aliases as needed
      "@": "/src",
    },
    // You can also configure file extensions here
    // extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
});
