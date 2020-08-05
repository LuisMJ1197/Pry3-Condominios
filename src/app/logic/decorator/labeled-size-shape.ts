import { ShapeDecorator } from './shape-decorator';
import { IDrawable } from '../drawing/idrawable';
import { Resource } from '../generalSettings/resource';

export class LabeledSizeShape extends ShapeDecorator {

    constructor(shape: IDrawable) {
        super(shape);
    }

    draw(ctx: CanvasRenderingContext2D): LabeledSizeShape {
        this.shape.draw(ctx);
        return this;
    }

    drawSizeLabel(ctx: CanvasRenderingContext2D, baseXY: number[]) {
        var fromx = baseXY[0] - 20;
        var fromy = baseXY[1];
        var tox= baseXY[0] - 20;
        var toy = baseXY[1] + this.shape.getPixelHeight();
        this.drawLineWithArrows(ctx, fromx, fromy, tox, toy, 5, 8, true, true);
        this.drawText(ctx, this.shape.getWidth().toFixed(2).toString().concat("mts"),
            baseXY[0] - 20, (baseXY[1] + this.shape.getPixelHeight()/2), true);
        
        fromx = baseXY[0];
        fromy = baseXY[1] - 20;
        tox = baseXY[0] + this.shape.getPixelWidth();
        toy = baseXY[1] - 20;
        this.drawLineWithArrows(ctx, fromx, fromy, tox, toy, 5, 8, true, true);
        this.drawText(ctx, this.shape.getHeight().toFixed(2).toString().concat("mts"),
            (baseXY[0] + this.shape.getPixelWidth()/2), baseXY[1] - 20, false);        
    }

    drawLineWithArrows(ctx: CanvasRenderingContext2D, x0,y0,x1,y1,aWidth,aLength,arrowStart,arrowEnd){
        var dx=x1-x0;
        var dy=y1-y0;
        var angle=Math.atan2(dy,dx);
        var length=Math.sqrt(dx*dx+dy*dy);
        //
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = Resource.firstBorderColor;
        ctx.translate(x0,y0);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(length,0);
        if(arrowStart){
            ctx.moveTo(aLength,-aWidth);
            ctx.lineTo(0,0);
            ctx.lineTo(aLength,aWidth);
        }
        if(arrowEnd){
            ctx.moveTo(length-aLength,-aWidth);
            ctx.lineTo(length,0);
            ctx.lineTo(length-aLength,aWidth);
        }
        //
        ctx.stroke();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.restore();
    }

    drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, rotate: boolean) {
        ctx.save();
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.font = "15px Arial";    
        if (rotate) {
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(text, 0, -5);
        } else {
            ctx.fillText(text, x, y - 5);
        }
        ctx.restore();
    }
}
