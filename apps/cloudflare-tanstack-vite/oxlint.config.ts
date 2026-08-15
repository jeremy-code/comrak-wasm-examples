import reactConfig from "@comrak-wasm-examples/oxlint-config/react";

import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [reactConfig],
  ignorePatterns: ["src/routeTree.gen.ts"],
});
