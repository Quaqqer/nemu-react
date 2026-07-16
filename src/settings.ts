import { useEffect, useState } from "react";

const STORAGE_ITEM = "nemu-settings";

export interface Settings {
  pixelated: boolean;
  bypassRenderLimit: boolean;
}

export type UpdateSetting = <Setting extends keyof Settings>(
  setting: Setting,
  value: Settings[Setting],
) => void;

const DEFAULT_SETTINGS: Settings = {
  pixelated: true,
  bypassRenderLimit: true,
};

const withDefaults = (partial: Partial<Settings>) => {
  return { ...DEFAULT_SETTINGS, ...partial };
};

const loadSettings = () => {
  const stored = localStorage.getItem(STORAGE_ITEM);

  let loadedSettings: Partial<Settings>;

  if (stored !== null) {
    loadedSettings = JSON.parse(stored);
  } else {
    loadedSettings = {};
  }

  return withDefaults(loadedSettings);
};

const saveSettings = (settings: Settings) => {
  localStorage.setItem(STORAGE_ITEM, JSON.stringify(settings));
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => loadSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  function updateSetting<S extends keyof Settings>(
    setting: S,
    value: Settings[S],
  ) {
    setSettings((settings) => ({ ...settings, [setting]: value }));
  }

  return { settings, updateSetting };
};
