import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Dimention } from 'src/app/logic/generalSettings/dimention';
import { Ground } from 'src/app/logic/modeling/ground';
import { Router } from '@angular/router';
import { DrawingService } from 'src/app/services/drawing.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-designs-page',
  templateUrl: './designs-page.component.html',
  styleUrls: ['./designs-page.component.scss']
})
export class DesignsPageComponent implements OnInit, OnDestroy {
  @ViewChild('canvasdesigns', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  static component: DesignsPageComponent;
  filteredDesigns: Ground[] = [];
  checked150: boolean = true;
  checked200: boolean = true;
  checked300: boolean = true;
  checked400: boolean = true;
  checked500: boolean = true;
  
  constructor(private server: ServerService,public mainService: MainService, private router: Router, private drawingService: DrawingService) { 
    
  }

  ngOnInit(): void {
    this.filteredDesigns = this.mainService.designs;
    DesignsPageComponent.component = this;
    setInterval(this.prepareImages, 20);
    Dimention.meterPixelSize = 5;
    Dimention.borderSize = 1;
  }

  ngOnDestroy(): void {

  }
  
  prepareImages() {
    DesignsPageComponent.component.mainService.designs.forEach(house => {
      house.createImage(DesignsPageComponent.component.canvas.nativeElement);
    });
  }
  
  editDesign(design: Ground) {
    this.drawingService.editingGround = design;
    this.router.navigate(["/house-design"]);
  }

  delete(design: Ground) {
    this.mainService.designs = this.mainService.designs.filter(designP => {
      return design != designP;
    })
    this.server.deleteDesign(design).subscribe (data => {
      console.log(data);
    });
    this.filterDesigns();
  }

  goToDesign() {
    this.router.navigate(["/init-design"]);
  }

  filterDesigns() {
    this.filteredDesigns = this.mainService.designs.filter(design => {
        if (design.size == 150) {
          return this.checked150;
        } else if (design.size == 200) {
          return this.checked200;
        } else if (design.size == 300) {
          return this.checked300;
        } else if (design.size == 400) {
          return this.checked400;
        } else return this.checked500;
    });
  }
}
