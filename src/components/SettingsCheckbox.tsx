import { type FC, useCallback } from "react";
import type { Settings, UpdateSetting } from "../settings.ts";

type BooleanSettings = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never;
};

export interface SettingsCheckboxProps<Setting extends keyof BooleanSettings> {
  setting: Setting;
  settings: Settings;
  updateSetting: UpdateSetting;
  children: string;
}

export function SettingsCheckbox<S extends keyof BooleanSettings>({
  setting,
  settings,
  updateSetting,
  children,
}: SettingsCheckboxProps<S>) {
  return (
    <div className="nemu-setting-with-label">
      <input
        id="nemu-pixelated"
        type="checkbox"
        checked={settings[setting]}
        onChange={(e) => {
          updateSetting(setting, e.target.checked);
        }}
      />

      <label htmlFor="nemu-pixelated">{children}</label>
    </div>
  );
}

export const useCreateSettingsCheckbox = <S extends keyof BooleanSettings>(
  settings: Settings,
  updateSetting: UpdateSetting,
): FC<Omit<SettingsCheckboxProps<S>, "settings" | "updateSetting">> => {
  return useCallback(
    (props) => (
      <SettingsCheckbox
        {...props}
        settings={settings}
        updateSetting={updateSetting}
      />
    ),
    [settings, updateSetting],
  );
};
