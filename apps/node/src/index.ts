import init, { markdownToHtml } from "comrak-wasm";
import { openAsBlob } from "node:fs";
import { fileURLToPath } from "node:url";

const wasmModuleResponse = new Response(
  await openAsBlob(
    fileURLToPath(import.meta.resolve("comrak-wasm/comrak_wasm_bg.wasm")),
  ),
  { headers: { "Content-Type": "application/wasm" } },
);

await init({ module_or_path: wasmModuleResponse });
const html = markdownToHtml(
  `# Hello world!
1. Do ~~you~~ like [pretty](#) paintings?
2. Or *pretty* music?
`,
  {
    extension: {
      strikethrough: true,
    },
  },
);

console.log(html);
