import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  pointerWithin,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { useGame } from "@/scenes/config/useGame";
import { puzzleConfig } from "@/scenes/scene1/config";
import { DraggableImg } from "@/components/action/dragAndDrop/DraggableImg";
import { DroppableDiv } from "@/components/action/dragAndDrop/DroppableDiv";

type Props = {
  close: () => void;
};

const correctAnswer = 'pyramid';

export const ShadowGame = ({ close }: Props) => {
  const { state, send } = useGame();

  const [pool, setPool] = useState(state.context.inventory);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const item = active.id as string;
    setActiveId(null);

    if (!over) return;

    if (over.id === `slot-${correctAnswer}` && item === correctAnswer) {
      setPool((prev) => prev.filter((i) => i !== item));
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.shadow.name,
        answer: Puzzles.shadow.answer,
      });
    }
  };

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
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex justify-center gap-4 items-center mb-12">
            <div className="max-w-[50%] relative">
              <img src={puzzleConfig.shadow.shapeDrop} alt="Shape Drop" className="z-1" />
              <DroppableDiv id={`slot-${correctAnswer}`} className="bg-transparent w-[60px] lg:w-[80px] xl:w-[100px] h-[60px] lg:h-[80px] xl:h-[100px] absolute top-[56%] left-[45%] z-10" />
            </div>
          </div>

          <div id="pool" className="flex justify-center gap-6">
            {pool.map((id) => (
              <DraggableImg
                key={id}
                id={id}
                src={`/images/scenes/scene1/puzzles/shadow/item-${id}.png`}
                alt={`Item ${id}`}
                className="w-10 lg:w-[70px] xl:w-[70px] 2xl:w-[70px] cursor-grab select-none"
              />
            ))}
          </div>

          <DragOverlay>
            {activeId ? (
              <img
                src={`/images/scenes/scene1/puzzles/shadow/item-${activeId}.png`}
                alt={activeId}
                className="w-10 lg:w-[70px] xl:w-[70px] 2xl:w-[70px] opacity-75"
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div >
    </PuzzleWrapper >
  );
};
