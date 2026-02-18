import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Library build mode
  if (mode === "lib") {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.js"),
          name: "ReadyUIReact",
          formats: ["es", "cjs"],
          fileName: (format) => `readyui-react.${format}.js`,
        },
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "framer-motion",
            "@dnd-kit/core",
            "@dnd-kit/sortable",
            "@dnd-kit/utilities",
            "react-hot-toast",
          ],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "jsxRuntime",
              "framer-motion": "FramerMotion",
              "@dnd-kit/core": "DndKitCore",
              "@dnd-kit/sortable": "DndKitSortable",
              "@dnd-kit/utilities": "DndKitUtilities",
              "react-hot-toast": "ReactHotToast",
            },
          },
        },
        sourcemap: true,
        minify: "esbuild",
      },
    };
  }

  // Default: Demo app build
  return {
    plugins: [react(), tailwindcss()],
  };
});
