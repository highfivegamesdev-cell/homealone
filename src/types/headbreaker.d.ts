declare module "headbreaker" {
  export type JigsawPiece = {
    readonly presentConnections: readonly JigsawPiece[];
  };

  type CanvasOptions = {
    width: number;
    height: number;
    image: HTMLImageElement;
    pieceSize: number;
    proximity: number;
    borderFill: number;
    strokeWidth: number;
    lineSoftness: number;
    fixed: boolean;
    preventOffstageDrag: boolean;
    painter: object;
  };

  export class Canvas {
    constructor(id: string, options: CanvasOptions);

    readonly puzzle: {
      readonly connected: boolean;
      readonly valid: boolean;
      readonly pieces: readonly JigsawPiece[];
      updateValidity(): void;
    };

    adjustImagesToPuzzleHeight(): void;
    autogenerate(options: {
      horizontalPiecesCount: number;
      verticalPiecesCount: number;
    }): void;
    attachSolvedValidator(): void;
    shuffle(factor: number): void;
    draw(): void;
    onConnect(callback: () => void): void;
  }

  export const painters: {
    Konva: new () => object;
  };
}
