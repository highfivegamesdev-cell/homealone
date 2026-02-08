import type { Puzzle } from "@/scenes/config/scenesConfig";
import { useGame } from "@/scenes/config/useGame";
import { SceneWrapper } from "@/components/layout/SceneWrapper";

type Props = {
  puzzles: Puzzle[];
};

export const Scene2 = ({ puzzles }: Props) => {
  const { state } = useGame();
  const { solvedPuzzles } = state.context;
  const allPuzzlesSolved = puzzles.every((p) => solvedPuzzles[p.id]);
  console.log("Scene2 - solvedPuzzles:", solvedPuzzles, allPuzzlesSolved);

  // useEffect(() => {
  //   if (allPuzzlesSolved) {
  //     const timer = setTimeout(() => {
  //       send({ type: "NEXT" });
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [allPuzzlesSolved, send]);

  const background = "/images/scenes/scene2/scene2-background.png";

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative"></div>
    </SceneWrapper>
  );
};
