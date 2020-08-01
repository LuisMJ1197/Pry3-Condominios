import { Color } from '../generalSettings/color';
import { Dimention } from '../generalSettings/dimention';
import { IDragable } from './idragable';
import { Drawable } from './drawable';

export abstract class DrawableFloor extends Drawable {
    protected backgroundCcolor: string = Color.firstBackgroundColor;
    protected borderColor: string = Color.firstBorderColor;
    protected selectedBorderColor: string = Color.selectedBorderColor;
    rol: string = "firstFloor";

    constructor(width: number, height: number, x: number, y: number) {
        super(width, height, x, y);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 3;
        if (this.rol == "firstFloor") {
            var pat = ctx.createPattern(Color.firstFloorFill, "repeat");
            ctx.fillStyle = pat;
        } else {
            var pat = ctx.createPattern(Color.secondFloorFill, "repeat");
            ctx.fillStyle = pat;
        }
        ctx.strokeStyle = this.borderColor;
        if (this.isSelected) {
            ctx.strokeStyle = this.selectedBorderColor;
        }
        ctx.fillRect(this.x, this.y, this.getPixelWidth(), this.getPixelHeight());
        ctx.shadowColor = this.borderColor;
        ctx.shadowBlur = 2;
        ctx.strokeRect(this.x, this.y, this.getPixelWidth(), this.getPixelHeight());
        ctx.shadowBlur = 0;  
    }

    abstract getCenter(): number[];
}
