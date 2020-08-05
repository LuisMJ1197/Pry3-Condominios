import { ElementRef } from '@angular/core';
import { Drawable } from '../logic/drawing/drawable';
import { CanvasMouseEventListener } from './canvas-mouse-event-listener';
import { Dimention } from '../logic/generalSettings/dimention';

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
    private objectListening: Drawable;
    private listening: boolean = false;
    hasMove: boolean = false;
    static canvasHandler: CanvasHandler;

    isListening(): boolean {
        return this.listening;
    }

    getObjectListening(): Drawable {
        return this.objectListening;
    }
    
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
        this.canvas.nativeElement.onmousemove = this.myMove;
        this.canvas.nativeElement.onselectstart = function () { return false; }
    }

    setObjectListening(objectListening: Drawable) {
        this.setListening(objectListening);
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

    setListening(object: Drawable) {
        this.objectListening = object;
        this.listening = object != null;
    }

    verifiesMovement(e: MouseEvent) {
        if (CanvasHandler.canvasHandler.objectListening != null) {
            CanvasHandler.canvasHandler.getMouse(e);
            CanvasHandler.canvasHandler.objectListening.draw(CanvasHandler.canvasHandler.gtcx);
            var object = CanvasHandler.canvasHandler.gtcx.getImageData(CanvasHandler.canvasHandler.mx, CanvasHandler.canvasHandler.my, 1, 1);
            if (object.data[3] > 0 || CanvasHandler.canvasHandler.isDrag) {
                CanvasHandler.canvasHandler.canvas.nativeElement.parentElement.style.cursor = 'move';
            } else {
                CanvasHandler.canvasHandler.canvas.nativeElement.parentElement.style.cursor = 'default';
            }
            CanvasHandler.canvasHandler.clearCanvas(CanvasHandler.canvasHandler.gtcx);
        }
    }

    myDown(e: MouseEvent) {
        if (CanvasHandler.canvasHandler.listening && CanvasHandler.canvasHandler.objectListening != null) {
            CanvasHandler.canvasHandler.getMouse(e);
            CanvasHandler.canvasHandler.objectListening.draw(CanvasHandler.canvasHandler.gtcx);
            var object = CanvasHandler.canvasHandler.gtcx.getImageData(CanvasHandler.canvasHandler.mx, CanvasHandler.canvasHandler.my, 1, 1);
            CanvasHandler.canvasHandler.objectListening.calculateDxDy();
            if (object.data[3] > 0) {
                CanvasHandler.canvasHandler.offsetx = CanvasHandler.canvasHandler.mx - CanvasHandler.canvasHandler.objectListening.getDX();
                CanvasHandler.canvasHandler.offsety = CanvasHandler.canvasHandler.my - CanvasHandler.canvasHandler.objectListening.getDY();
                CanvasHandler.canvasHandler.isDrag = true;
                CanvasHandler.canvasHandler.mouseListener.registerChange(CanvasHandler.canvasHandler.objectListening);
            }
            CanvasHandler.canvasHandler.clearCanvas(CanvasHandler.canvasHandler.gtcx);
        }
    }

    myUp(e: MouseEvent) {
        CanvasHandler.canvasHandler.isDrag = false;
        if (CanvasHandler.canvasHandler.hasMove) {
            CanvasHandler.canvasHandler.hasMove = false;
        }
    }

    myMove(e: MouseEvent) {
        CanvasHandler.canvasHandler.verifiesMovement(e);
        if (CanvasHandler.canvasHandler.isDrag){
            CanvasHandler.canvasHandler.hasMove = true;
            CanvasHandler.canvasHandler.getMouse(e);
            var x = CanvasHandler.canvasHandler.mx - CanvasHandler.canvasHandler.offsetx;
            var y = CanvasHandler.canvasHandler.my - CanvasHandler.canvasHandler.offsety;
            CanvasHandler.canvasHandler.objectListening.setX((x - CanvasHandler.canvasHandler.objectListening.getBaseFloor().getDX()) / Dimention.meterPixelSize);
            CanvasHandler.canvasHandler.objectListening.setY((y - CanvasHandler.canvasHandler.objectListening.getBaseFloor().getDY()) / Dimention.meterPixelSize);
            CanvasHandler.canvasHandler.mouseListener.refresh();  
        }
    }

    drawGrid () {
        let s = 24;
        let nX = Math.floor(this.canvasWidth)
        let nY = Math.floor(this.canvasHeight)
        let pX = -12
        let pY = -12
        let pL = Math.ceil(pX / 2) - 0.5
        let pT = Math.ceil(pY / 2) - 0.5
        let pR = this.canvasWidth - nX * s - pL
        let pB = this.canvasHeight - nY * s - pT
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'lightgrey';
        this.ctx.beginPath()
        for (var x = pL; x <= this.canvasWidth - pR; x += s) {
           this.ctx.moveTo(x, pT);
           this.ctx.lineTo(x, this.canvasHeight - pB);
        }
        for (var y = pT; y <= this.canvasHeight - pB; y += s) {
           this.ctx.moveTo(pL, y);
           this.ctx.lineTo(this.canvasWidth - pR, y);
        }
        this.ctx.stroke();
     }

}
