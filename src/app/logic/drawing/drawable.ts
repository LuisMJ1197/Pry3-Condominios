import { IDrawable } from './idrawable';
import { Dimention } from '../generalSettings/dimention';
import { ISnapshot } from '../memento/isnapshot';
import { IOriginator } from '../memento/ioriginator';
import { RoomSnapshot } from '../memento/room-snapshot';

export abstract class Drawable implements IDrawable, IOriginator {
    limitTop: number = 0;
    limitLeft: number = 0;
    limitRight: number = 0;
    limitBottom: number = 0;
    isDragable: boolean = true;
    isSelected: boolean = false;
    dx: number = 0;
    dy: number = 0;
    angle: number = 0;
    baseFloor: Drawable;

    constructor(protected width: number, protected height: number, protected x: number, protected y: number) {
        
    }

    public getDX(): number {
        return this.dx;
    }

    public getDY(): number {
        return this.dy;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;

    abstract getCenter(): number[];
    
    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        if (this.isDragable) {
            this.genLimits();
            if ( x >= this.limitLeft && x + this.getWidth() <= this.limitRight) {
                this.x = x;
            }
        } else {
            this.x = x;
        }
    }

    public setY(y: number): void {
        if (this.isDragable) {
            this.genLimits();
            if ( y >= this.limitTop && y + this.getHeight() <= this.limitBottom ) {
                this.y = y;
            }
        } else {
            this.y = y;
        }
    }

    public getPixelWidth(): number {
        return this.width * Dimention.meterPixelSize;
    }

    public getPixelHeight(): number {
        return this.height * Dimention.meterPixelSize;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public setWidth(value: number) {
        if (this.isDragable) {
            this.genLimits();
            this.width = value;
            if (this.x + this.getWidth() > this.limitRight) {
                var offset = this.x - (this.x + this.getWidth() - this.limitRight);
                this.x = offset;
            }
        } else { 
            this.width = value;
        }
    }

    public setHeight(value: number) {
        if (this.isDragable) {
            this.genLimits();
            this.height = value;
            if (this.y + this.getHeight() > this.limitBottom) {
                var offset = this.y - (this.y + this.getHeight() - this.limitBottom);
                this.y = offset;
            }
        } else {
            this.height = value;
        }
    }

    
    setBaseFloor(floor: Drawable): void {
        this.baseFloor = floor;
    }

    calculateDxDy() {
        this.dx = this.getBaseFloor().getDX() + (this.x * Dimention.meterPixelSize);
        this.dy = this.getBaseFloor().getDY() + (this.y * Dimention.meterPixelSize);
    }

    getBaseFloor(): IDrawable {
        return this.baseFloor;
    }

    genLimits(): void {
        this.limitLeft = 0;
        this.limitTop = 0;
        if (this.baseFloor == null) return;
        this.limitRight = this.baseFloor.getWidth();
        this.limitBottom = this.baseFloor.getHeight();
    }

    save(): ISnapshot {
        return new RoomSnapshot(this, this.x, this.y, this.width, this.height, 0);
    }

    restore(snapshot: ISnapshot): void {
        this.x = snapshot.getState().x;
        this.y = snapshot.getState().y;
        this.width = snapshot.getState().width;
        this.height = snapshot.getState().height;
    }
}
