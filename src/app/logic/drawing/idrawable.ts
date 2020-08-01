export interface IDrawable {
    draw(ctx: CanvasRenderingContext2D): void;
    genLimits(): void;
}
