import initComrakWasm, { markdownToHtml } from "comrak-wasm";

import { openAsBlob } from "node:fs";
import module from "comrak-wasm/comrak_wasm_bg.wasm?url";
import { join } from "node:path";

const init = async () => {
  if (!import.meta.env.SSR) {
    return initComrakWasm();
  } else {
    const url =
      // In dev, ?url returns /@fs/* for the path since it expects us to use fetch.
      // However, since we're on the server, there is no way to get an absolute URL.
      // Hence, just use the filesystem
      import.meta.env.DEV
        ? module.substring("/@fs".length)
        : // Relative to current dir
          join(import.meta.dirname, module);

    return initComrakWasm({
      module_or_path: new Response(await openAsBlob(url), {
        headers: { "Content-Type": "application/wasm" },
      }),
    });
  }
};

await init();

export { markdownToHtml };
