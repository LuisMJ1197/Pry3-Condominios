import { BorderedShape } from './bordered-shape';
import { Resource } from '../generalSettings/resource';
import { Dimention } from '../generalSettings/dimention';

export class IconShape extends BorderedShape {

    draw(ctx: CanvasRenderingContext2D): IconShape {
        super.draw(ctx);
        return this;
    }
    
    drawIcon(ctx: CanvasRenderingContext2D, kind: number, width: number = Dimention.meterPixelSize, height: number = Dimention.meterPixelSize, angle: number = 0): void {
        var centerX = this.shape.getDX() + ((this.getPixelWidth() - width) / 2);
        var centerY = this.shape.getDY() + ((this.getPixelHeight() - height) / 2);
        ctx.save();
        ctx.translate(centerX + width/2, centerY + height/2);
        ctx.rotate(angle * (Math.PI / 180));
        ctx.translate(-centerX-width/2, -centerY-height/2);
        ctx.drawImage(Resource.icons[kind], centerX, centerY, width, height);
        ctx.restore();
    }
}
