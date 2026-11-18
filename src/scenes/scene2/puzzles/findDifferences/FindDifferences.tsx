import { useEffect, useState } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene2/config";
import { differencePoints } from "./config";

type Props = {
  close: () => void;
};

export const FindDifferences = ({ close }: Props) => {
  const { send } = useGame();
  const [foundDifferences, setFoundDifferences] = useState<Set<number>>(
    () => new Set(),
  );

  useEffect(() => {
    if (foundDifferences.size !== differencePoints.length) return;

    send({
      type: GameEventTypes.solvePuzzle,
      puzzleId: Puzzles.findDifferences.name,
      answer: Puzzles.findDifferences.answer,
    });
  }, [foundDifferences, send]);

  const markDifferenceFound = (index: number) => {
    setFoundDifferences((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const renderImage = (src: string, alt: string) => (
    <div className="relative aspect-[3/2] w-full max-w-[1000px]">
      <img src={src} alt={alt} className="block h-full w-full" />
      {differencePoints.map(({ x, y }, index) => {
        const isFound = foundDifferences.has(index);

        return (
          <button
            key={index}
            type="button"
            aria-label={`Difference ${index + 1}`}
            aria-pressed={isFound}
            onClick={() => markDifferenceFound(index)}
            className={`absolute z-10 size-[clamp(2rem,4vw,3.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-transparent transition-colors ${
              isFound
                ? "border-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.95)]"
                : "border-transparent"
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        );
      })}
    </div>
  );

  return (
    <PuzzleWrapper
      backgroundUrl={puzzleConfig.findDifferences.background}
      fullScreen
    >
      <button
        onClick={close}
        aria-label="Close puzzle"
        className="absolute right-4 top-2 z-20 text-4xl font-bold text-white hover:cursor-pointer"
      >
        ×
      </button>

      <div className="grid h-full grid-cols-1 items-center justify-items-center gap-2 overflow-auto p-2 pt-12 sm:grid-cols-2 sm:pt-2">
        {renderImage(puzzleConfig.findDifferences.puzzle1, "Puzzle 1")}
        {renderImage(puzzleConfig.findDifferences.puzzle2, "Puzzle 2")}
      </div>
    </PuzzleWrapper>
  );
};
