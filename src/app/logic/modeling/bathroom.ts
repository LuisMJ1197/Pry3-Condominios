import { Room } from './room';
import { Resource } from '../generalSettings/resource';

export class Bathroom extends Room {
    static sCantBathrooms: number = -1;
    static NAME_FORMAT: string = "Baño #";
    static SIMPLE: number = 0;
    static COMPLETE: number = 1;
    static SIMPLE_DIMEN: number[] = [45/24 + 0.20, 45/24 + 0.20];
    static COMPLETE_DIMEN: number[] = [54/24 + 0.20, 54/24 + 0.20];
    static FILLS: HTMLImageElement[] = [Resource.simpleBathroomFill, Resource.completeBathroomFill];

    constructor(pNumber: number) {
        super(Bathroom.SIMPLE_DIMEN[0], Bathroom.SIMPLE_DIMEN[1], Bathroom.SIMPLE);
        this.setKind(Bathroom.SIMPLE);
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        var width = this.getPixelWidth() - 5;
        var height = this.getPixelHeight() - 5;
        var centerX = this.getDX() + ((this.getPixelWidth() - width) / 2);
        var centerY = this.getDY() + ((this.getPixelHeight() - height) / 2);
        ctx.save();
        ctx.translate(centerX + width/2, centerY + height/2);
        ctx.rotate(this.getAngle() * (Math.PI / 180));
        ctx.translate(-centerX - width/2, -centerY - height/2);
        ctx.drawImage(Resource.icons[this.getKind()], centerX, centerY, width, height);
        ctx.restore();
    }

    setKind(kind: number) {
        this.kind = kind;
        if (kind == Bathroom.SIMPLE) {
            this.width = Bathroom.SIMPLE_DIMEN[0];
            this.height = Bathroom.SIMPLE_DIMEN[1];
        } else {
            this.width = Bathroom.COMPLETE_DIMEN[0];
            this.height = Bathroom.COMPLETE_DIMEN[1];
        }
        this.angle = 0;
    }
    
    changeAngle(angle: number) {
        if (angle >= 360) angle = 0;
        this.angle = angle;
        var dimenData = this.getKindData();
        if (this.angle == 0 || this.angle == 180) {
            this.width = dimenData[0];
            this.height = dimenData[1];
        } else {
            this.width = dimenData[1];
            this.height = dimenData[0];
        }
    }

    getKindData(): number[] {
        if (this.kind == Bathroom.SIMPLE) {
            return Bathroom.SIMPLE_DIMEN;
        } else {
            return Bathroom.COMPLETE_DIMEN;
        }
    }
}
