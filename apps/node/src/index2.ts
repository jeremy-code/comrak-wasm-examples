import init, { markdownToHtml } from "comrak-wasm";
import { createReadStream } from "node:fs";

const wasmModuleResponse = new Response(
  createReadStream(
    new URL(import.meta.resolve("comrak-wasm/comrak_wasm_bg.wasm")),
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
