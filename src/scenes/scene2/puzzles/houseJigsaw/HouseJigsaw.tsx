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
        aria-label="Close puzzle"
        className="absolute top-[1%] right-[3%] z-10 text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>

      <JigsawGame />
    </PuzzleWrapper>
  );
};
