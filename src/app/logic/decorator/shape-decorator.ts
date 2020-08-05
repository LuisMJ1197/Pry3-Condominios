import { IDrawable } from '../drawing/idrawable';

export abstract class ShapeDecorator implements IDrawable {
    shape: IDrawable;
    isSelected: boolean;
    constructor(shape: IDrawable) {
        this.shape = shape;
    }

    getWidth(): number {
        return this.shape.getWidth();
    }
    getHeight(): number {
        return this.shape.getHeight();
    }

    draw(ctx: CanvasRenderingContext2D): ShapeDecorator {
        this.shape.draw(ctx);
        return this;
    }

    getPixelWidth(): number {
        return this.shape.getPixelWidth();
    }

    getPixelHeight(): number {
        return this.shape.getPixelHeight();
    }

    getDX(): number {
        return this.shape.getDX();
    }

    getDY(): number {
        return this.shape.getDY();
    }
}
