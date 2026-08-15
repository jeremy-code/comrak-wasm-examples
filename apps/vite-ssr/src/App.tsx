import { markdownToHtml } from "./lib/comrak-wasm";

function App() {
  return (
    <>
      {" "}
      {markdownToHtml(` # Hello world
- This is a [link](https://google.com)
- This is a list item
1. This is an ordered list
This is text
Goodbye.
![image](https://my-image.example/image.jpg)

`)}
    </>
  );
}

export default App;
