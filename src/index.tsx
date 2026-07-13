import "./nemu.css";

import { type FC, useRef, useState } from "react";
import { DEFAULT_KEYMAP, type KeyMap } from "./keymap.ts";
import { useNemu } from "./useNemu.ts";

export interface NemuProps {
  keymap?: KeyMap;
  width?: number;
  height?: number;
  rom?: Uint8Array;
}

const Component: FC<NemuProps> = ({
  keymap: keyMap = DEFAULT_KEYMAP,
  width = 256 * 2,
  height = 240 * 2,
  rom: initialRom,
}) => {
  const romInputRef = useRef<HTMLInputElement>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [rom, setRom] = useState<Uint8Array | undefined>(initialRom);

  const { paused, setPaused } = useNemu(rom, canvasRef, keyMap);

  return (
    <div style={{ width }}>
      <div style={{ width, height }}>
        <input
          ref={romInputRef}
          hidden
          type="file"
          accept=".nes"
          onChange={async (ev) => {
            const file = ev.target.files?.[0];
            if (file !== undefined) {
              setRom(new Uint8Array(await file.arrayBuffer()));
            }
          }}
        />

        <canvas
          className="nemu-canvas"
          ref={setCanvasRef}
          tabIndex={0}
          width={256}
          height={240}
        />
      </div>

      <div className="nemu-control-bar">
        <button
          type="button"
          className="nemu-control-button"
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Resume" : "Pause"}
        </button>

        <button
          type="button"
          className="nemu-control-button"
          onClick={() => romInputRef.current?.click()}
        >
          Load rom
        </button>
        <button
          type="button"
          className="nemu-control-button"
          onClick={() => {
            canvasRef?.requestFullscreen();
            canvasRef?.focus();
          }}
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
};

export { Component as Nemu };
