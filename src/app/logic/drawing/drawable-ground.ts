import { IDrawable } from './idrawable';
import { Resource } from '../generalSettings/resource';
import { Dimention } from '../generalSettings/dimention';
import { Drawable } from './drawable';
import { ObjectConfigurator } from 'src/app/view-logic/object-configurator';
import { jsonIgnore } from 'json-ignore';

export abstract class DrawableGround extends Drawable {
    @jsonIgnore()
    protected backgroundCcolor: string = Resource.groundBackgroundColor;
    @jsonIgnore()
    protected borderColor: string = Resource.groundBorderColor;
    @jsonIgnore()
    protected showArea: boolean = false;

    constructor(public size: number, x: number, y: number) {
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
