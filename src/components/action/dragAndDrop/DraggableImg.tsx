import {
  useDraggable,
} from "@dnd-kit/core";

export const DraggableImg = ({ id, src, alt, className }: { id: string; src: string; alt: string; className?: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return <img ref={setNodeRef} src={src} alt={alt} className={className} {...attributes} {...listeners} />;
};
