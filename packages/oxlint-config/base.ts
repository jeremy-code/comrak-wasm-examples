import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "import", "promise", "jsdoc"],
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  rules: {
    // I am using express v5
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-endpoint-handlers.html
    "no-async-endpoint-handlers": "off",
  },
  env: {
    es2026: true,
  },
});
