import { DrawableGround } from '../drawing/drawable-ground';
import { House } from './house';
import { IShape } from './ishape';
import { Dimention } from '../generalSettings/dimention';

export class Ground extends DrawableGround implements IShape {
    private house: House;

    constructor(size: number) {
        super(size, 0, 0);
        this.house = new House();
        this.house.getFirstFloor().setBaseFloor(this);
    }

    getCenter(): number[] {
        return [(this.x + this.getPixelWidth()/2), (this.y + this.getPixelHeight()/2)];
    }
    
    getArea(): number {
        return this.size;
    }

    getHouse() {
        return this.house;
    }

    genLimits(): void {
        
    }
}
