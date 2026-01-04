import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/News-Explorer-frontend/", // <-- replace REPO_NAME with your GitHub repo name
});
