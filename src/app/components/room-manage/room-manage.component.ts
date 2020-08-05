import { Component, OnInit, ElementRef } from '@angular/core';
import { CanvasHandler } from 'src/app/view-logic/canvas-handler';
import { House } from 'src/app/logic/modeling/house';
import { DrawingService } from 'src/app/services/drawing.service';
import { Room } from 'src/app/logic/modeling/room';
import { Floor } from 'src/app/logic/modeling/floor';
import { Resource } from 'src/app/logic/generalSettings/resource';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.scss']
})

export class RoomManageComponent implements OnInit {
  canvas: ElementRef<HTMLCanvasElement>;
  ghostcanvas: ElementRef<HTMLCanvasElement>;
  canvasHandler: CanvasHandler;
  house: House = new House();
  addingRoom: Room;
  selectedRoomKind: number = 0;
  selectedFloor: number = 1;

  rooms: any[] = [
  {
    name: "Sala",
    kind: Room.LIVING_ROOM
  },
  {
    name: "Cocina",
    kind: Room.KITCHEN
  },
  {
    name: "Comedor",
    kind: Room.DINING_ROOM
  },
  {
    name: "Terraza",
    kind: Room.TERRACE
  },
  {
    name: "Balcón",
    kind: Room.BALCONY
  },
  {
    name: "Zona de barbecue",
    kind: Room.BARBECUE
  },
  {
    name: "Cochera",
    kind: Room.GARAGE
  },
  {
    name: "Walk-in Closet",
    kind: Room.WALKING_CLOSET
  },
  {
    name: "Office",
    kind: Room.OFFICE
  },
  {
    name: "Bodega",
    kind: Room.STORAGE
  },
  {
    name: "Cuarto de lavado",
    kind: Room.WASHING_ROOM
  }
  ];

  constructor(public drawingService: DrawingService) {
    this.house = this.drawingService.editingGround.getHouse();
    this.canvas = drawingService.canvas;
    this.ghostcanvas = drawingService.canvas;
  }

  ngOnInit(): void {
    this.resetAddingRoom();
    this.changeAddingRoomFloor(1);
  }

  resetAddingRoom() {
    this.addingRoom = new Room(1, 1, 3);
    this.addingRoom.isSelected = true;
    this.addingRoom.setBaseFloor(this.house.getFirstFloor());
    this.drawingService.addingRoom = this.addingRoom;
  }

  getFloor(id: number): Floor {
    if (id == 1) return this.house.getFirstFloor();
    else return this.house.getSecondFloor();
  }

  startAdding() {
    this.drawingService.isAddingRoom = true;
    this.drawingService.canvasHandler.setListening(this.addingRoom);
  }

  stopAdding() {
    this.drawingService.isAddingRoom = false; 
    this.drawingService.canvasHandler.setListening(null);
    this.resetAddingRoom();
  }

  formatLabel(value: number) {
    return value + 'm';
  }

  changeAddingRoomWidth(value: number) {
    this.addingRoom.setWidth(value);
  }

  changeAddingRoomHeight(value: number) {
    this.addingRoom.setHeight(value);
  }

  changeAddingRoomFloor(floorNumber: number) {
    var floor = this.getFloor(floorNumber);
    this.addingRoom.setBaseFloor(floor);
    this.addingRoom.setX(0);
    this.addingRoom.setY(0);
  }

  addRoom() {
    this.drawingService.snapshotCareTaker.backup(this.house);
    this.addingRoom.isSelected = false;
    this.house.rooms.push(this.addingRoom);
    this.stopAdding();
  }
}
