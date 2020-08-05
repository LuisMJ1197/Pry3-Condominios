import { ShapeDecorator } from './shape-decorator';
import { Resource } from '../generalSettings/resource';

export class BorderedShape extends ShapeDecorator {
    borderColor: string = Resource.firstBorderColor;
    selectedBorderColor: string = Resource.selectedBorderColor;

    draw(ctx: CanvasRenderingContext2D): BorderedShape {
        this.shape.draw(ctx);
        this.drawBorder(ctx);
        return this;
    }

    drawBorder(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.strokeStyle = this.borderColor;
        ctx.shadowColor = this.borderColor;
        if (this.shape.isSelected) {
            ctx.strokeStyle = this.selectedBorderColor;
            ctx.shadowColor = this.selectedBorderColor;
        }
        ctx.shadowBlur = 2;
        ctx.strokeRect(this.shape.getDX(), this.shape.getDY(), this.shape.getPixelWidth(), this.shape.getPixelHeight());
        ctx.restore();
    }
}
