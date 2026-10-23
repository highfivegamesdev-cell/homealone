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
    <div className="relative w-full shrink-0 md:w-[calc(50%-0.25rem)]">
      <img src={src} alt={alt} className="block h-auto w-full" />
      {differencePoints.map(({ x, y }, index) => {
        const isFound = foundDifferences.has(index);

        return (
          <button
            key={index}
            type="button"
            aria-label={`Difference ${index + 1}`}
            aria-pressed={isFound}
            onClick={() => markDifferenceFound(index)}
            className={`absolute z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-transparent transition-colors ${isFound
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
    <PuzzleWrapper backgroundUrl={puzzleConfig.findDifferences.background}>
      <button
        onClick={close}
        aria-label="Close puzzle"
        className="absolute right-[3%] top-[1%] z-20 text-4xl font-bold text-black hover:cursor-pointer"
      >
        ×
      </button>

      <div className="flex h-full flex-col items-center gap-3 overflow-y-auto p-4 pt-12 md:flex-row md:justify-center md:gap-2 md:pt-4">
        {renderImage(puzzleConfig.findDifferences.puzzle1, "Puzzle 1")}
        {renderImage(puzzleConfig.findDifferences.puzzle2, "Puzzle 2")}
      </div>
    </PuzzleWrapper>
  );
};
