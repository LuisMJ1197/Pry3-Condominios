import { IDrawer } from './idrawer';
import { IDrawable } from '../drawing/idrawable';
import { Dimention } from '../generalSettings/dimention';
import { Resource } from '../generalSettings/resource';

export class BorderDrawer implements IDrawer {
    draw(ctx: CanvasRenderingContext2D, drawable: IDrawable): void {
        ctx.save();
        ctx.lineWidth = Dimention.borderSize;
        ctx.strokeStyle = Resource.roomBorderColor;
        ctx.shadowColor = Resource.roomBorderColor;
        if (drawable.getSelected()) {
            ctx.strokeStyle = Resource.selectedBorderColor;
            ctx.shadowColor = Resource.selectedBorderColor;
        }
        ctx.shadowBlur = 2;
        ctx.strokeRect(drawable.getDX(), drawable.getDY(), drawable.getPixelWidth(), drawable.getPixelHeight());
        ctx.restore();
    }
}
