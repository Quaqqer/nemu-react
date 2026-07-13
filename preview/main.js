import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { Nemu } from "../src/index.js";
const rootElement = document.getElementById("root");
if (rootElement === null) {
    throw Error("Found no root element");
}
const root = createRoot(rootElement);
root.render(_jsx(Nemu, {}));
