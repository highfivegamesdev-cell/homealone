import { useEffect, useState } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene2/config";
import { dialButtons } from "./config";

type Props = {
  close: () => void;
};

export const Phone = ({ close }: Props) => {
  const { send } = useGame();
  const [enteredNumber, setEnteredNumber] = useState("");
  const [hasError, setHasError] = useState(false);
  const { code } = puzzleConfig.phone;

  console.log("enteredNumber:", enteredNumber);

  useEffect(() => {
    if (enteredNumber !== code) return;

    send({
      type: GameEventTypes.solvePuzzle,
      puzzleId: Puzzles.phone.name,
      answer: Puzzles.phone.answer,
    });
  }, [code, enteredNumber, send]);

  const dialDigit = (digit: string) => {
    const nextNumber =
      enteredNumber.length >= code.length ? digit : enteredNumber + digit;

    if (nextNumber.length === code.length && nextNumber !== code) {
      setEnteredNumber("");
      setHasError(true);
      return;
    }

    setEnteredNumber(nextNumber);
    setHasError(false);
  };

  return (
    <PuzzleWrapper backgroundUrl="">
      <img
        src={puzzleConfig.phone.puzzle}
        alt="Red rotary phone"
        className="absolute inset-0 h-full w-full object-fill"
      />

      <button
        onClick={close}
        aria-label="Close puzzle"
        className="absolute right-[3%] top-[1%] z-20 text-4xl font-bold text-white hover:cursor-pointer"
      >
        ×
      </button>

      <div
        aria-live="polite"
        className="absolute left-[3%] top-[3%] z-10 rounded bg-black/70 px-3 py-2 font-mono text-lg text-white"
      >
        {hasError ? "Wrong number" : enteredNumber || "Dial the number"}
      </div>

      {dialButtons.map(({ digit, x, y }) => (
        <button
          key={`${digit}-${x}-${y}`}
          type="button"
          aria-label={`Dial ${digit}`}
          onClick={() => dialDigit(digit)}
          className="absolute z-10 aspect-square w-[4%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-transparent transition-colors hover:border-yellow-200 focus-visible:border-yellow-300 focus-visible:outline-none"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
    </PuzzleWrapper>
  );
};
