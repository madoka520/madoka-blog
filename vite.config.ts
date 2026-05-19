import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'vue/macros'],
      dts: 'auto-imports.d.ts',
      dirs: ['src/utils/global'],
      resolvers: [],
    }),],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@apps": fileURLToPath(new URL("./src/views/apps", import.meta.url)),
      "@wails": fileURLToPath(new URL("./bindings", import.meta.url)),
    },
  },
});
