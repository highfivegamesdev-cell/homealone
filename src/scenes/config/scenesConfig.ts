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
  cookies: {
    name: "cookies",
    answer: "COOKIES_SOLVED",
  },
  numberLock: {
    name: "numberLock",
    answer: "NUMBER_LOCK_SOLVED",
  },
} as const;

export const scenesConfig: SceneConfig[] = [
  {
    id: "scene1",
    puzzles: [
      { id: Puzzles.cookies.name, answer: Puzzles.cookies.answer },
      { id: Puzzles.numberLock.name, answer: Puzzles.numberLock.answer },
    ],
    next: "scene2",
  },
  {
    id: "scene2",
    puzzles: [{ id: Puzzles.cookies.name, answer: Puzzles.cookies.answer }],
    next: "exit",
  },
];
