import { Component, OnInit, ElementRef } from '@angular/core';
import { CanvasHandler } from 'src/app/view-logic/canvas-handler';
import { Bedroom } from 'src/app/logic/modeling/bedroom';
import { HouseDesingComponent } from 'src/app/pages/house-desing/house-desing.component';
import { Floor } from 'src/app/logic/modeling/floor';
import { House } from 'src/app/logic/modeling/house';
import { DrawingService } from 'src/app/services/drawing.service';
import { Drawable } from 'src/app/logic/drawing/drawable';

@Component({
  selector: 'app-adding-bedroom',
  templateUrl: './adding-bedroom.component.html',
  styleUrls: ['./adding-bedroom.component.scss']
})

export class AddingBedroomComponent implements OnInit {
  canvas: ElementRef<HTMLCanvasElement>;
  ghostcanvas: ElementRef<HTMLCanvasElement>;
  canvasHandler: CanvasHandler;
  addingBedroom: Bedroom;
  house: House = new House();

  constructor(public drawingService: DrawingService) {
    this.house = this.drawingService.editingGround.getHouse();
    this.canvas = drawingService.canvas;
    this.ghostcanvas = drawingService.canvas;
  }

  ngOnInit(): void {
    this.resetAddingBedroom();
    this.changeAddingBedroomFloor(1);
  }

  resetAddingBedroom() {
    this.addingBedroom = new Bedroom(1, 1);
    this.addingBedroom.isSelected = true;
    this.addingBedroom.setBaseFloor(this.house.getFirstFloor());
    this.drawingService.addingBedroom = this.addingBedroom;
  }

  getFloor(id: number): Floor {
    if (id == 1) return this.house.getFirstFloor();
    else return this.house.getSecondFloor();
  }

  startAdding() {
    this.drawingService.isAddingBedroom = true;
    this.drawingService.canvasHandler.setListening(this.addingBedroom);
  }

  stopAdding() {
    this.drawingService.isAddingBedroom = false; 
    this.drawingService.canvasHandler.setListening(null);
    this.addingBedroom.closet.isSelected = false;
    this.resetAddingBedroom();
  }

  startMovingExtra(drawable: Drawable) {
    this.drawingService.isMovingExtra = true;
    drawable.isSelected = true;
    this.drawingService.canvasHandler.setListening(drawable);
  }

  stopMovingExtra(drawable: Drawable) {
    this.drawingService.isMovingExtra = false;
    drawable.isSelected = false;
    this.drawingService.canvasHandler.setListening(this.addingBedroom);
  }

  formatLabel(value: number) {
    return value + 'm';
  }

  changeAddingBedroomWidth(value: number) {
    this.addingBedroom.setWidth(value);
  }

  changeAddingBedroomHeight(value: number) {
    this.addingBedroom.setHeight(value);
  }

  changeAddingBedroomFloor(floorNumber: number) {
    var floor = this.getFloor(floorNumber);
    this.addingBedroom.setBaseFloor(floor);
    this.addingBedroom.setX(0);
    this.addingBedroom.setY(0);
  }

  addBedroom() {
    this.drawingService.snapshotCareTaker.backup(this.house);
    this.addingBedroom.isSelected = false;
    this.house.rooms.push(this.addingBedroom);
    this.stopAdding();
  }

  rotateExtra(drawable: Drawable) {
    drawable.angle = drawable.angle + 90;
  }
}
