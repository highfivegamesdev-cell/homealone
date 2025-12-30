import { useEffect, useState } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { puzzleConfig } from "@/scenes/scene1/config";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { Shape } from "./Shape";
import { stockingsConfig } from "./config";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

type Props = {
  close: () => void;
};

const correctOrder = ["blue", "red", "green", "orange"];

export const StockingGame = ({ close }: Props) => {
  const [slots, setSlots] = useState<string[]>([
    "green",
    "red",
    "orange",
    "blue",
  ]);
  const { send } = useGame();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (correctOrder.every((el, index) => el === slots[index])) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.stocking.name,
        answer: Puzzles.stocking.answer,
      });
    }
  }, [slots]);

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

    const overId = over.id as string;

    if (item !== overId) {
      setSlots((current) => {
        const oldIndex = current.indexOf(item);
        const newIndex = current.indexOf(overId);
        if (oldIndex === -1 || newIndex === -1) return current;
        return arrayMove(current, oldIndex, newIndex);
      });
    }
  };

  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.stocking.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex flex-row gap-4 items-center justify-center">
          <SortableContext items={slots}>
            {slots.map((id) => {
              const itemObj = stockingsConfig.find(
                (stocking) => stocking.id === id,
              );
              return (
                <Shape
                  key={id}
                  id={id}
                  backgroundUrl={itemObj?.backgroundUrl || ""}
                />
              );
            })}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId
            ? (() => {
                const itemObj = stockingsConfig.find(
                  (stocking) => stocking.id === activeId,
                );
                return (
                  <div className="relative z-50">
                    <Shape
                      id={activeId}
                      backgroundUrl={itemObj?.backgroundUrl || ""}
                    />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-md pointer-events-none" />
                  </div>
                );
              })()
            : null}
        </DragOverlay>
      </DndContext>
    </PuzzleWrapper>
  );
};
