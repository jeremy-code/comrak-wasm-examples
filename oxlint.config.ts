import baseConfig from "@comrak-wasm-examples/oxlint-config";

import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [baseConfig],
  ignorePatterns: ["apps/**", "packages/**"],
});
