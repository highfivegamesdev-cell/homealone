import { useEffect, useRef, useState } from "react";
import { Canvas, painters } from "headbreaker";
import { useGame } from "@/scenes/config/useGame";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { puzzleConfig } from "@/scenes/scene2/config";
import { jigsawConfig } from "@/scenes/scene2/puzzles/houseJigsaw/config";

const canvasId = "house-jigsaw-puzzle";

type CanvasSize = {
  width: number;
  height: number;
};

export const JigsawGame = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize | null>(null);
  const { send } = useGame();
  const puzzleImage = puzzleConfig.houseJigsaw.puzzle;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(([entry]) => {
      const nextSize = {
        width: Math.floor(entry.contentRect.width),
        height: Math.floor(entry.contentRect.height),
      };

      setCanvasSize((currentSize) =>
        currentSize?.width === nextSize.width &&
          currentSize.height === nextSize.height
          ? currentSize
          : nextSize,
      );
    });

    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvasContainer = canvasRef.current;
    if (!canvasContainer || !canvasSize?.width || !canvasSize.height) return;

    const image = new Image();
    let isActive = true;

    image.onload = () => {
      if (!isActive || !canvasRef.current) return;

      const verticalPiecesCount = jigsawConfig.verticalPiecesCount;
      const horizontalPiecesCount = Math.round(
        verticalPiecesCount * (image.naturalWidth / image.naturalHeight),
      );
      const pieceSize = Math.floor(
        Math.min(
          (canvasSize.width - 2 * jigsawConfig.canvasPadding) /
          (horizontalPiecesCount + 1),
          (canvasSize.height - 2 * jigsawConfig.canvasPadding) /
          (verticalPiecesCount + 1),
        ) * jigsawConfig.pieceSizeScale,
      );

      if (pieceSize < 1) {
        console.error("The jigsaw canvas is too small to fit its pieces.");
        return;
      }

      const canvas = new Canvas(canvasId, {
        width: canvasSize.width,
        height: canvasSize.height,
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
      const expectedPiecesCount = horizontalPiecesCount * verticalPiecesCount;
      if (canvas.puzzle.pieces.length !== expectedPiecesCount) {
        console.error(
          `Expected ${expectedPiecesCount} jigsaw pieces, but generated ${canvas.puzzle.pieces.length}.`,
        );
        return;
      }
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
    image.onerror = () => {
      console.error(`Failed to load the jigsaw image: ${puzzleImage}`);
    };
    image.src = puzzleImage;

    return () => {
      isActive = false;
      image.onload = null;
      image.onerror = null;
      canvasContainer.innerHTML = "";
    };
  }, [canvasSize, puzzleImage, send]);

  return (
    <div
      ref={viewportRef}
      className="flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div ref={canvasRef} id={canvasId} className="relative h-full w-full" />
    </div>
  );
};
