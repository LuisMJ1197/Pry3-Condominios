import { IShape } from './ishape';
import { DrawableFloor } from '../drawing/drawable-floor';
import { Drawable } from '../drawing/drawable';
import { Color } from '../generalSettings/color';

export class Floor extends DrawableFloor implements IShape {
    private baseFloor: Drawable;

    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    getCenter(): number[] {
        return [this.baseFloor.getCenter()[0] + this.width/2, this.baseFloor.getCenter()[1] + this.height/2];
    }

    setArea(size: number) {
        
    }

    getBaseFloor() {
        return this.baseFloor;
    }

    getArea() {
        return 0;
    }

    setRol(rol: string) {
        this.rol = rol;
        if (this.rol == "secondFloor") {
            this.backgroundCcolor = Color.secondBackgroundColor;
        }
    }

    setBaseFloor(baseFloor: Drawable) {
        this.baseFloor = baseFloor;
    }

    genLimits(): void {
        this.limitLeft = this.baseFloor.getX();
        this.limitTop = this.baseFloor.getY();
        this.limitRight = this.baseFloor.getX() + this.baseFloor.getPixelWidth();
        this.limitBottom = this.baseFloor.getY() + this.baseFloor.getPixelHeight();
    }
}
