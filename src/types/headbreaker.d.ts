declare module "headbreaker" {
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
    };

    adjustImagesToPuzzleHeight(): void;
    autogenerate(options: {
      horizontalPiecesCount: number;
      verticalPiecesCount: number;
    }): void;
    shuffle(factor: number): void;
    draw(): void;
    onConnect(callback: () => void): void;
  }

  export const painters: {
    Konva: new () => object;
  };
}
