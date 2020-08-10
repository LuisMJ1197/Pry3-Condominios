import { IDrawer } from './idrawer';
import { IDrawable } from '../drawing/idrawable';
import { BorderDrawer } from './border-drawer';
import { Resource } from '../generalSettings/resource';
import { Dimention } from '../generalSettings/dimention';

export class IconDrawer extends BorderDrawer {
    draw(ctx: CanvasRenderingContext2D, drawable: IDrawable): void {
        super.draw(ctx, drawable);
        var width = Dimention.meterPixelSize;
        var height = Dimention.meterPixelSize;
        var centerX = drawable.getDX() + ((drawable.getPixelWidth() - width) / 2);
        var centerY = drawable.getDY() + ((drawable.getPixelHeight() - height) / 2);
        ctx.save();
        ctx.translate(centerX + width/2, centerY + height/2);
        ctx.rotate(drawable.getAngle() * (Math.PI / 180));
        ctx.translate(-centerX - width/2, -centerY - height/2);
        ctx.drawImage(Resource.icons[drawable.getKind()], centerX, centerY, width, height);
        ctx.restore();
    }
}
