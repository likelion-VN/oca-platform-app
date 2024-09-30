import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Split node_modules into separate chunks for better caching
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Set this to your preferred chunk size limit in KB
    minify: "terser",
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom']
  },
});
