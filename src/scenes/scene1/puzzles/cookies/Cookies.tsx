import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene1/config";

type Props = {
  close: () => void;
};

type FormData = {
  cookie1: string;
  cookie2: string;
  cookie3: string;
  cookie4: string;
};

export const Cookies = ({ close }: Props) => {
  const { send } = useGame();

  const { register, handleSubmit, watch } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  const cookie1 = watch("cookie1");
  const cookie2 = watch("cookie2");
  const cookie3 = watch("cookie3");
  const cookie4 = watch("cookie4");

  useEffect(() => {
    console.log(cookie1, cookie2, cookie3, cookie4);
    const isSolved =
      cookie1?.toLowerCase() === "t" &&
      cookie2?.toLowerCase() === "r" &&
      cookie3?.toLowerCase() === "a" &&
      cookie4?.toLowerCase() === "p";

    if (isSolved) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.cookies.name,
        answer: Puzzles.cookies.answer,
      });
    }
  }, [cookie1, cookie2, cookie3, cookie4, send]);

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

        <div className="mt-12">
          <form onSubmit={onSubmit} className="flex gap-6 justify-center">
            <div className="flex flex-col gap-4 items-center">
              <img
                src="/images/scenes/scene1/puzzles/cookies/cookie-1.png"
                alt="Cookie 1"
              />
              <input
                type="text"
                {...register("cookie1")}
                className="p-2 w-10 text-xl text-center border-0 border-b"
                maxLength={1}
              />
            </div>

            <div className="flex flex-col gap-4 items-center">
              <img
                src="/images/scenes/scene1/puzzles/cookies/cookie-2.png"
                alt="Cookie 2"
              />
              <input
                type="text"
                {...register("cookie2")}
                className="p-2 w-10 text-xl text-center border-0 border-b"
                maxLength={1}
              />
            </div>

            <div className="flex flex-col gap-4 items-center">
              <img
                src="/images/scenes/scene1/puzzles/cookies/cookie-3.png"
                alt="Cookie 3"
              />
              <input
                type="text"
                {...register("cookie3")}
                className="p-2 w-10 text-xl text-center border-0 border-b"
                maxLength={1}
              />
            </div>

            <div className="flex flex-col gap-4 items-center">
              <img
                src="/images/scenes/scene1/puzzles/cookies/cookie-4.png"
                alt="Cookie 4"
              />
              <input
                type="text"
                {...register("cookie4")}
                className="p-2 w-10 text-xl text-center border-0 border-b"
                maxLength={1}
              />
            </div>
          </form>
        </div>
      </div>
    </PuzzleWrapper>
  );
};
