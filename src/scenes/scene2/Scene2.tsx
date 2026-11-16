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
import { Phone } from "./puzzles/phone/Phone";
import { SecurityPanel } from "./puzzles/securityPanel/SecurityPanel";
import { GameCompleted } from "./GameCompleted";

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
  const {
    isModalOpen: isPhoneOpen,
    openModal: openPhone,
    closeModal: closePhone,
  } = useModal();
  const {
    isModalOpen: isSecurityPanelOpen,
    openModal: openSecurityPanel,
    closeModal: closeSecurityPanel,
  } = useModal();
  const isHouseJigsawSolved =
    state.context.solvedPuzzles[Puzzles.houseJigsaw.name];
  const isFindDifferencesSolved =
    state.context.solvedPuzzles[Puzzles.findDifferences.name];
  const isPhoneSolved = state.context.solvedPuzzles[Puzzles.phone.name];
  const isSecurityPanelSolved =
    state.context.solvedPuzzles[Puzzles.securityPanel.name];
  const background = "/images/scenes/scene2/scene2-background.jpeg";

  if (isSecurityPanelSolved) {
    return <GameCompleted />;
  }

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

        <PuzzleTrigger
          image={puzzleConfig.phone.thumbnail}
          alt="Open Phone"
          className="left-[70%] top-[55%] w-[90px] lg:w-[110px] xl:w-[130px] 2xl:w-[150px]"
          action={openPhone}
        />

        <PuzzleTrigger
          image={puzzleConfig.securityPanel.thumbnail}
          alt="Open Security Panel"
          className="left-[9.5%] top-[32%] w-[35px] lg:w-[45px] xl:w-[55px]"
          action={openSecurityPanel}
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
              image={puzzleConfig.findDifferences.item}
              details={puzzleConfig.findDifferences.details}
              close={closeFindDifferences}
            />
          ) : (
            <FindDifferences close={closeFindDifferences} />
          )}
        </PuzzleModal>

        <PuzzleModal isPuzzleOpen={isPhoneOpen} closePuzzle={closePhone}>
          {isPhoneSolved ? (
            <PuzzleCompleted
              message={puzzleConfig.phone.summary}
              details={puzzleConfig.phone.details}
              close={closePhone}
            />
          ) : (
            <Phone close={closePhone} />
          )}
        </PuzzleModal>

        <PuzzleModal
          isPuzzleOpen={isSecurityPanelOpen}
          closePuzzle={closeSecurityPanel}
        >
          {isSecurityPanelSolved ? (
            <PuzzleCompleted
              message={puzzleConfig.securityPanel.summary}
              close={closeSecurityPanel}
            />
          ) : (
            <SecurityPanel close={closeSecurityPanel} />
          )}
        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
