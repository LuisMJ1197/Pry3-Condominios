import { Injectable, ElementRef } from '@angular/core';
import { Ground } from '../logic/modeling/ground';
import { Bedroom } from '../logic/modeling/bedroom';
import { CanvasHandler } from '../view-logic/canvas-handler';
import { Bathroom } from '../logic/modeling/bathroom';
import { Room } from '../logic/modeling/room';
import { SnapshotCareTaker } from '../logic/memento/snapshot-care-taker';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  canvas: ElementRef<HTMLCanvasElement>;
  ghostcanvas: ElementRef<HTMLCanvasElement>;
  canvasHandler: CanvasHandler;

  isAddingBedroom: boolean = false;
  isAddingBathroom: boolean = false;
  isAddingRoom: boolean = false;
  isMovingStair: boolean = false;
  isMovingExtra: boolean = false;
  
  addingBedroom: Bedroom = new Bedroom(1, 1);
  addingBathroom: Bathroom = new Bathroom(1);
  addingRoom: Room = new Room(1, 1, 3);
  editingGround: Ground;
  snapshotCareTaker: SnapshotCareTaker = new SnapshotCareTaker();

  constructor() {
    this.editingGround = new Ground(500);
    this.editingGround.getHouse().getFirstFloor().setWidth(21);
    this.editingGround.getHouse().getFirstFloor().setHeight(21);
    this.editingGround.getHouse().getFirstFloor().setX(0.68);
    this.editingGround.getHouse().getFirstFloor().setY(0.68);
    this.editingGround.getHouse().hasSecondFloor = true;
    this.editingGround.getHouse().getSecondFloor().setWidth(10);
    this.editingGround.getHouse().getSecondFloor().setHeight(10);
    this.editingGround.getHouse().getSecondFloor().setX(2.5);
    this.editingGround.getHouse().getSecondFloor().setY(2.5);
    var bed = new Bedroom(10, 10)
    bed.isMainBedroom = true;
    bed.floorNumber = 1;
    bed.kind = Room.MAIN_BEDROOM;
    bed.setBaseFloor(this.editingGround.getHouse().getFirstFloor());
    this.editingGround.getHouse().rooms.push(bed);
    var bed2 = new Bedroom(5, 5);
    bed2.floorNumber = 2;
    bed2.setBaseFloor(this.editingGround.getHouse().getSecondFloor());
    this.editingGround.getHouse().rooms.push(bed2);

    var bathroom = new Bathroom(1);
    bathroom.floorNumber = 1;
    bathroom.angle = 90;
    bathroom.setBaseFloor(this.editingGround.getHouse().getFirstFloor());
    this.editingGround.getHouse().rooms.push(bathroom);

    var room = new Room(3, 3, 3);
    room.floorNumber = 1;
    room.setBaseFloor(this.editingGround.getHouse().getFirstFloor());
    this.editingGround.getHouse().rooms.push(room);
    this.editingGround.getHouse().stair.kind = 1;
  }
}
