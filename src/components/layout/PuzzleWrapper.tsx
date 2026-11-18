import type { PropsWithChildren } from "react";

interface Props {
  backgroundUrl: string;
  fullScreen?: boolean;
}

export const PuzzleWrapper = ({
  backgroundUrl,
  children,
  fullScreen = false,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={
        fullScreen
          ? "relative h-dvh w-screen max-h-dvh max-w-[2000px] overflow-hidden bg-cover bg-center"
          : "w-[400px] h-[240px] md:w-[700px] md:h-[420px] lg:w-[1000px] lg:h-[600px] 3xl:w-[1600px] 3xl:h-[960px] relative bg-cover bg-center overflow-hidden"
      }
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
        backgroundColor: backgroundUrl
          ? undefined
          : fullScreen
            ? "black"
            : "white",
      }}
    >
      {children}
    </div>
  );
};
