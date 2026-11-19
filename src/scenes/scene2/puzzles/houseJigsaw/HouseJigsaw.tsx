import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { puzzleConfig } from "@/scenes/scene2/config";
import { JigsawGame } from "@/scenes/scene2/puzzles/houseJigsaw/JigsawGame";

type Props = {
  close: () => void;
};

export const HouseJigsaw = ({ close }: Props) => {
  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.houseJigsaw.background}>
      <button
        onClick={close}
        aria-label="Close jigsaw puzzle"
        className="absolute right-[3%] top-[1%] z-20 text-4xl font-bold text-black hover:cursor-pointer"
      >
        ×
      </button>

      <JigsawGame />
    </PuzzleWrapper>
  );
};
