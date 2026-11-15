import { SceneWrapper } from "@/components/layout/SceneWrapper";

export const GameCompleted = () => (
  <SceneWrapper backgroundUrl="/images/scenes/scene2/scene2-background.png">
    <section
      aria-labelledby="scene-completed-title"
      className="flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-950 p-8 text-center text-white"
    >
      <h1 id="scene-completed-title" className="text-3xl font-bold md:text-5xl">
        All puzzles solved!
      </h1>
      <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed border-white/50 bg-black/20 text-lg text-white/70 md:text-2xl">
        Ending image coming soon
      </div>
      <p className="text-lg md:text-2xl">You made it through the house.</p>
    </section>
  </SceneWrapper>
);
