import { ElementRef } from '@angular/core';
import { IDragable } from '../logic/drawing/idragable';
import { Drawable } from '../logic/drawing/drawable';
import { CanvasMouseEventListener } from './canvas-mouse-event-listener';

export class CanvasHandler {
    REFRESH_INTERVAL: number = 20;
    isDrag: boolean = false;
    mx: number = 0;
    my: number = 0;
    offsetx: number = 0;
    offsety: number = 0;
    gtcx: CanvasRenderingContext2D;
    ctx: CanvasRenderingContext2D;
    canvasHeight: number;
    canvasWidth: number;
    objectListening: Drawable;
    listening: boolean = false;
    static canvasHandler: CanvasHandler;

    constructor(private canvas: ElementRef<HTMLCanvasElement>, private ghostcanvas: ElementRef<HTMLCanvasElement>, private mouseListener: CanvasMouseEventListener) {
        CanvasHandler.canvasHandler = this;
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.gtcx = this.ghostcanvas.nativeElement.getContext('2d');
        this.canvasHeight = this.canvas.nativeElement.parentElement.clientHeight;
        this.canvasWidth = this.canvas.nativeElement.parentElement.clientWidth;
        this.canvas.nativeElement.width = this.canvasWidth;
        this.canvas.nativeElement.height = this.canvasHeight;
        this.ghostcanvas.nativeElement.width = this.canvasWidth;
        this.ghostcanvas.nativeElement.height = this.canvasHeight;
        this.canvas.nativeElement.onmousedown = this.myDown;
        this.canvas.nativeElement.onmouseup = this.myUp;
        this.canvas.nativeElement.onselectstart = function () { return false; }
    }

    setObjectListening(objectListening: Drawable) {
        if (this.objectListening != null) this.objectListening.isSelected = false;
        this.objectListening = objectListening;
        this.objectListening.isSelected = true;
    }

    getCenter(width: number, height: number): number[] {
        return [(this.canvasWidth - width) / 2, (this.canvasHeight - height) / 2];
    }

    clearCanvas(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }

    getCTX(): CanvasRenderingContext2D {
        return this.ctx;
    }

    getMouse(e) {
        var rect = CanvasHandler.canvasHandler.canvas.nativeElement.getBoundingClientRect();
        CanvasHandler.canvasHandler.mx = e.clientX - rect.left;
        CanvasHandler.canvasHandler.my = e.clientY - rect.top;
    }

    myDown(e: MouseEvent) {
        if (CanvasHandler.canvasHandler.listening) {
            CanvasHandler.canvasHandler.getMouse(e);
            CanvasHandler.canvasHandler.objectListening.draw(CanvasHandler.canvasHandler.gtcx);
            var object = CanvasHandler.canvasHandler.gtcx.getImageData(CanvasHandler.canvasHandler.mx, CanvasHandler.canvasHandler.my, 1, 1);
            var index = (CanvasHandler.canvasHandler.mx + CanvasHandler.canvasHandler.my * object.width) * 4;
            if (object.data[3] > 0) {
                CanvasHandler.canvasHandler.offsetx = CanvasHandler.canvasHandler.mx - CanvasHandler.canvasHandler.objectListening.getX();
                CanvasHandler.canvasHandler.offsety = CanvasHandler.canvasHandler.my - CanvasHandler.canvasHandler.objectListening.getY();
                CanvasHandler.canvasHandler.objectListening.setX(CanvasHandler.canvasHandler.mx - CanvasHandler.canvasHandler.offsetx);
                CanvasHandler.canvasHandler.objectListening.setY(CanvasHandler.canvasHandler.my - CanvasHandler.canvasHandler.offsety);
                CanvasHandler.canvasHandler.isDrag = true;
                CanvasHandler.canvasHandler.canvas.nativeElement.onmousemove = CanvasHandler.canvasHandler.myMove;
            }
            CanvasHandler.canvasHandler.clearCanvas(CanvasHandler.canvasHandler.gtcx);
        }
    }

    myUp(e: MouseEvent) {
        CanvasHandler.canvasHandler.isDrag = false;
        CanvasHandler.canvasHandler.canvas.nativeElement.onmousemove = null;
    }

    myMove(e: MouseEvent) {
        if (CanvasHandler.canvasHandler.isDrag){
            CanvasHandler.canvasHandler.getMouse(e);
            var x = CanvasHandler.canvasHandler.mx - CanvasHandler.canvasHandler.offsetx;
            var y = CanvasHandler.canvasHandler.my - CanvasHandler.canvasHandler.offsety;
            CanvasHandler.canvasHandler.objectListening.setX(x);
            CanvasHandler.canvasHandler.objectListening.setY(y);
            CanvasHandler.canvasHandler.mouseListener.refresh();  
        }
    }
}
