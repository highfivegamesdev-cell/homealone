import type { Puzzle } from "@/scenes/config/scenesConfig";
import { useModal } from "@/lib/hooks/useModal";
import { Sudoku } from "@/scenes/scene1/puzzles/sudoku/Sudoku";
import {
  initialGrid,
  solutionGrid,
} from "@/scenes/scene1/puzzles/sudoku/config";
import { useGame } from "@/scenes/config/useGame";
import { PuzzleCompleted } from "@/components/display/PuzzleCompleted/PuzzleCompleted";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { puzzleConfig } from "@/scenes/scene1/config";
import { PuzzleModal } from "@/components/display/Modal/PuzzleModal";
import { PuzzleTrigger } from "@/components/action/Button/PuzzleTrigger";
import { SceneWrapper } from "@/components/layout/SceneWrapper";
import { useEffect } from "react";

type Props = {
  puzzles: Puzzle[];
};

export const Scene1 = ({ puzzles }: Props) => {
  const { state, send } = useGame();
  const {
    isModalOpen: isSudokuOpen,
    openModal: openSudoku,
    closeModal: closeSudoku,
  } = useModal();

  const { solvedPuzzles } = state.context;
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);

  const background = "/images/scenes/scene1/scene1-background.png"

  useEffect(() => {
    if (allPuzzlesSolved) {
      const timer = setTimeout(() => {
        send({ type: "NEXT" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [allPuzzlesSolved, send]);

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative">
        <PuzzleTrigger
          image={puzzleConfig.sudoku.thumbnail}
          alt="Open Sudoku"
          className="w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[70px] top-[62%] right-[20%]"
          action={openSudoku}
        />

        <PuzzleModal isPuzzleOpen={isSudokuOpen} closePuzzle={closeSudoku}>
          {solvedPuzzles[Puzzles.sudoku.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.sudoku.summary}
              image={puzzleConfig.sudoku.image}
              close={closeSudoku}
            />
          ) : (
            <Sudoku
              initialGrid={initialGrid}
              solutionGrid={solutionGrid}
              close={closeSudoku}
            />
          )}
        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
