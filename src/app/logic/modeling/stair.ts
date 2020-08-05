import { Drawable } from '../drawing/drawable';
import { Resource } from '../generalSettings/resource';
import { Dimention } from '../generalSettings/dimention';
import { ISnapshot } from '../memento/isnapshot';
import { RotateSnapshot } from '../memento/rotate-snapshot';

export class Stair extends Drawable {
    static NONE: number = 0;
    static STRAIGHT: number = 1;
    static U: number = 2;
    static ESPIRAL: number = 3;
    static SIZES: number[][] = [
        [0, 0],
        [28/24, 4.5],
        [3, 3],
        [2, 2]
    ];
    kind: number;
    angle: number = 0;

    constructor(kind: number) {
        super(Stair.SIZES[kind][0], Stair.SIZES[kind][1], 0, 0);
        this.kind = kind;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.changeKind();
        if (this.kind != Stair.NONE) {
            this.calculateDxDy();
            ctx.save();
            ctx.translate(this.dx + this.getPixelWidth()/2, this.dy + this.getPixelHeight()/2);
            ctx.rotate(this.angle * (Math.PI / 180));
            ctx.translate(-this.dx-this.getPixelWidth()/2, -this.dy -this.getPixelHeight()/2);
            ctx.drawImage(Resource.stairs[this.kind - 1], this.dx, this.dy, this.getPixelWidth(), this.getPixelHeight());
            ctx.restore();
        }
    }
    
    changeAngle(angle: number) {
        if (angle >= 360) angle = 0;
        this.angle = angle;
        var dimenData = Stair.SIZES[this.kind];
        if (this.angle == 0 || this.angle == 180) {
            this.width = dimenData[0];
            this.height = dimenData[1];
        } else {
            this.width = dimenData[1];
            this.height = dimenData[0];
        }
    }

    changeKind() {
        this.width = Stair.SIZES[this.kind][0];
        this.height = Stair.SIZES[this.kind][1];
    };

    public genLimits(): void {
        this.limitLeft = 0;
        this.limitTop = 0;
        this.limitRight = this.baseFloor.getWidth();
        this.limitBottom = this.baseFloor.getHeight();
    }
    
    getCenter(): number[] {
        throw new Error("Method not implemented.");
    }
    
    calculateDxDy() {
        this.dx = this.getBaseFloor().getDX() + (this.x * Dimention.meterPixelSize);
        this.dy = this.getBaseFloor().getDY() + (this.y * Dimention.meterPixelSize);
    }
    
    public getBaseFloor(): Drawable {
        return this.baseFloor;
    }

    save(): ISnapshot {
        return new RotateSnapshot(this, this.x, this.y, this.width, this.height, this.kind, this.angle);
    }

    restore(snapshot: ISnapshot): void {
        this.x = snapshot.getState().x;
        this.y = snapshot.getState().y;
        this.width = snapshot.getState().width;
        this.height = snapshot.getState().height;
        this.kind = snapshot.getState().kind;
        this.angle = snapshot.getState().angle;
    }
}
