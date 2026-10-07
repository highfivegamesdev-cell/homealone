import { useEffect, useRef } from "react";
import { Canvas, painters } from "headbreaker";
import { useGame } from "@/scenes/config/useGame";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { puzzleConfig } from "@/scenes/scene2/config";
import { useTailwindBreakpoint } from "@/lib/hooks/useTailwindBreakpoint";
import { canvasConfig } from "@/scenes/scene2/puzzles/houseJigsaw/config";

const canvasId = "house-jigsaw-puzzle";

export const JigsawGame = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { send } = useGame();
  const breakpoint = useTailwindBreakpoint();
  const { width, height, pieceSize } = canvasConfig[breakpoint];
  const puzzleImage = puzzleConfig.houseJigsaw.puzzle;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const image = new Image();
    image.onload = () => {
      if (!containerRef.current) return;

      const verticalPiecesCount = 6;
      const horizontalPiecesCount = Math.round(
        verticalPiecesCount * (image.naturalWidth / image.naturalHeight),
      );
      const canvas = new Canvas(canvasId, {
        width,
        height,
        image,
        pieceSize,
        proximity: 20,
        borderFill: 10,
        strokeWidth: 1.5,
        lineSoftness: 0.18,
        fixed: true,
        preventOffstageDrag: true,
        painter: new painters.Konva(),
      });

      canvas.adjustImagesToPuzzleHeight();
      canvas.autogenerate({ horizontalPiecesCount, verticalPiecesCount });
      canvas.shuffle(0.7);
      canvas.draw();

      let reported = false;
      canvas.onConnect(() => {
        if (!reported && canvas.puzzle.connected) {
          reported = true;
          send({
            type: GameEventTypes.solvePuzzle,
            puzzleId: Puzzles.houseJigsaw.name,
            answer: Puzzles.houseJigsaw.answer,
          });
        }
      });
    };
    image.src = puzzleImage;

    return () => {
      const canvasElement = document.getElementById(canvasId);
      if (canvasElement) canvasElement.innerHTML = "";
    };
  }, [height, pieceSize, puzzleImage, send, width]);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto">
      <div ref={containerRef} id={canvasId} className="relative" />
    </div>
  );
};
