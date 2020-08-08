import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CanvasHandler } from 'src/app/view-logic/canvas-handler';
import { CanvasMouseEventListener } from 'src/app/view-logic/canvas-mouse-event-listener';
import { DrawingService } from 'src/app/services/drawing.service';
import { Ground } from 'src/app/logic/modeling/ground';
import { Dimention } from 'src/app/logic/generalSettings/dimention';
import { LabeledSizeShape } from 'src/app/logic/decorator/labeled-size-shape';
import { BorderedShape } from 'src/app/logic/decorator/bordered-shape';
import { House } from 'src/app/logic/modeling/house';
import { Floor } from 'src/app/logic/modeling/floor';
import { Bedroom } from 'src/app/logic/modeling/bedroom';
import { IconShape } from 'src/app/logic/decorator/icon-shape';
import { Room } from 'src/app/logic/modeling/room';
import { Drawable } from 'src/app/logic/drawing/drawable';
import { ServerService } from 'src/app/services/server.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-desing',
  templateUrl: './house-desing.component.html',
  styleUrls: ['./house-desing.component.scss']
})

export class HouseDesingComponent implements OnInit, CanvasMouseEventListener {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('ghostcanvas', { static: true }) ghostcanvas: ElementRef<HTMLCanvasElement>;
  canvasHandler: CanvasHandler;
  static component: HouseDesingComponent;
  editingGround: Ground;
  house: House;
  selectedFloor: Floor;
  floorsShowInfo = {"first": true, "second": false};
  showingProfile: boolean = false;
  saved: boolean = false;
  
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

  constructor(private router: Router, public drawingService: DrawingService, private server: ServerService, private _snackBar: MatSnackBar, private exitConfirmation: MatDialog) {    
  }

  registerChange(object: Drawable) {
    if (this.drawingService.isMovingExtra || this.drawingService.isAddingBathroom || this.drawingService.isAddingBedroom || this.drawingService.isAddingRoom) {
      return;
    }
    HouseDesingComponent.component.drawingService.snapshotCareTaker.backup(object);
    this.saved = false;
  }

  
  canUndoRedo(): boolean {
    return !(this.drawingService.isMovingExtra || this.drawingService.isAddingBathroom || this.drawingService.isAddingBedroom || this.drawingService.isAddingRoom);
  }

  ngOnInit(): void {
    this.canvasHandler = new CanvasHandler(this.canvas, this.ghostcanvas, this);
    this.drawingService.canvasHandler = this.canvasHandler;
    HouseDesingComponent.component = this;
    Dimention.meterPixelSize = 24;
    Dimention.borderSize = 5;
    this.editingGround = this.drawingService.editingGround;
    this.house = this.editingGround.getHouse();
    this.selectedFloor = this.house.getFirstFloor();
    const centerXY = this.canvasHandler.getCenter(this.editingGround.getPixelWidth(), this.editingGround.getPixelHeight());
    this.editingGround.setX(0);
    this.editingGround.setY(0);
    this.editingGround.dx = centerXY[0];
    this.editingGround.dy = centerXY[1];
    setInterval(this.refresh, 20);
    this.drawingService.canvas = this.canvas;
    this.drawingService.ghostcanvas = this.ghostcanvas;
  }

  changeTab(value: number) {
    this.drawingService.isAddingBedroom = value == 1;
    this.drawingService.isAddingBathroom = value == 2;    
    this.drawingService.isAddingRoom = value == 3;
    this.drawingService.isMovingStair = value == 0;
    this.drawingService.isMovingExtra = value == 0;
  }

  changeSelectedFloor(num: number) {
    if (num == 1) {
      this.selectedFloor = this.house.getFirstFloor();
      this.floorsShowInfo.first = true; 
      this.floorsShowInfo.second = false;
    } else {
      this.selectedFloor = this.house.getSecondFloor();
      this.floorsShowInfo.first = false; 
      this.floorsShowInfo.second = true;
    }
  };

  getFirstFloor() {
    return this.editingGround.getHouse().getFirstFloor();
  }

  getSecondFloor() {
    return this.editingGround.getHouse().getSecondFloor();
  }

  getFloor(id: number): Floor {
    if (id == 1) return this.house.getFirstFloor();
    else return this.house.getSecondFloor();
  }

  refresh(): void {
    var context = HouseDesingComponent.component;
    context.refreshCanvas();
  }

  setPrincipalBedroom(bedroom: Bedroom) {
    bedroom.isMainBedroom = true;
    bedroom.kind = Room.MAIN_BEDROOM;
    this.house.getBedrooms().forEach(element => {
      if (element != bedroom) { 
        (element as Bedroom).isMainBedroom = false;
        element.kind = Room.BEDROOM;
      }
    });
    this.drawingService.snapshotCareTaker.backup(this.house);
    this.saved = false;
  }

  moveStair() {
    this.drawingService.isMovingStair = !this.drawingService.isMovingStair;
    if (this.drawingService.isMovingStair) {
      this.canvasHandler.setListening(this.house.stair);
    } else {
      this.canvasHandler.setListening(null);
    }
  }

  rotateStair() {
    this.drawingService.snapshotCareTaker.backup(this.house.stair);
    this.house.stair.changeAngle(this.house.stair.angle + 90);
  }

  undo() {
    if (this.drawingService.isAddingBathroom) this.drawingService.snapshotCareTaker.addState(this.drawingService.addingBathroom);
    else if (this.drawingService.isAddingBedroom) this.drawingService.snapshotCareTaker.addState(this.drawingService.addingBedroom);
    else if (this.drawingService.isAddingRoom) this.drawingService.snapshotCareTaker.addState(this.drawingService.addingRoom);
    else if (this.canvasHandler.isListening()) this.drawingService.snapshotCareTaker.addState(this.drawingService.canvasHandler.getObjectListening());
    else this.drawingService.snapshotCareTaker.addState(this.house);
    this.drawingService.snapshotCareTaker.undo();
  }

  redo() {
    this.drawingService.snapshotCareTaker.redo();
  }

  deleteRoom(room: Room) {
    this.saved = false;
    this.drawingService.snapshotCareTaker.backup(this.house);
    room.isSelected = false;
    this.canvasHandler.setListening(null);
    this.house.deleteRoom(room);
  }

  selectRoom(room: Room) {
    room.isSelected = true;
    this.canvasHandler.setListening(room);
  }

  unselectRoom(room: Room) {
    room.isSelected = false;
    this.canvasHandler.setListening(null);
  }

  refreshCanvas() {
    this.canvasHandler.clearCanvas(this.canvasHandler.getCTX());
    this.canvasHandler.drawGrid();
    const centerXY = this.canvasHandler.getCenter(this.editingGround.getPixelWidth(), this.editingGround.getPixelHeight());
    new LabeledSizeShape(this.editingGround)
      .draw(this.canvasHandler.getCTX())
      .drawSizeLabel(this.canvasHandler.getCTX(), centerXY);
    new BorderedShape(this.editingGround.getHouse().getFirstFloor())
      .draw(this.canvasHandler.getCTX());
    this.editingGround.getHouse().drawRooms(this.canvasHandler.getCTX(), this.editingGround.getHouse().getFirstFloor().number);  
    if (this.house.hasSecondFloor) {
      this.house.getSecondFloor().calculateDxDy();
    }
    if(this.floorsShowInfo.second || this.drawingService.addingBedroom.floorNumber == 2 || this.drawingService.addingBathroom.floorNumber == 2) {
      new BorderedShape(this.editingGround.getHouse().getSecondFloor())
        .draw(this.canvasHandler.getCTX());
        this.editingGround.getHouse().drawRooms(this.canvasHandler.getCTX(), this.editingGround.getHouse().getSecondFloor().number); 
    }
    if (this.house.hasStair()) {
      this.house.stair.draw(this.canvasHandler.getCTX());
    }
    // If adding bedroom
    if (this.drawingService.isAddingBedroom) {
      new IconShape(this.drawingService.addingBedroom)
        .draw(this.canvasHandler.getCTX())
        .drawIcon(this.canvasHandler.getCTX(), this.drawingService.addingBedroom.kind);
      this.drawingService.addingBedroom.drawExtras(this.canvasHandler.getCTX());
    }

    // If adding bathroom
    if (this.drawingService.isAddingBathroom) {
      new IconShape(this.drawingService.addingBathroom)
        .draw(this.canvasHandler.getCTX())
        .drawIcon(this.canvasHandler.getCTX(), this.drawingService.addingBathroom.kind,
          this.drawingService.addingBathroom.getPixelWidth() - 5, this.drawingService.addingBathroom.getPixelHeight() - 5, this.drawingService.addingBathroom.angle);
    }

    // If adding room
    if (this.drawingService.isAddingRoom) {
      new IconShape(this.drawingService.addingRoom)
        .draw(this.canvasHandler.getCTX())
        .drawIcon(this.canvasHandler.getCTX(), this.drawingService.addingRoom.kind);
    }
  }

  showProfile() {
    this.showingProfile = !this.showingProfile;
  }

  exit() {
    this.router.navigate(["/designs-page"]);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponentExample, {
      duration: 3 * 1000,
    });
  }

  saveDesign() {
    this.openSnackBar();

    if (this.editingGround._id == undefined || this.editingGround == null) {
      this.server.saveDesign(this.editingGround).subscribe(data => {
        this.editingGround._id = (data as any).data;
        this.saved = true;
      });
    } else {
      this.server.updateDesign(this.editingGround).subscribe(data => {
        console.log((data as any).ok);
        this.saved = true;
      });
    }
  }
}


/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'save-snack',
  templateUrl: 'save-snack.html',
  styles: [`
    .example-pizza-party {
      text-align: center;
      justify-content: center;
      width: 100%;
      color: var(--gunmetal);
    }
  `],
})
export class SnackBarComponentExample {
  constructor() {}
}

@Component({
  selector: 'exit-confirmation',
  templateUrl: 'exit-confirmation.html',
})
export class ExitConfirmationDialog {}