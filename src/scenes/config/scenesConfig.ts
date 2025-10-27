export type Puzzle = {
  id: string;
  answer: string;
  item?: string;
};

export type SceneConfig = {
  id: string;
  puzzles: Puzzle[];
  next?: string;
};

export const Puzzles = {
  sudoku: {
    name: "sudoku",
    answer: "SUDOKU_SOLVED",
  },
} as const;

export const scenesConfig: SceneConfig[] = [
  {
    id: "scene1",
    puzzles: [
      { id: Puzzles.sudoku.name, answer: Puzzles.sudoku.answer },
    ],
    next: "scene2",
  },
  {
    id: "scene2",
    puzzles: [
      { id: Puzzles.sudoku.name, answer: Puzzles.sudoku.answer },
    ],
    next: "exit",
  },
];
