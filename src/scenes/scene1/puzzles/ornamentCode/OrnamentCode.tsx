import { useState, useEffect } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene1/config";
import { SOLUTION, padConfig, codeDisplayColors } from "./config";

type Props = {
  close: () => void;
};

export const OrnamentCode = ({ close }: Props) => {
  const [inputCode, setInputCode] = useState<number[]>([]);
  const [hasError, setHasError] = useState(false);

  const { send } = useGame();

  const checkSolution = (code: number[]) => {
    return SOLUTION.every((num, index) => num === code[index]);
  };

  useEffect(() => {
    if (inputCode.length === 3) {
      if (checkSolution(inputCode)) {
        setTimeout(() => {
          send({
            type: GameEventTypes.solvePuzzle,
            puzzleId: Puzzles.ornamentCode.name,
            answer: Puzzles.ornamentCode.answer,
          });
        }, 600);
      } else {
        setTimeout(() => {
          setInputCode([]);
          setHasError(true);
        }, 600);
      }
    }
  }, [inputCode]);

  const handlePadPress = (value: number | undefined) => {
    if (value === undefined) return;

    setHasError(false);
    const newInputCode = [...inputCode, value];
    setInputCode(newInputCode);
  };

  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.cookies.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>
      <div className="p-4 w-[70%] mx-auto text-center">
        <p>
          Oh no! The baby gate locked when I ran down here! What was the code
          again?
        </p>

        <div className="mt-12 flex flex-col items-center">
          <div className="p-8 bg-amber-50 rounded-lg border-2">
            <div className="bg-neutral-600 h-16 rounded-lg border-4 border-white text-white flex items-center justify-center gap-4 text-xl font-bold shadow-[inset_4px_4px_8px_rgba(0,0,0,0.45)]">
              {hasError ? (
                <p>Error!</p>
              ) : (
                inputCode.map((code, index) => (
                  <p className={`orbitron ${codeDisplayColors[index]}`}>{code}</p>
                ))
              )}
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {padConfig.map((pad) => (
                <button
                  key={pad.key}
                  className="px-6 py-2 bg-stone-300 rounded flex items-center justify-center text-2xl font-bold hover:bg-gray-400 border-2 hover:cursor-pointer shadow-[2px_2px_4px_rgba(0,0,0,0.25),-2px_-2px_4px_rgba(255,255,255,0.6)]"
                  onClick={() => handlePadPress(pad.value)}
                >
                  {pad.key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PuzzleWrapper>
  );
};
