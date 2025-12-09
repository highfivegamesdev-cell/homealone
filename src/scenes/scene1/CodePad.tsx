import { puzzleConfig } from "@/scenes/scene1/config";
import { OrnamentCode } from "./puzzles/ornamentCode/OrnamentCode";
import { PuzzleCompleted } from "@/components/display/PuzzleCompleted/PuzzleCompleted";

type Props = {
  wasSolved: boolean;
  wasUnlocked: boolean;
  close: () => void;
};

export const CodePad = ({ wasSolved, wasUnlocked, close }: Props) => {
  if (wasSolved) {
    return (
      <PuzzleCompleted
        text={puzzleConfig.ornamentCode.summary}
        image={puzzleConfig.ornamentCode.image}
        close={close}
      />
    );
  }

  if (!wasUnlocked) {
    return (
      <PuzzleCompleted
        text={puzzleConfig.ornamentCode.lockedText}
        image=""
        close={close}
      />
    );
  }

  return <OrnamentCode close={close} />;
};
