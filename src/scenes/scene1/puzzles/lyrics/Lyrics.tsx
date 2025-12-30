import { Music4 } from "lucide-react";

import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { puzzleConfig } from "@/scenes/scene1/config";
import { lyrics } from "./config";

type Props = {
  close: () => void;
};

export const Lyrics = ({ close }: Props) => {
  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.lyrics.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>
      <div className="p-4 w-[70%] mx-auto text-center">
        <img
          src={puzzleConfig.lyrics.thumbnail}
          alt=""
          className="mx-auto mb-4"
        />
        {lyrics.map((line) => (
          <p key={line} className="pb-2">
            <Music4 className="inline" /> {line} <Music4 className="inline" />
          </p>
        ))}
      </div>
    </PuzzleWrapper>
  );
};
