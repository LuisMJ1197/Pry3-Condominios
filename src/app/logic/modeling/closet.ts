import { Bedroom } from './bedroom';
import { Resource } from '../generalSettings/resource';
import { Room } from './room';
import { jsonIgnore } from 'json-ignore';

export class Closet extends Room {
    @jsonIgnore()
    baseFloor: Room;
    angle: number = 0;
    @jsonIgnore()
    size: number[] = [1.5, 0.5];

    constructor(baseFloor: Room) {
        super(1.5, 0.5, 0);
        this.baseFloor = baseFloor;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.calculateDxDy();
        ctx.save();
        ctx.translate(this.dx + this.getPixelWidth()/2, this.dy + this.getPixelHeight()/2);
        ctx.rotate(this.angle * (Math.PI / 180));
        ctx.translate(-this.dx-this.getPixelWidth()/2, -this.dy -this.getPixelHeight()/2);
        ctx.drawImage(Resource.closetIcon, this.dx, this.dy, this.getPixelWidth(), this.getPixelHeight());
        ctx.restore();
    }

    changeAngle(angle: number) {
        if (angle >= 360) angle = 0;
        this.angle = angle;
        var dimenData = this.size;
        if (this.angle == 0 || this.angle == 180) {
            this.width = dimenData[0];
            this.height = dimenData[1];
        } else {
            this.width = dimenData[1];
            this.height = dimenData[0];
        }
    }
    public genLimits(): void {
        this.limitLeft = 0;
        this.limitTop = 0;
        this.limitRight = this.baseFloor.getWidth();
        this.limitBottom = this.baseFloor.getHeight();
    }
}
