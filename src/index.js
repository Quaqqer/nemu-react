import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./nemu.css";
import { useRef, useState } from "react";
import { DEFAULT_KEYMAP } from "./keymap.js";
import { useNemu } from "./useNemu.js";
const Component = ({ keymap: keyMap = DEFAULT_KEYMAP, width = 256 * 2, height = 240 * 2, rom: initialRom, }) => {
    const romInputRef = useRef(null);
    const [canvasRef, setCanvasRef] = useState(null);
    const [rom, setRom] = useState(initialRom);
    const { paused, setPaused } = useNemu(rom, canvasRef, keyMap);
    return (_jsxs("div", { style: { width }, children: [_jsxs("div", { style: { width, height }, children: [_jsx("input", { ref: romInputRef, hidden: true, type: "file", accept: ".nes", onChange: async (ev) => {
                            const file = ev.target.files?.[0];
                            if (file !== undefined) {
                                setRom(new Uint8Array(await file.arrayBuffer()));
                            }
                        } }), _jsx("canvas", { className: "nemu-canvas", ref: setCanvasRef, tabIndex: 0, width: 256, height: 240 })] }), _jsxs("div", { className: "nemu-control-bar", children: [_jsx("button", { type: "button", className: "nemu-control-button", onClick: () => setPaused(!paused), children: paused ? "Resume" : "Pause" }), _jsx("button", { type: "button", className: "nemu-control-button", onClick: () => romInputRef.current?.click(), children: "Load rom" }), _jsx("button", { type: "button", className: "nemu-control-button", onClick: () => {
                            canvasRef?.requestFullscreen();
                            canvasRef?.focus();
                        }, children: "Fullscreen" })] })] }));
};
export { Component as Nemu };
