import {
  useDroppable,
} from "@dnd-kit/core";

export const DroppableDiv = ({ id, className }: { id: string; className?: string }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} className={className} />;
};
