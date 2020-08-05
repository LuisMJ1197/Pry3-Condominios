import { DrawableGround } from '../drawing/drawable-ground';
import { House } from './house';
import { ISnapshot } from '../memento/isnapshot';

export class Ground extends DrawableGround {
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

    save(): ISnapshot {
        return null;
        //return new GroundSnapshot(this.x, this.y, this.width, this.height);
    }

    restore(snapshot: ISnapshot): void {
        this.x = snapshot.getState().x;
        this.y = snapshot.getState().y;
        this.width = snapshot.getState().width;
        this.height = snapshot.getState().height;
    }
}
