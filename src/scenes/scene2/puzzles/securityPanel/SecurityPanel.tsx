import { useState } from "react";

import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { useGame } from "@/scenes/config/useGame";
import { ClosedSecurityPanel } from "./ClosedSecurityPanel";
import { OpenedSecurityPanel } from "./OpenedSecurityPanel";
import { WorkingSecurityPanel } from "./WorkingSecurityPanel";

type Props = {
  close: () => void;
};

type PanelState = "closed" | "opened" | "working";

export const SecurityPanel = ({ close }: Props) => {
  const { state } = useGame();
  const [panelState, setPanelState] = useState<PanelState>("closed");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [hint, setHint] = useState("");
  const hasScrewdriver = state.context.inventory.includes("screwdriver");

  const handleClosedPanelClick = () => {
    if (!hasScrewdriver) {
      setHint("You need something to help you pry open the cover");
      return;
    }

    setHint(
      "You decided to use the screwdriver you found to pry open the cover",
    );
    setPanelState("opened");
  };

  const handleFirstPasswordChange = (value: string) => {
    setFirstPassword(value);
    if (
      value.toLowerCase() === "happy" &&
      secondPassword.toLowerCase() === "holidays"
    ) {
      setHint("You insert the batteries, and the panel starts working.");
      setPanelState("working");
    }
  };

  const handleSecondPasswordChange = (value: string) => {
    setSecondPassword(value);
    if (
      firstPassword.toLowerCase() === "happy" &&
      value.toLowerCase() === "holidays"
    ) {
      setHint("You insert the batteries, and the panel starts working.");
      setPanelState("working");
    }
  };

  return (
    <PuzzleWrapper backgroundUrl="">
      <button
        onClick={close}
        aria-label="Close security panel"
        className="absolute right-[3%] top-[1%] z-20 text-4xl font-bold text-black hover:cursor-pointer"
      >
        ×
      </button>

      <div className="absolute inset-0">
        {panelState === "closed" && (
          <ClosedSecurityPanel
            hasScrewdriver={hasScrewdriver}
            onClick={handleClosedPanelClick}
          />
        )}
        {panelState === "opened" && (
          <OpenedSecurityPanel
            firstPassword={firstPassword}
            secondPassword={secondPassword}
            onFirstPasswordChange={handleFirstPasswordChange}
            onSecondPasswordChange={handleSecondPasswordChange}
          />
        )}
        {panelState === "working" && <WorkingSecurityPanel setHint={setHint} />}
      </div>
      {hint && (
        <p
          role="status"
          className="absolute left-1/2 top-[4%] z-10 -translate-x-1/2 rounded bg-black/80 px-3 py-2 text-center text-sm text-white md:text-base"
        >
          {hint}
        </p>
      )}
    </PuzzleWrapper>
  );
};
