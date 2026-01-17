import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": "http://localhost:8000",
      "/api": "https://tuan-odjtineo.b4a.run/",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup/setupTest.js",
    globals: true,
    coverage: { provider: "v8", reporter: ["text", "html"] },
  },
});
