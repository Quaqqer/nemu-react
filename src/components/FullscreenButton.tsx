import type { FC } from "react";

export interface FullscreenButtonProps {
  canvasRef: HTMLCanvasElement | null;
}

export const FullscreenButton: FC<FullscreenButtonProps> = ({ canvasRef }) => {
  return (
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
  );
};
