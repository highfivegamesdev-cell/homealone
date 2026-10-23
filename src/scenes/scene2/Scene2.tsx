import type { Puzzle } from "@/scenes/config/scenesConfig";
import { useGame } from "@/scenes/config/useGame";
import { PuzzleCompleted } from "@/components/display/PuzzleCompleted/PuzzleCompleted";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { SceneWrapper } from "@/components/layout/SceneWrapper";
import { PuzzleModal } from "@/components/display/Modal/PuzzleModal";
import { PuzzleTrigger } from "@/components/action/Button/PuzzleTrigger";
import { useModal } from "@/lib/hooks/useModal";
import { puzzleConfig } from "./config";
import { HouseJigsaw } from "./puzzles/houseJigsaw/HouseJigsaw";
import { FindDifferences } from "./puzzles/findDifferences/FindDifferences";

type Props = {
  puzzles: Puzzle[];
};

export const Scene2 = ({ puzzles }: Props) => {
  void puzzles;

  const { state } = useGame();
  const {
    isModalOpen: isHouseJigsawOpen,
    openModal: openHouseJigsaw,
    closeModal: closeHouseJigsaw,
  } = useModal();
  const {
    isModalOpen: isFindDifferencesOpen,
    openModal: openFindDifferences,
    closeModal: closeFindDifferences,
  } = useModal();
  const isHouseJigsawSolved =
    state.context.solvedPuzzles[Puzzles.houseJigsaw.name];
  const isFindDifferencesSolved =
    state.context.solvedPuzzles[Puzzles.findDifferences.name];
  const background = "/images/scenes/scene2/scene2-background.png";

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative">
        <PuzzleTrigger
          image={puzzleConfig.houseJigsaw.thumbnail}
          alt="Open House Jigsaw"
          className="w-[90px] lg:w-[110px] xl:w-[130px] 2xl:w-[150px] top-[80%] left-[13%]"
          action={openHouseJigsaw}
        />

        <PuzzleTrigger
          image={puzzleConfig.findDifferences.thumbnail}
          alt="Open Find the Differences"
          className="absolute left-[39%] top-[34%] w-[90px] lg:w-[110px] xl:w-[130px] 2xl:w-[150px]"
          action={openFindDifferences}
        />

        <PuzzleModal
          isPuzzleOpen={isHouseJigsawOpen}
          closePuzzle={closeHouseJigsaw}
        >
          {isHouseJigsawSolved ? (
            <PuzzleCompleted
              message={puzzleConfig.houseJigsaw.summary}
              image={puzzleConfig.houseJigsaw.image}
              details={puzzleConfig.houseJigsaw.details}
              close={closeHouseJigsaw}
            />
          ) : (
            <HouseJigsaw close={closeHouseJigsaw} />
          )}
        </PuzzleModal>

        <PuzzleModal
          isPuzzleOpen={isFindDifferencesOpen}
          closePuzzle={closeFindDifferences}
        >
          {isFindDifferencesSolved ? (
            <PuzzleCompleted
              message={puzzleConfig.findDifferences.summary}
              details={puzzleConfig.findDifferences.details}
              close={closeFindDifferences}
            />
          ) : (
            <FindDifferences close={closeFindDifferences} />
          )}
        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
