import type { Controller } from "@quaqqer/nemu-wasm";

export type Button = keyof Omit<Controller, "free">;

export type KeyMap = Record<string, Button>;

export const DEFAULT_KEYMAP: KeyMap = {
  z: "b",
  x: "a",
  Shift: "select",
  Enter: "start",
  ArrowUp: "dpad_n",
  ArrowDown: "dpad_s",
  ArrowLeft: "dpad_w",
  ArrowRight: "dpad_e",
};
