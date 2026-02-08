import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene1/config";
import { Shape } from "@/components/action/dragAndDrop/Shape";
import { ShapeDrop } from "@/components/action/dragAndDrop/ShapeDrop";
import { SortableContext } from "@dnd-kit/sortable";

type Props = {
  close: () => void;
};

const correctAnswer = 'pyramid';

export const ShadowGame = ({ close }: Props) => {
  const { state, send } = useGame();

  const [pool, setPool] = useState(state.context.inventory);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const item = active.id as string;
    setActiveId(null);

    if (!over) {
      return;
    }

    if (item === correctAnswer) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.shadow.name,
        answer: Puzzles.shadow.answer,
      });
    }
  };

  console.log("ShadowGame state:", state.context.inventory);

  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.shadow.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>
      <div className="p-4 w-[70%] mx-auto text-center">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex flex-row gap-4 items-center justify-center">
            <ShapeDrop id={`slot-${correctAnswer}`}>
              <Shape
                key={correctAnswer}
                id={correctAnswer}
                backgroundUrl={puzzleConfig.shadow.shapeDrop}
              />
            </ShapeDrop>
          </div>

          <div
            id="pool"
            className="flex flex-wrap gap-2 min-w-[180px] min-h-[120px] p-4 border-2 border-gray-300 rounded-lg mb-6 empty:invisible"
          >
            <SortableContext items={pool}>
              {pool.map((id) => {
                return (
                  <Shape
                    key={id}
                    id={id}
                    backgroundUrl={`/images/scenes/scene1/puzzles/shadow/item-${id}.png`}
                  />
                );
              })}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeId
              ? (() => {
                return (
                  <div className="relative z-50">
                    <Shape
                      id={activeId}
                      backgroundUrl={`/images/scenes/scene1/puzzles/shadow/item-${activeId}.png`}
                    />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-md pointer-events-none" />
                  </div>
                );
              })()
              : null}
          </DragOverlay>
        </DndContext>
      </div>
    </PuzzleWrapper>
  );
};
