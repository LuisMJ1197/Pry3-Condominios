import { Floor } from './floor';

export class House {
    private firstFloor: Floor;
    private secondFloor: Floor;

    constructor() {
        this.firstFloor = new Floor(1, 1);
        this.secondFloor = new Floor(1, 1);
        this.secondFloor.setRol("secondFloor");
        this.secondFloor.setBaseFloor(this.firstFloor);
    }

    getFirstFloor() {
        return this.firstFloor;
    }

    getSecondFloor() {
        return this.secondFloor;
    }
}
