import { defineConfig } from "oxlint";

import baseConfig from "@comrak-wasm-examples/oxlint-config";

export default defineConfig({
  extends: [baseConfig],
  plugins: ["react", "react-perf", "jsx-a11y"],
  rules: {
    // jsxRuntime
    // https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope.html
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "19",
    },
  },
});
