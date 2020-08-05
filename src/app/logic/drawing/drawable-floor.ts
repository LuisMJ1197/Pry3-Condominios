import { Resource } from '../generalSettings/resource';
import { Drawable } from './drawable';
import { Dimention } from '../generalSettings/dimention';
import { ObjectConfigurator } from 'src/app/view-logic/object-configurator';
import { ISnapshot } from '../memento/isnapshot';

export abstract class DrawableFloor extends Drawable {
    protected backgroundCcolor: string = Resource.firstBackgroundColor;
    protected borderColor: string = Resource.firstBorderColor;
    protected selectedBorderColor: string = Resource.selectedBorderColor;
    rol: string = "firstFloor";

    constructor(width: number, height: number, x: number, y: number) {
        super(width, height, x, y);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.calculateDxDy();
        ctx.save();
        if (this.rol == "firstFloor") {
            ObjectConfigurator.configFirstFloor(ctx);
        } else {
            ObjectConfigurator.configSecondFloor(ctx);
        }
        ctx.fillRect(this.dx, this.dy, this.getPixelWidth(), this.getPixelHeight());
        ctx.restore();
    }
}
