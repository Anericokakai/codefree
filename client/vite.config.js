import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin({
      failOnError: false,
      include: "src/**/*.{js,jsx,ts,tsx}", // Lint JS/TS files in the src folder
    }),
    react(),
  ],
});
