import type { Puzzle } from "@/scenes/config/scenesConfig";
import { useModal } from "@/lib/hooks/useModal";
import { Cookies } from "./puzzles/cookies/Cookies";
import { useGame } from "@/scenes/config/useGame";
import { PuzzleCompleted } from "@/components/display/PuzzleCompleted/PuzzleCompleted";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { puzzleConfig } from "@/scenes/scene1/config";
import { PuzzleModal } from "@/components/display/Modal/PuzzleModal";
import { PuzzleTrigger } from "@/components/action/Button/PuzzleTrigger";
import { SceneWrapper } from "@/components/layout/SceneWrapper";
import { useEffect } from "react";
import { Baubles } from "./Baubles";
import { CodePad } from "./puzzles/ornamentCode/CodePad";
import { StockingGame } from "./puzzles/stocking/StockingGame";
import { Lyrics } from "./puzzles/lyrics/Lyrics";

type Props = {
  puzzles: Puzzle[];
};

export const Scene1 = ({ puzzles }: Props) => {
  const { state, send } = useGame();
  const {
    isModalOpen: isCookiesOpen,
    openModal: openCookies,
    closeModal: closeCookies,
  } = useModal();

  const {
    isModalOpen: isOrnamentCodeOpen,
    openModal: openOrnamentCode,
    closeModal: closeOrnamentCode,
  } = useModal();

  const {
    isModalOpen: areLyricsOpen,
    openModal: openLyrics,
    closeModal: closeLyrics,
  } = useModal();

  const {
    isModalOpen: isStockingOpen,
    openModal: openStocking,
    closeModal: closeStocking,
  } = useModal();

  const { solvedPuzzles } = state.context;
  const unlockedCodePad = puzzles
    .filter((p) => p.id !== Puzzles.ornamentCode.name)
    .every((p) => solvedPuzzles[p.id]);
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);

  const background = "/images/scenes/scene1/scene1-background.png";

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
          image={puzzleConfig.cookies.thumbnail}
          alt="Open Cookies"
          className="w-[70px] lg:w-[80px] xl:w-[100px] 2xl:w-[120px] top-[78%] right-[56%]"
          action={openCookies}
        />

        <PuzzleTrigger
          image={puzzleConfig.ornamentCode.thumbnail}
          alt="Open Ornament Code"
          className="w-[70px] lg:w-[90px] xl:w-[110px] 2xl:w-[130px] top-[50%] right-[58%]"
          action={openOrnamentCode}
        />

        <PuzzleTrigger
          image={puzzleConfig.lyrics.thumbnail}
          alt="Open Lyrics"
          className="w-[70px] lg:w-[80px] xl:w-[100px] 2xl:w-[120px] top-[66%] right-[46%]"
          action={openLyrics}
        />

        <PuzzleTrigger
          image={puzzleConfig.stocking.thumbnail}
          alt="Open Stocking Game"
          className="w-[70px] lg:w-[90px] xl:w-[110px] 2xl:w-[130px] top-[30%] right-[7%]"
          action={openStocking}
        />

        <Baubles />

        <PuzzleModal isPuzzleOpen={isCookiesOpen} closePuzzle={closeCookies}>
          {solvedPuzzles[Puzzles.cookies.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.cookies.summary}
              image={puzzleConfig.cookies.image}
              close={closeCookies}
            />
          ) : (
            <Cookies close={closeCookies} />
          )}
        </PuzzleModal>

        <PuzzleModal
          isPuzzleOpen={isOrnamentCodeOpen}
          closePuzzle={closeOrnamentCode}
        >
          <CodePad
            wasSolved={solvedPuzzles[Puzzles.ornamentCode.name]}
            wasUnlocked={unlockedCodePad}
            close={closeOrnamentCode}
          />
        </PuzzleModal>

        <PuzzleModal isPuzzleOpen={areLyricsOpen} closePuzzle={closeLyrics}>
          <Lyrics close={closeLyrics} />
        </PuzzleModal>

        <PuzzleModal isPuzzleOpen={isStockingOpen} closePuzzle={closeStocking}>
          {solvedPuzzles[Puzzles.stocking.name] ? (
            <PuzzleCompleted
              text={puzzleConfig.stocking.summary}
              close={closeStocking}
            />
          ) : (
            <StockingGame close={closeStocking} />
          )}
        </PuzzleModal>
      </div>
    </SceneWrapper>
  );
};
