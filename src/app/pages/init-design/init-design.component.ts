import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Ground } from 'src/app/logic/modeling/ground';
import { CanvasHandler } from 'src/app/view-logic/canvas-handler';
import { Floor } from 'src/app/logic/modeling/floor';
import { CanvasMouseEventListener } from 'src/app/view-logic/canvas-mouse-event-listener';
import { DrawingService } from 'src/app/services/drawing.service';
import { Router } from '@angular/router';
import { LabeledSizeShape } from 'src/app/logic/decorator/labeled-size-shape';
import { BorderedShape } from 'src/app/logic/decorator/bordered-shape';
import { Drawable } from 'src/app/logic/drawing/drawable';
import { Architect } from 'src/app/logic/architect/architect';
import { JuniorArchitect } from 'src/app/logic/architect/junior-architect';
import { Senior1Architect } from 'src/app/logic/architect/senior1-architect';
import { Senior2Architect } from 'src/app/logic/architect/senior2-architect';
import { MainService } from 'src/app/services/main.service';
import { Dimention } from 'src/app/logic/generalSettings/dimention';

@Component({
  selector: 'app-init-design',
  templateUrl: './init-design.component.html',
  styleUrls: ['./init-design.component.scss']
})

export class InitDesignComponent implements OnInit, CanvasMouseEventListener, AfterContentInit {
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
  filteredArchitects: Architect[] = [];
  
  constructor(private drawingService: DrawingService, private router: Router, private mainService: MainService) {
  
  }
  
  registerChange(object: Drawable) {
    throw new Error("Method not implemented.");
  }

  ngAfterContentInit() {
    this.changeArquitects();
  }

  assignArchitect(architect: Architect) {
    this.ground.architect.firstname = architect.firstname;
    this.ground.architect.lastname = architect.lastname;
    this.ground.architect.lastname2 = architect.lastname2;
    this.ground.architect.experienceyears = architect.experienceyears;
    this.ground.architect.level = architect.level;
    this.nextPhase();
  }

  changeArquitects() {
    console.log(this.mainService.architects);
    var junior = new JuniorArchitect("", "", "", 0);
    var senior1 = new Senior1Architect("", "", "", 0);
    var senior2 = new Senior2Architect("", "", "", 0);
    junior.setNext(senior1);
    senior1.setNext(senior2);
    junior.design(this.ground);
    this.filteredArchitects = this.mainService.architects.filter(archi => {
      return archi.level == this.ground.architect.level;
    });
  }

  ngOnInit(): void {
    this.canvasHandler = new CanvasHandler(this.canvas, this.ghostcanvas, this);
    Dimention.meterPixelSize = 20;
    Dimention.borderSize = 5;
    InitDesignComponent.component = this;
    this.ground = new Ground(this.selectedSize);
    this.ground.isDragable = false;
    this.firstFloor = this.ground.getHouse().getFirstFloor();
    this.secondFloor = this.ground.getHouse().getSecondFloor();
    this.drawGround(this.selectedSize, true);
    this.changeArquitects();
    setInterval(this.refresh, 1);
  }
  
  drawGround(size: number, displayText: boolean) {
    this.ground.size = size;
    this.ground.setWidth(Math.sqrt(size));
    this.ground.setHeight(Math.sqrt(size));
    const centerXY = this.canvasHandler.getCenter(this.ground.getPixelWidth(), this.ground.getPixelHeight());
    this.ground.setX(0);
    this.ground.setY(0);
    this.ground.dx = centerXY[0];
    this.ground.dy = centerXY[1];
    this.canvasHandler.clearCanvas(this.canvasHandler.ctx);
    this.ground.draw(this.canvasHandler.ctx);
  }

  nextPhase() {
    this.activePhase += 1;
    if (this.activePhase == 1) {
      this.drawGround(this.selectedSize, false);
      this.firstFloor.setBaseFloor(this.ground);
      this.drawFirstFloor(true);
      this.firstFloor.isSelected = true;
      this.canvasHandler.setObjectListening(this.firstFloor);
    }
    if (this.activePhase == 2) {
      this.drawGround(this.selectedSize, false);
      this.drawFirstFloor(false);
      this.drawSecondFloor(true);
      this.firstFloor.isSelected = false;
      this.secondFloor.isSelected = true;
      this.canvasHandler.setObjectListening(this.secondFloor);
    }
  }

  backPhase() {
    this.activePhase -= 1;
    if (this.activePhase == 1) {
      this.drawGround(this.selectedSize, false);
      this.drawFirstFloor(false);
      this.firstFloor.isSelected = true;
      this.canvasHandler.setObjectListening(this.firstFloor);
    }
    if (this.activePhase == 0) {
      this.drawGround(this.selectedSize, false);
      this.firstFloor.isSelected = false;
      this.canvasHandler.setObjectListening(null);
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
      this.firstFloor.setX((this.ground.getWidth() - this.firstFloor.getWidth())/2);
      this.firstFloor.setY((this.ground.getHeight() - this.firstFloor.getHeight())/2);
    }
    this.refresh();
  }

  drawSecondFloor(center: boolean) {
    if (center) {
      this.secondFloor.setX((this.firstFloor.getWidth() - this.secondFloor.getWidth())/2);
      this.secondFloor.setY((this.firstFloor.getHeight() - this.secondFloor.getHeight())/2);
    }
    this.refresh();
  }

  round(value: number) {
    return Math.floor(value);
  }

  refresh(): void {
    var context = InitDesignComponent.component;
    context.canvasHandler.clearCanvas(context.canvasHandler.ctx);
    new LabeledSizeShape(context.ground)
      .draw(context.canvasHandler.ctx)
      .drawSizeLabel(context.canvasHandler.ctx, context.canvasHandler.getCenter(context.ground.getPixelWidth(), context.ground.getPixelHeight()));
    //context.ground.draw(context.canvasHandler.ctx);
    if (context.activePhase >= 1) {
      new BorderedShape(context.firstFloor).draw(context.canvasHandler.ctx);
      //context.firstFloor.draw(context.canvasHandler.ctx);
    }
    if (context.activePhase == 2) {
      if (context.secondFloorSelected) {
        new BorderedShape(context.secondFloor).draw(context.canvasHandler.ctx);
        //context.secondFloor.draw(context.canvasHandler.ctx);
      }
    }
  }

  changeChecked(checked: boolean) {
    if (checked) {
      this.ground.getHouse().hasSecondFloor = true;
      this.drawSecondFloor(true);
    } else {
      this.ground.getHouse().hasSecondFloor = false;
      this.drawSecondFloor(false);
    }
  }

  endInit() {
    //this.ground.getHouse().firstFloor = this.firstFloor;
    //this.ground.getHouse().secondFloor = this.secondFloor;
    this.drawingService.editingGround = this.ground;
    this.router.navigate(["house-design"]);
  }
}