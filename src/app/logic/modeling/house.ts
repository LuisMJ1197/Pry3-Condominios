import { Floor } from './floor';
import { FirstFloor } from './first-floor';
import { SecondFloor } from './second-floor';
import { Bedroom } from './bedroom';
import { Bathroom } from './bathroom';
import { Room } from './room';
import { Stair } from './stair';
import { IconShape } from '../decorator/icon-shape';
import { ISnapshot } from '../memento/isnapshot';
import { HouseSnapshot } from '../memento/house-snapshot';

export class House {
    firstFloor: FirstFloor;
    secondFloor: SecondFloor;
    rooms: Room[] = [];
    hasSecondFloor: boolean = false;
    hasHotWater: boolean = false;
    stair: Stair = new Stair(0);

    constructor() {
        this.firstFloor = new FirstFloor(1, 1);
        this.secondFloor = new SecondFloor(1, 1);
        this.secondFloor.setBaseFloor(this.firstFloor);
        this.stair.baseFloor = this.secondFloor;
    }

    hasStair(): boolean {
        return this.stair.kind != 0;
    }

    hasBedrooms(): boolean {
        this.rooms.forEach(room => {
            if (room.kind == Room.BEDROOM || room.kind == Room.MAIN_BEDROOM) return true;
        });
        return false;
    }

    getBedrooms(): Room[] {
        return this.rooms.filter(function (room) {
            return room.kind == Room.BEDROOM || room.kind == Room.MAIN_BEDROOM;
        });
    }

    hasRooms(): boolean {
        this.rooms.forEach(room => {
            if (room.kind != Room.BEDROOM && room.kind != Room.MAIN_BEDROOM && room.kind != Room.SIMPLE_BATHROOM && room.kind != Room.COMPLETE_BATHROOM) return true;
        });
        return false;
    }

    getRooms(): Room[] {
        return this.rooms.filter(function (room) {
            return room.kind != Room.BEDROOM && room.kind != Room.MAIN_BEDROOM && room.kind != Room.SIMPLE_BATHROOM && room.kind != Room.COMPLETE_BATHROOM;
        });
    }

    hasBathroom(): boolean {
        this.rooms.forEach(room => {
            if (room.kind == Room.COMPLETE_BATHROOM || room.kind == Room.SIMPLE_BATHROOM) return true;
        });
        return false;
    }

    getBathrooms(): Room[] {
        return this.rooms.filter(function (room) {
            return room.kind == Room.COMPLETE_BATHROOM || room.kind == Room.SIMPLE_BATHROOM;
        });
    }

    hasRoom(kind: number){
        this.rooms.forEach(room => {
            if (room.kind == kind) return true;
        });
        return false;
    }
    
    getFirstFloor(): Floor {
        return this.firstFloor;
    }

    getSecondFloor(): SecondFloor {
        return this.secondFloor;
    }

    drawRooms(ctx: CanvasRenderingContext2D, number: number): void {
        this.assignFloor();
        this.rooms.forEach(element => {
            if ((element.baseFloor as Floor).number == number) {
                if (element.kind == Room.BEDROOM) {
                    new IconShape(element).draw(ctx).drawIcon(ctx, element.kind);
                        (element as Bedroom).drawExtras(ctx);
                } else if (element.kind == Room.SIMPLE_BATHROOM || element.kind == Room.COMPLETE_BATHROOM) {
                    new IconShape(element)
                        .draw(ctx)
                        .drawIcon(ctx, element.kind,
                        element.getPixelWidth() - 5, element.getPixelHeight() - 5, element.angle);
                } else {
                    new IconShape(element).draw(ctx).drawIcon(ctx, element.kind);
                }
            }
        });
    }

    generateRoomsCopy(): Room[] {
        return Object.assign([], this.rooms);
    }

    save(): ISnapshot {
        return new HouseSnapshot(this, this.hasSecondFloor, this.hasHotWater, this.generateRoomsCopy());
    }

    restore(snapshot: ISnapshot): void {
        this.hasSecondFloor = snapshot.getState().hasSecondFloor;
        this.hasHotWater = snapshot.getState().hasHotWater;
        this.rooms = snapshot.getState().rooms;
    }

    getName(room: Room) {
        if (room.kind == Room.BEDROOM || room.kind == Room.MAIN_BEDROOM)
            return "Dormitorio #" + (this.getBedrooms().findIndex(element => element == room) + 1);
        if (room.kind == Room.SIMPLE_BATHROOM || room.kind == Room.COMPLETE_BATHROOM) 
            return "Baño #" + (this.getBathrooms().findIndex(element => element == room) + 1);
        return "Habitación #" + (this.getRooms().findIndex(element => element == room) + 1);
    }

    deleteRoom(room: Room) {
        this.rooms = this.rooms.filter(function (element) {
            return room != element;
        });
    }

    assignFloor() {
        this.rooms.forEach(room => {
            if (room.floorNumber == 1) room.setBaseFloor(this.firstFloor);
            else room.setBaseFloor(this.secondFloor);
        });
    }
}
