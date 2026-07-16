import "./nemu.css";

import { type FC, useState } from "react";
import { ControlBar } from "./components/ControlBar.tsx";
import { DEFAULT_KEYMAP, type KeyMap } from "./keymap.ts";
import { useSettings } from "./settings.ts";
import { useNemu } from "./useNemu.ts";

export interface NemuProps {
  keymap?: KeyMap;
  width?: number;
  height?: number;
  rom?: Uint8Array;
  allowLoadRom?: boolean;
}

const Component: FC<NemuProps> = ({
  keymap: keyMap = DEFAULT_KEYMAP,
  width,
  height,
  rom: initialRom,
  allowLoadRom = true,
}) => {
  const _fixedDimensions = width !== undefined || height !== undefined;
  width ??= 256 * 2;
  height ??= 240 * 2;

  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [rom, setRom] = useState<Uint8Array | undefined>(initialRom);

  const { paused, setPaused } = useNemu(rom, canvasRef, keyMap);
  const { settings, updateSetting } = useSettings();

  return (
    <div className="nemu" style={{ width }}>
      <div style={{ width, height }}>
        <canvas
          className="nemu-canvas"
          ref={setCanvasRef}
          tabIndex={0}
          width={256}
          height={240}
          style={{
            imageRendering: settings.pixelated ? "pixelated" : undefined,
          }}
        />
      </div>

      <ControlBar
        paused={paused}
        setPaused={setPaused}
        canvasRef={canvasRef}
        allowLoadRom={allowLoadRom}
        setRom={setRom}
        fixedDimensions={false}
        settings={settings}
        updateSetting={updateSetting}
      />
    </div>
  );
};

export { Component as Nemu };
