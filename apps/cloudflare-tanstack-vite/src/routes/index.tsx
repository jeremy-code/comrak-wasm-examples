import { createFileRoute } from "@tanstack/react-router";

import { markdownToHtml } from "../lib/comrak-wasm";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      {markdownToHtml(` # Hello world
- This is a [link](https://google.com)
- This is a list item
1. This is an ordered list
This is text
Goodbye.
![image](https://my-image.example/image.jpg)

`)}
    </div>
  );
}
