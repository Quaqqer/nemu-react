import { type FC, useCallback } from "react";
import type { Settings, UpdateSetting } from "../settings.ts";
import { useCreateSettingsCheckbox } from "./SettingsCheckbox.tsx";

export interface SettingsProps {
  settings: Settings;
  updateSetting: UpdateSetting;
}

export const SettingsComponent: FC<SettingsProps> = ({
  settings,
  updateSetting,
}) => {
  const SettingsCheckbox = useCreateSettingsCheckbox(settings, updateSetting);

  return (
    <div className="nemu-settings-button">
      <span>Settings</span>

      <div className="nemu-settings-group">
        <SettingsCheckbox setting="pixelated">Pixelated</SettingsCheckbox>
      </div>
    </div>
  );
};
