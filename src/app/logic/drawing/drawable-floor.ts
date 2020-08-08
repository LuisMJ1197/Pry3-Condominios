import { Resource } from '../generalSettings/resource';
import { Drawable } from './drawable';
import { ObjectConfigurator } from 'src/app/view-logic/object-configurator';
import { jsonIgnore } from 'json-ignore';

export abstract class DrawableFloor extends Drawable {
    @jsonIgnore()
    protected backgroundCcolor: string = Resource.firstBackgroundColor;
    @jsonIgnore()
    protected borderColor: string = Resource.firstBorderColor;
    @jsonIgnore()
    protected selectedBorderColor: string = Resource.selectedBorderColor;
    number = 1;
    constructor(width: number, height: number, x: number, y: number) {
        super(width, height, x, y);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.calculateDxDy();
        ctx.save();
        if (this.number == 1) {
            ObjectConfigurator.configFirstFloor(ctx);
        } else {
            ObjectConfigurator.configSecondFloor(ctx);
        }
        ctx.fillRect(this.dx, this.dy, this.getPixelWidth(), this.getPixelHeight());
        ctx.restore();
    }
}
