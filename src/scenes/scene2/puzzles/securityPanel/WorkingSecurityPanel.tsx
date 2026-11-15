import { useState } from "react";

import { GameEventTypes } from "@/scenes/config/gameMachine";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene2/config";

const keypadButtons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  null,
  "0",
  null,
];

export const WorkingSecurityPanel = () => {
  const { send } = useGame();
  const [enteredCode, setEnteredCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const { code } = puzzleConfig.securityPanel;

  const pressDigit = (digit: string) => {
    setHasError(false);
    const nextCode = enteredCode + digit;
    if (nextCode.length < code.length) {
      setEnteredCode(nextCode);
      return;
    }

    if (nextCode === code) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.securityPanel.name,
        answer: Puzzles.securityPanel.answer,
      });
    } else {
      setHasError(true);
    }

    setEnteredCode("");
  };

  return (
    <div className="absolute left-1/2 top-1/2 h-full aspect-[936/881] -translate-x-1/2 -translate-y-1/2">
      <img
        src={puzzleConfig.securityPanel.closed}
        alt="Closed, working security panel"
        className="absolute inset-0 h-full w-full"
      />
      <div
        aria-live="polite"
        aria-label={hasError ? "Incorrect code" : "Entered code"}
        className="absolute left-[23%] top-[16%] w-[54%] text-center font-mono text-sm text-white md:text-lg"
      >
        {hasError ? "Incorrect code, please try again" : enteredCode}
      </div>
      <div className="absolute left-[33%] top-[39%] grid h-[33%] w-[34%] grid-cols-3 grid-rows-4">
        {keypadButtons.map((digit, index) =>
          digit ? (
            <button
              key={digit}
              type="button"
              aria-label={`Press ${digit}`}
              onClick={() => pressDigit(digit)}
              className="rounded-md bg-transparent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-yellow-300"
            />
          ) : (
            <span key={`empty-${index}`} aria-hidden="true" />
          ),
        )}
      </div>
    </div>
  );
};
