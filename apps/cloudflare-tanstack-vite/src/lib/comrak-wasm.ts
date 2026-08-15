import { createIsomorphicFn } from "@tanstack/react-start";
import wasmModuleUrl from "comrak-wasm/comrak_wasm_bg.wasm?url";
import wasmModule from "comrak-wasm/comrak_wasm_bg.wasm";
import init, { markdownToHtml } from "comrak-wasm";

const getWasmModule = createIsomorphicFn()
  .client(() => wasmModuleUrl)
  /**
   * Cloudflare does not allow
   *
   * @see {@link https://github.com/cloudflare/workers-sdk/blob/b8fd112136abf4ff17c3d456eaa7b22880bcaf6a/fixtures/wasm-app/worker/module/export_wasm.js#L4}
   * @see {@link https://github.com/cloudflare/workers-sdk/blob/b8fd112136abf4ff17c3d456eaa7b22880bcaf6a/packages/miniflare/src/runtime/config/generated/workerd.ts#L933-L941}
   */
  .server(() => wasmModule);

await init({
  module_or_path: getWasmModule(),
});

export { markdownToHtml };
