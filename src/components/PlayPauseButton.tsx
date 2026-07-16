import type { FC } from "react";

export interface PlayPauseButtonProps {
  paused: boolean;
  setPaused: (pause: boolean) => void;
}

export const PlayPauseButton: FC<PlayPauseButtonProps> = ({
  paused,
  setPaused,
}) => {
  return (
    <button
      type="button"
      className="nemu-control-button"
      onClick={() => setPaused(!paused)}
    >
      {paused ? "Resume" : "Pause"}
    </button>
  );
};
