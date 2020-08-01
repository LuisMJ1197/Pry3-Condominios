import { IDrawable } from './idrawable';
import { Color } from '../generalSettings/color';
import { Dimention } from '../generalSettings/dimention';
import { Drawable } from './drawable';

export abstract class DrawableGround extends Drawable {
    protected backgroundCcolor: string = Color.groundBackgroundColor;
    protected borderColor: string = Color.groundBorderColor;
    protected showArea: boolean = false;
    protected width: number;
    protected height: number;

    constructor(protected size: number, x: number, y: number) {
        super(size, size, x, y);
        this.width = Math.sqrt(this.size);
        this.height = Math.sqrt(this.size);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 8;
        var pat = ctx.createPattern(Color.groundFill, "repeat");
        //ctx.fillStyle = this.backgroundCcolor;
        ctx.fillStyle = pat;
        ctx.fillRect(this.x, this.y, this.getPixelWidth(), this.getPixelHeight());
        ctx.strokeStyle = this.borderColor;
        /*ctx.shadowColor = this.borderColor;
        ctx.shadowBlur = 2;
        ctx.strokeRect(this.x, this.y, this.getPixelWidth(), this.getPixelHeight());
        ctx.shadowBlur = 0;*/
        if (this.showArea) {
            this.displayAreaText(ctx);
        }
    }

    displayAreaText(ctx: CanvasRenderingContext2D) {
        ctx.font = "20px Arial";    
        ctx.fillStyle = Color.groundAreaTextColor;
        ctx.textAlign = "center";
        ctx.fillText(this.size + "㎡", this.x + this.getPixelWidth()/2, this.y + this.getPixelHeight()/2); 
    }

    public setShowArea(showArea: boolean) {
        this.showArea = showArea;
    }

    abstract getCenter(): number[];
}
