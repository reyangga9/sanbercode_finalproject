import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// Load environment variables
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => {
              return tag.startsWith("ion-"); // (return true)
            },
          },
        },
      }),
    ],
  });
};
