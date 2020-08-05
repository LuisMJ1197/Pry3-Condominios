import { IDrawable } from './idrawable';
import { Resource } from '../generalSettings/resource';
import { Dimention } from '../generalSettings/dimention';
import { Drawable } from './drawable';
import { ObjectConfigurator } from 'src/app/view-logic/object-configurator';
import { ISnapshot } from '../memento/isnapshot';

export abstract class DrawableGround extends Drawable {
    protected backgroundCcolor: string = Resource.groundBackgroundColor;
    protected borderColor: string = Resource.groundBorderColor;
    protected showArea: boolean = false;

    constructor(protected size: number, x: number, y: number) {
        super(Math.sqrt(size), Math.sqrt(size), x, y);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ObjectConfigurator.configGround(ctx);
        ctx.fillRect(this.dx, this.dy, this.getPixelWidth(), this.getPixelHeight());
    }

    displayAreaText(ctx: CanvasRenderingContext2D) {
        ObjectConfigurator.configGroundText(ctx);
        ctx.fillText(this.size + "㎡", this.dx + this.getPixelWidth()/2, this.dy + this.getPixelHeight()/2); 
    }

    public setShowArea(showArea: boolean) {
        this.showArea = showArea;
    }
}
