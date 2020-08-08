import { Room } from './room';

export class BedroomBalcony extends Room {

    constructor(width: number, height: number) {
        super(width, height, Room.BALCONY);
    }
    
    public setX(x: number): void {
        if (this.isDragable) {
            this.genLimits();
            if ( x >= this.limitLeft && x + this.getWidth() <= this.limitRight) {
                if (this.y == 0 || this.y == this.baseFloor.getHeight() - this.getHeight()) {
                    this.x = x;
                }
            }
        } else {
            this.x = x;
        }
    }

    public setY(y: number): void {
        if (this.isDragable) {
            this.genLimits();
            if ( y >= this.limitTop && y + this.getHeight() <= this.limitBottom ) {
                if (this.x == 0 || this.x == this.baseFloor.getWidth() - this.getWidth()) {
                    this.y = y;
                }
            }
        } else {
            this.y = y;
        }
    }

    /*genLimits() {
        var xMin = 0;
        var xMax = 0;
        if (this.baseFloor.getBaseFloor().getBaseFloor().getBaseFloor() != null) {
            xMax = this.baseFloor.getBaseFloor().getBaseFloor().getBaseFloor().getWidth();
        } else {
            xMax = this.baseFloor.getBaseFloor().getBaseFloor().getWidth();
        }
        for (var base = this.getBaseFloor(); base != null; base = base.getBaseFloor()) {
            xMin += base.getX();
            xMax += - (base.getX() + base.getWidth());
        }
        var yMin = 0;
        for (var base = this.getBaseFloor(); base != null; base = base.getBaseFloor()) {
            yMin += base.getY();
        }



        var xOffset = 0;
        if (xMin < this.getWidth() / 2) {
            xOffset = this.getWidth() / 2 - this.getX();
        }
        this.limitLeft = 0 - (this.getWidth() / 2) + xOffset;
        var yOffset = 0;
        if (yMin < this.getHeight() / 2) {
            yOffset = this.getHeight() / 2 - this.getY();
        }
        this.limitTop = 0 - (this.getHeight() / 2) + yOffset;

        xOffset = - (this.baseFloor.getX() + this.baseFloor.getWidth()) + this.baseFloor.getBaseFloor().getWidth();
        if (xOffset > this.getWidth() / 2) {
            xOffset = 0;
        }
        this.limitRight = this.getBaseFloor().getWidth() + (this.getWidth() / 2) - xOffset;
        yOffset = - (this.baseFloor.getY() + this.baseFloor.getHeight()) + this.baseFloor.getBaseFloor().getHeight();
        if (yOffset > this.getHeight() / 2) {
            yOffset = 0;
        }
        this.limitBottom = this.getBaseFloor().getHeight() + (this.getHeight() / 2) - yOffset;
    }*/
}
