import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Ground } from 'src/app/logic/modeling/ground';
import { CanvasHandler } from 'src/app/view-logic/canvas-handler';
import { Floor } from 'src/app/logic/modeling/floor';
import { CanvasMouseEventListener } from 'src/app/view-logic/canvas-mouse-event-listener';
import { Color } from 'src/app/logic/generalSettings/color';

@Component({
  selector: 'app-init-design',
  templateUrl: './init-design.component.html',
  styleUrls: ['./init-design.component.scss']
})

export class InitDesignComponent implements OnInit, CanvasMouseEventListener {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('ghostcanvas', { static: true }) ghostcanvas: ElementRef<HTMLCanvasElement>;
  canvasHandler: CanvasHandler;
  ground: Ground;
  firstFloor: Floor;
  secondFloor: Floor;
  canvasHeight: number;
  canvasWidth: number;
  activePhase: number = 0;
  selectedSize: number = 150;
  sizes: number[] = [150, 200, 300, 400, 500];
  firstFloorSize: number = 1;
  secondFloorSize: number = 0;
  secondFloorSelected: boolean = false;
  static component: InitDesignComponent;
  constructor() {
  
  }

  ngOnInit(): void {
    this.canvasHandler = new CanvasHandler(this.canvas, this.ghostcanvas, this);
    InitDesignComponent.component = this;
    this.drawGround(this.selectedSize, true);
    setInterval(this.refresh, 1);
  }
  
  drawGround(size: number, displayText: boolean) {
    this.canvasHandler.clearCanvas(this.canvasHandler.ctx);
    this.ground = new Ground(size);
    this.ground.isDragable = false;
    const centerXY = this.canvasHandler.getCenter(this.ground.getPixelWidth(), this.ground.getPixelHeight());
    this.ground.setX(centerXY[0]);
    this.ground.setY(centerXY[1]);
    this.ground.setShowArea(displayText);
    this.ground.draw(this.canvasHandler.ctx);
  }

  nextPhase() {
    this.activePhase += 1;
    if (this.activePhase == 1) {
      this.drawGround(this.selectedSize, false);
      this.firstFloor = this.ground.getHouse().getFirstFloor();
      this.secondFloor = this.ground.getHouse().getSecondFloor();
      this.firstFloor.setBaseFloor(this.ground);
      this.drawFirstFloor(true);
      this.canvasHandler.setObjectListening(this.firstFloor);
      this.canvasHandler.listening = true;
    }
    if (this.activePhase == 2) {
      this.drawGround(this.selectedSize, false);
      this.drawFirstFloor(false);
      this.drawSecondFloor(true);
      this.canvasHandler.setObjectListening(this.secondFloor);
      this.canvasHandler.listening = true;
    }
  }

  backPhase() {
    this.activePhase -= 1;
    if (this.activePhase == 1) {
      this.drawGround(this.selectedSize, false);
      this.firstFloor = this.ground.getHouse().getFirstFloor();
      this.secondFloor = this.ground.getHouse().getSecondFloor();
      this.firstFloor.setBaseFloor(this.ground);
      this.drawFirstFloor(true);
      this.canvasHandler.setObjectListening(this.firstFloor);
      this.canvasHandler.listening = true;
    }
    if (this.activePhase == 0) {
      this.drawGround(this.selectedSize, false);
      this.canvasHandler.listening = false;
    }
  }

  formatLabel(value: number) {
    return value + 'm';
  }

  changeFirstFloorWidth(value: number) {
    this.firstFloor.setWidth(value);
    this.drawFirstFloor(false);
  }

  changeFirstFloorHeight(value: number) {
    this.firstFloor.setHeight(value);
    this.drawFirstFloor(false);
  }

  changeSecondFloorWidth(value: number) {
    this.secondFloor.setWidth(value);
    this.drawSecondFloor(false);
  }

  changeSecondFloorHeight(value: number) {
    this.secondFloor.setHeight(value);
    this.drawSecondFloor(false);
  }

  drawFirstFloor(center: boolean) {
    if (center) {
      this.firstFloor.setX(this.ground.getX() + (this.ground.getPixelWidth() - this.firstFloor.getPixelWidth())/2);
      this.firstFloor.setY(this.ground.getY() + (this.ground.getPixelHeight() - this.firstFloor.getPixelHeight())/2);
    }
    this.refresh();
  }

  drawSecondFloor(center: boolean) {
    if (center) {
      this.secondFloor.setX(this.firstFloor.getX() + (this.firstFloor.getPixelWidth() - this.firstFloor.getPixelWidth())/2);
      this.secondFloor.setY(this.firstFloor.getY() + (this.firstFloor.getPixelHeight() - this.firstFloor.getPixelHeight())/2);
    }
    this.refresh();
  }

  round(value: number) {
    return Math.floor(value);
  }

  refresh(): void {
    InitDesignComponent.component.canvasHandler.clearCanvas(InitDesignComponent.component.canvasHandler.ctx);
    InitDesignComponent.component.ground.draw(InitDesignComponent.component.canvasHandler.ctx);
    if (InitDesignComponent.component.activePhase >= 1) {
      InitDesignComponent.component.firstFloor.draw(InitDesignComponent.component.canvasHandler.ctx);
    }
    if (InitDesignComponent.component.activePhase == 2) {
      if (InitDesignComponent.component.secondFloorSelected) {
        InitDesignComponent.component.secondFloor.draw(InitDesignComponent.component.canvasHandler.ctx);
      }
    }
  }

  changeChecked(checked: boolean) {
    if (checked) {
      this.drawSecondFloor(true);
    } else {
      this.drawSecondFloor(false);
    }
  }

  endInit() {
    
  }

  /*drawArrow(ctx, fromx, fromy, tox, toy){
    var headlen = 10;

    var angle = Math.atan2(toy-fromy,tox-fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.strokeStyle = "#cc0000";
    ctx.lineWidth = 5;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    ctx.strokeStyle = "#cc0000";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = "#cc0000";
    ctx.fill();
}
*/
  //㎡
}
/*this.ctx.beginPath();
    this.drawArrow(
      this.ctx, centerXY[0] - 10, centerXY[1],
      centerXY[0] - 10, centerXY[1] + size
    );
    this.ctx.stroke();*/