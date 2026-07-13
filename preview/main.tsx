import { createRoot } from "react-dom/client";
import { Nemu } from "../src/index.tsx";

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw Error("Found no root element");
}
const root = createRoot(rootElement);
root.render(<Nemu />);
