import type { Dispatch, FC, SetStateAction } from "react";
import type { Settings, UpdateSetting } from "../settings.ts";
import { FullscreenButton } from "./FullscreenButton.tsx";
import { LoadRom } from "./LoadRom.tsx";
import { PlayPauseButton } from "./PlayPauseButton.tsx";
import { SettingsComponent } from "./SettingsComponent.tsx";

interface ControlBarProps {
  paused: boolean;
  setPaused: (pause: boolean) => void;
  canvasRef: HTMLCanvasElement | null;
  allowLoadRom: boolean;
  setRom: Dispatch<SetStateAction<Uint8Array<ArrayBufferLike> | undefined>>;
  fixedDimensions: boolean;
  settings: Settings;
  updateSetting: UpdateSetting;
}

export const ControlBar: FC<ControlBarProps> = ({
  paused,
  setPaused,
  canvasRef,
  allowLoadRom,
  setRom,
  fixedDimensions: _,
  settings,
  updateSetting,
}) => {
  return (
    <div className="nemu-control-bar">
      <PlayPauseButton paused={paused} setPaused={setPaused} />
      {allowLoadRom && <LoadRom setRom={setRom} />}
      <FullscreenButton canvasRef={canvasRef} />
      <SettingsComponent settings={settings} updateSetting={updateSetting} />
    </div>
  );
};
