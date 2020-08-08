import { Room } from './room';
import { Closet } from './closet';
import { BorderedShape } from '../decorator/bordered-shape';
import { Bathroom } from './bathroom';
import { IconShape } from '../decorator/icon-shape';
import { BedroomBalcony } from './bedroom-balcony';

export class Bedroom extends Room {
    static sCantBedroom: number = -1;
    isMainBedroom: boolean = false;
    static NAME_FORMAT: string = "Cuarto #";
    hasCloset: boolean = false;
    hasBalcony: boolean = false;
    hasBathroom: boolean = false;
    closet: Closet;
    bathroom: Bathroom;
    balcony: BedroomBalcony;

    constructor(width: number, height: number) {
        super(width, height, Room.BEDROOM);        
        this.closet = new Closet(this);
        this.bathroom = new Bathroom(0);
        this.bathroom.setBaseFloor(this);
        this.balcony = new BedroomBalcony(1, 1);
        this.balcony.setBaseFloor(this);
    }

    drawExtras(ctx: CanvasRenderingContext2D) {
        this.drawCloset(ctx);
    }
    
    drawCloset(ctx: CanvasRenderingContext2D) {
        if(this.hasCloset) {
            if (this.closet.isSelected) {
                new BorderedShape(this.closet).draw(ctx);
            } else {
                this.closet.draw(ctx);
            }
        }
        if (this.hasBathroom) {
            new IconShape(this.bathroom)
                .draw(ctx)
                .drawIcon(ctx, this.bathroom.kind, this.bathroom.getPixelWidth() - 5, this.bathroom.getPixelHeight() - 5, this.bathroom.angle);
        }
        if (this.hasBalcony) {
            new IconShape(this.balcony)
                .draw(ctx)
                .drawIcon(ctx, this.balcony.kind);
        }
    }
    
}
