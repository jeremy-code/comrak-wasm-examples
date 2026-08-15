import fs from "node:fs/promises";
import express from "express";
import { Transform } from "node:stream";
import type { ViteDevServer } from "vite";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const ABORT_DELAY = 10_000;

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

// Create HTTP server
const app = express();

// Add Vite or respective production middlewares
let vite: ViteDevServer | undefined;

if (!isProduction) {
  const { createServer } = await import("vite");

  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });

  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;

  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template: string;
    let render: typeof import("./src/entry-server").render;

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite!.transformIndexHtml(url, template);

      render = (await vite!.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      // @ts-expect-error -- output file has no types
      render = (await import("./dist/server/entry-server.js")).render;
    }

    let didError = false;

    const { pipe, abort } = render(url, {
      onShellError() {
        res.status(500);
        res.set({ "Content-Type": "text/html" });
        res.send("<h1>Something went wrong</h1>");
      },

      onShellReady() {
        res.status(didError ? 500 : 200);
        res.set({ "Content-Type": "text/html" });

        const [htmlStart, htmlEnd] = template.split("<!--app-html-->");

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          },
        });

        transformStream.on("finish", () => {
          res.write(htmlEnd);
          res.end();
        });

        res.write(htmlStart);
        pipe(transformStream);
      },

      onError(error) {
        didError = true;
        console.error(error);
      },
    });

    setTimeout(() => abort(), ABORT_DELAY);
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    vite?.ssrFixStacktrace(error);

    console.error(e);

    res.status(500).end(error.stack);
  }
});

// Start HTTP server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
