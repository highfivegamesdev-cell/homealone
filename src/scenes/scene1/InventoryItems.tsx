import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useGame } from "@/scenes/config/useGame";
import { GameEventTypes } from "@/scenes/config/gameMachine";

type InventoryItem = {
  id: string;
  fileName: string;
  className: string;
};

const items: InventoryItem[] = [
  {
    id: "ice-cream",
    fileName: "item-ice-cream",
    className:
      "w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px] top-[80%] right-[17%]",
  },
  {
    id: "paper-plane",
    fileName: "item-paper-plane",
    className:
      "w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px] top-[83%] right-[77%]",
  },
  {
    id: "pyramid",
    fileName: "item-pyramid",
    className:
      "w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px] top-[84%] right-[37%]",
  },
  {
    id: "toy-car",
    fileName: "item-toy-car",
    className:
      "w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px] top-[70%] right-[90%]",
  },
];

export const InventoryItems = () => {
  const { send } = useGame();

  const [visibleItems, setVisibleItems] = useState<InventoryItem[]>(items);

  const handleCollectItem = (itemId: string) => {
    send({
      type: GameEventTypes.addItemToInventory,
      itemId,
    });

    const updatedItems = visibleItems.filter((item) => item.id !== itemId);
    setVisibleItems(updatedItems);
  };

  const baseClass =
    "absolute hover:cursor-pointer border border-transparent hover:border-teal-200 duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.8)] transition";

  return (
    <div>
      {visibleItems.map((item) => (
        <img
          key={item.id}
          src={`/images/scenes/scene1/puzzles/shadow/${item.fileName}.png`}
          className={twMerge(baseClass, item.className)}
          onClick={() => handleCollectItem(item.id)}
        />
      ))}
    </div>
  );
};
