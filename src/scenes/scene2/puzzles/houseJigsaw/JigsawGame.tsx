import { useEffect, useRef } from "react";
import { Canvas, painters } from "headbreaker";
import { puzzleConfig } from "@/scenes/scene2/config";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useTailwindBreakpoint } from "@/lib/hooks/useTailwindBreakpoint";
import { canvasConfig } from "@/scenes/scene2/puzzles/houseJigsaw/config";
import type { JigsawPiece } from "headbreaker";

const isSingleConnectedBlock = (pieces: readonly JigsawPiece[]) => {
  if (pieces.length === 0) return false;

  const visited = new Set<JigsawPiece>();
  const pending = [pieces[0]];

  while (pending.length > 0) {
    const piece = pending.pop();
    if (!piece || visited.has(piece)) continue;

    visited.add(piece);
    pending.push(
      ...piece.presentConnections.filter((connectedPiece) => !visited.has(connectedPiece)),
    );
  }

  return visited.size === pieces.length;
};

export const JigsawGame = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { send } = useGame();
  const id = "jigsaw-puzzle";

  const breakpoint = useTailwindBreakpoint();

  const width = canvasConfig[breakpoint].width;
  const height = canvasConfig[breakpoint].height;
  const pieceSize = canvasConfig[breakpoint].pieceSize;

  useEffect(() => {
    if (!containerRef.current) return;

    const img = new Image();
    img.src = puzzleConfig.houseJigsaw.puzzle;

    img.onload = () => {
      const horizontalPiecesCount = 6;
      const verticalPiecesCount = 6;

      const canvas = new Canvas(id, {
        width: width,
        height: height,
        image: img,
        pieceSize: pieceSize,
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
      canvas.attachSolvedValidator();
      canvas.shuffle(0.7);
      canvas.draw();

      let reported = false;
      canvas.onConnect(() => {
        canvas.puzzle.updateValidity();

        const pieces = canvas.puzzle.pieces;
        const expectedPiecesCount = horizontalPiecesCount * verticalPiecesCount;
        if (
          !reported &&
          pieces.length === expectedPiecesCount &&
          canvas.puzzle.valid &&
          isSingleConnectedBlock(pieces)
        ) {
          reported = true;
          send({
            type: GameEventTypes.solvePuzzle,
            puzzleId: Puzzles.houseJigsaw.name,
            answer: Puzzles.houseJigsaw.answer,
          });
        }
      });
    };

    return () => {
      const node = document.getElementById(id);
      if (node) node.innerHTML = "";
    };
  }, []);

  return (
    <div className="bg-taupe-300 w-full h-full flex items-center justify-center overflow-auto">
      <div ref={containerRef} id={id} className="relative" />
    </div>
  );
};
