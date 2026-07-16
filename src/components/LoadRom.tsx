import { type Dispatch, type FC, type SetStateAction, useRef } from "react";

export interface LoadRomProps {
  setRom: Dispatch<SetStateAction<Uint8Array<ArrayBufferLike> | undefined>>;
}

export const LoadRom: FC<LoadRomProps> = ({ setRom }) => {
  const romInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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

      <button
        type="button"
        className="nemu-control-button"
        onClick={() => romInputRef.current?.click()}
      >
        Load rom
      </button>
    </>
  );
};
