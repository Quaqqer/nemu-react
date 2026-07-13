import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
export default defineConfig({
    // @ts-expect-error
    plugins: [wasm()],
    server: { fs: { allow: [".", "../src", "../node_modules/"] } },
});
