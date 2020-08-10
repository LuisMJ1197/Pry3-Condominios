import { IDrawer } from './idrawer';
import { IDrawable } from '../drawing/idrawable';
import { CanvasHandler } from 'src/app/view-logic/canvas-handler';
import { Resource } from '../generalSettings/resource';
import { Dimention } from '../generalSettings/dimention';

export class LabelDrawer implements IDrawer {
    width: number = 0;
    height: number = 0;

    draw(ctx: CanvasRenderingContext2D, drawable: IDrawable): void {

        var fromx = Dimention.centerXY[0] - 20;
        var fromy = Dimention.centerXY[1];
        var tox= Dimention.centerXY[0] - 20;
        var toy = Dimention.centerXY[1] + drawable.getPixelHeight();
        this.drawLineWithArrows(ctx, fromx, fromy, tox, toy, 5, 8, true, true);
        this.drawText(ctx, drawable.getWidth().toFixed(2).toString().concat("mts"),
            Dimention.centerXY[0] - 20, (Dimention.centerXY[1] + drawable.getPixelHeight()/2), true);
        
        fromx = Dimention.centerXY[0];
        fromy = Dimention.centerXY[1] - 20;
        tox = Dimention.centerXY[0] + drawable.getPixelWidth();
        toy = Dimention.centerXY[1] - 20;
        this.drawLineWithArrows(ctx, fromx, fromy, tox, toy, 5, 8, true, true);
        this.drawText(ctx, drawable.getHeight().toFixed(2).toString().concat("mts"),
            (Dimention.centerXY[0] + drawable.getPixelWidth()/2), Dimention.centerXY[1] - 20, false);
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
