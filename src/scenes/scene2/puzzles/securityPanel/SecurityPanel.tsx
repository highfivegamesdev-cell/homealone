import { useState } from "react";

import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene2/config";

type Props = {
  close: () => void;
};

export const SecurityPanel = ({ close }: Props) => {
  const { state } = useGame();
  const [isOpened, setIsOpened] = useState(false);
  const hasScrewdriver = state.context.inventory.includes("screwdriver");

  return (
    <PuzzleWrapper backgroundUrl="">
      <button
        onClick={close}
        aria-label="Close security panel"
        className="absolute right-[3%] top-[1%] z-20 text-4xl font-bold text-black hover:cursor-pointer"
      >
        ×
      </button>

      <button
        type="button"
        aria-label={
          isOpened
            ? "Security panel opened"
            : hasScrewdriver
              ? "Open security panel with screwdriver"
              : "Security panel is not working"
        }
        aria-pressed={isOpened}
        disabled={!hasScrewdriver || isOpened}
        onClick={() => setIsOpened(true)}
        className="absolute inset-0 h-full w-full disabled:cursor-not-allowed"
      >
        <img
          src={
            isOpened
              ? puzzleConfig.securityPanel.opened
              : puzzleConfig.securityPanel.closed
          }
          alt={isOpened ? "Opened security panel" : "Closed security panel"}
          className="h-full w-full object-contain"
        />
      </button>
    </PuzzleWrapper>
  );
};