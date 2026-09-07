import { createMachine, assign } from "xstate";

import { scenesConfig } from "@/scenes/config/scenesConfig";

export type GameContext = {
  solvedPuzzles: Record<string, boolean>;
  inventory: string[];
};

export const GameEventTypes = {
  solvePuzzle: "SOLVE_PUZZLE",
  addItemToInventory: "ADD_ITEM_TO_INVENTORY",
} as const;

export type GameEvent =
  | {
      type: typeof GameEventTypes.solvePuzzle;
      puzzleId: string;
      answer?: string;
    }
  | {
      type: typeof GameEventTypes.addItemToInventory;
      itemId: string;
    };

export const createGameMachine = () => {
  return createMachine({
    id: "game",
    initial: "playing",
    types: {} as {
      context: GameContext;
    },
    context: {
      solvedPuzzles: {},
      inventory: [],
    },
    states: {
      playing: {
        on: {
          SOLVE_PUZZLE: {
            actions: assign(({ context, event }) => {
              if (event.type !== GameEventTypes.solvePuzzle) return context;

              const puzzle = scenesConfig
                .flatMap((scene) => scene.puzzles)
                .find((entry) => entry.id === event.puzzleId);

              if (!puzzle || event.answer !== puzzle.answer) return context;

              return {
                ...context,
                solvedPuzzles: {
                  ...context.solvedPuzzles,
                  [puzzle.id]: true,
                },
              };
            }),
          },
          ADD_ITEM_TO_INVENTORY: {
            actions: assign(({ context, event }) => {
              if (event.type !== GameEventTypes.addItemToInventory)
                return context;
              return {
                ...context,
                inventory: [...context.inventory, event.itemId],
              };
            }),
          },
        },
      },
    },
  });
};
