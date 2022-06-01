import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import { join, resolve } from "path";
import alias from "@rollup/plugin-alias";

const srcRoot = join(__dirname, "src");
const projectRootDir = resolve(__dirname);

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    resolve: {
      alias: {
        "@": resolve(projectRootDir, "src"),
        process: "process/browser",
        util: "util",
      },
    },
    plugins: [alias(), react()],
    build: {
      outDir: join(srcRoot, "/build"),
      emptyOutDir: true,
      rollupOptions: {},
    },
  };
});
