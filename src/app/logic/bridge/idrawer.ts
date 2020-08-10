import { IDrawable } from '../drawing/idrawable';

export interface IDrawer {
    draw(ctx: CanvasRenderingContext2D, drawable: IDrawable): void;
}
