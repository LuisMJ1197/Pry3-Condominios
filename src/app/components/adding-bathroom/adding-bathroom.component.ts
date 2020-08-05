import { Component, OnInit, ElementRef } from '@angular/core';
import { CanvasHandler } from 'src/app/view-logic/canvas-handler';
import { Bathroom } from 'src/app/logic/modeling/bathroom';
import { House } from 'src/app/logic/modeling/house';
import { DrawingService } from 'src/app/services/drawing.service';
import { Floor } from 'src/app/logic/modeling/floor';

@Component({
  selector: 'app-adding-bathroom',
  templateUrl: './adding-bathroom.component.html',
  styleUrls: ['./adding-bathroom.component.scss']
})
export class AddingBathroomComponent implements OnInit {
  canvas: ElementRef<HTMLCanvasElement>;
  ghostcanvas: ElementRef<HTMLCanvasElement>;
  canvasHandler: CanvasHandler;
  addingBathroom: Bathroom;
  house: House = new House();

  constructor(public drawingService: DrawingService) {
    this.house = this.drawingService.editingGround.getHouse();
    this.canvas = drawingService.canvas;
    this.ghostcanvas = drawingService.canvas;
  }
  
  ngOnInit(): void {
    this.resetAddingBathroom();
    this.changeAddingBathroomFloor(1);
  }

  resetAddingBathroom() {
    this.addingBathroom = new Bathroom(this.house.getBathrooms().length + 1);
    this.addingBathroom.setKind(Bathroom.SIMPLE);
    this.addingBathroom.isSelected = true;
    this.addingBathroom.setBaseFloor(this.house.getFirstFloor());
    this.drawingService.addingBathroom = this.addingBathroom;
  }

  getFloor(id: number): Floor {
    if (id == 1) return this.house.getFirstFloor();
    else return this.house.getSecondFloor();
  }

  startAdding() {
    this.drawingService.isAddingBathroom = true;
    this.drawingService.canvasHandler.setListening(this.addingBathroom);
  }

  stopAdding() {
    this.drawingService.isAddingBathroom = false; 
    this.drawingService.canvasHandler.setListening(null);
    this.resetAddingBathroom();
  }

  changeAddingBathroomFloor(floorNumber: number) {
    var floor = this.getFloor(floorNumber);
    this.addingBathroom.setBaseFloor(floor);
    this.addingBathroom.setX(0);
    this.addingBathroom.setY(0);
  }

  addBathroom() {
    this.drawingService.snapshotCareTaker.backup(this.house);
    this.addingBathroom.isSelected = false;
    this.house.rooms.push(this.addingBathroom);
    this.stopAdding();
  }

  rotateBathroom() {
    this.addingBathroom.changeAngle(this.addingBathroom.angle + 90);
  }
}
