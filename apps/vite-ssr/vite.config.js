import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    ssr: {
        external: ["comrak-wasm", "comrak-wasm/comrak_wasm_bg.wasm"],
    },
    assetsInclude: ["**/*.wasm"],
    build: {
        ssrEmitAssets: true,
    },
});
