import { IDrawable } from './idrawable';
import { Dimention } from '../generalSettings/dimention';

export abstract class Drawable implements IDrawable {
    limitTop: number = 0;
    limitLeft: number = 0;
    limitRight: number = 0;
    limitBottom: number = 0;
    isDragable: boolean = true;
    isSelected: boolean = false;

    constructor(protected width: number, protected height: number, protected x: number, protected y: number) {
        
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    
    public abstract genLimits(): void;

    abstract getCenter(): number[];
    
    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number) {
        if (this.isDragable) {
            this.genLimits();
            if ( x >= this.limitLeft && x + this.getPixelWidth() <= this.limitRight) {
                this.x = x;
            }
        } else {
            this.x = x;
        }
    }

    public setY(y: number) {
        if (this.isDragable) {
            this.genLimits();
            if ( y >= this.limitTop && y + this.getPixelHeight() <= this.limitBottom ) {
                this.y = y;
            }
        } else {
            this.y = y;
        }
    }

    getPixelWidth(): number {
        return this.width * Dimention.meterPixelSize;
    }

    getPixelHeight(): number {
        return this.height * Dimention.meterPixelSize;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    setWidth(value: number) {
        if (this.isDragable) {
            this.genLimits();
            this.width = value;
            if (this.x + this.getPixelWidth() > this.limitRight) {
                var offset = this.x - (this.x + this.getPixelWidth() - this.limitRight);
                this.x = offset;
            }
        } else { 
            this.width = value;
        }
    }

    setHeight(value: number) {
        if (this.isDragable) {
            this.genLimits();
            this.height = value;
            if (this.y + this.getPixelHeight() > this.limitBottom) {
                var offset = this.y - (this.y + this.getPixelHeight() - this.limitBottom);
                this.y = offset;
            }
        } else {
            this.height = value;
        }
    }
}
