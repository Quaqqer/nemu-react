import { Controller, Nemu } from "@quaqqer/nemu-wasm";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Button, KeyMap } from "./keymap.ts";

const FRAME_RATE = 60;

export const useNemu = (
  rom: Uint8Array | undefined,
  canvas: HTMLCanvasElement | null,
  keyMap: KeyMap,
) => {
  const ref = useRef<Nemu>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (ref.current !== null || rom === undefined || canvas === null) {
      return;
    }

    const nemu = Nemu.new(rom);
    ref.current = nemu;

    const controller = new Controller();

    const canvasContext = canvas.getContext("2d");
    const update = () => {
      if (pausedRef.current) {
        return;
      }

      nemu.update_controller(controller);

      const imageBuf = nemu.next_frame();
      const imageData = new ImageData(
        new Uint8ClampedArray(imageBuf.buffer as ArrayBuffer),
        256,
        240,
      );
      canvasContext?.putImageData(imageData, 0, 0);
    };

    const createKeyListener = (down: boolean) => (ev: KeyboardEvent) => {
      const btn: Button | undefined = keyMap[ev.key];

      if (btn !== undefined) {
        ev.preventDefault();
        controller[btn] = down;
      }
    };

    const keyDown = createKeyListener(true);
    const keyUp = createKeyListener(false);

    canvas.addEventListener("keydown", keyDown);
    canvas.addEventListener("keyup", keyUp);

    const interval = setInterval(update, 1000 / FRAME_RATE);

    return () => {
      canvas.removeEventListener("keydown", keyDown);
      canvas.removeEventListener("keyup", keyUp);
      clearInterval(interval);
      nemu.free();
      ref.current = null;
    };
  }, [rom, canvas, keyMap]);

  return useMemo(
    () => ({
      paused,
      setPaused: (pause: boolean) => setPaused(pause),
    }),
    [paused],
  );
};
