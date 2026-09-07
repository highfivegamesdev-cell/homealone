import type { Puzzle } from "@/scenes/config/scenesConfig";
import { SceneWrapper } from "@/components/layout/SceneWrapper";

type Props = {
  puzzles: Puzzle[];
};

export const Scene2 = ({ puzzles }: Props) => {
  void puzzles;

  const background = "/images/scenes/scene2/scene2-background.png";

  return (
    <SceneWrapper backgroundUrl={background}>
      <div className="w-full h-full relative"></div>
    </SceneWrapper>
  );
};
