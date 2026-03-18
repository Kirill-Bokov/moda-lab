import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === "demo" ? "/moda-lab/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {},
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
}))
