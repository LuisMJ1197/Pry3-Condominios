import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CondoService } from 'src/app/services/condo.service';
import { Dimention } from 'src/app/logic/generalSettings/dimention';
import { Ground } from 'src/app/logic/modeling/ground';
import { MainService } from 'src/app/services/main.service';
import { Block } from 'src/app/logic/condo/block';
import { CondoHouse } from 'src/app/logic/condo/condo-house';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonArea } from 'src/app/logic/condo/common-area';
import { CondoProject } from 'src/app/logic/condo/condo-project';
import { Owner } from 'src/app/logic/condo/owner';

@Component({
  selector: 'app-condo-editing',
  templateUrl: './condo-editing.component.html',
  styleUrls: ['./condo-editing.component.scss']
})
export class CondoEditingComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  static component: CondoEditingComponent;
  isAdding: boolean = false;
  selectedAddingSize: number = 150;
  selectedCantHouses: number = 4;
  filteredDesigns: Ground[] = [];
  selectedDesign: Ground = null;
  bloques: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
  selectedCantones: any = [];
  selectedDistrito: any = [];
  selectedHouse: CondoHouse;
  commonAreas: string[] = CommonArea.commonAreas;
  owner: Owner = new Owner("", "", "");

  constructor(private snack: MatSnackBar, private router: Router, private server: ServerService,public condoService: CondoService, public mainservice: MainService) { }

  ngOnInit(): void {
    Dimention.meterPixelSize = 5;
    Dimention.borderSize = 1;
    CondoEditingComponent.component = this;
    this.changeSelectedProvincia();
    setInterval(this.prepareImages, 20);
  }

  changeSelectedProvincia(){
    this.mainservice.directions.forEach(provincia => {
      if (provincia.provincia == this.condoService.condoEditing.provincia) {
        this.selectedCantones = provincia.cantones;
        this.changeSelectedCanton();
      }
    })
  }

  changeSelectedCanton() {
    this.mainservice.directions.forEach(provincia => {
      if (provincia.provincia == this.condoService.condoEditing.provincia) {
        provincia.cantones.forEach(canton => {
          if (canton.canton == this.condoService.condoEditing.canton) this.selectedDistrito = canton.distritos;
        })
      } 
    })
  }

  prepareImages() {
    CondoEditingComponent.component.condoService.condoEditing.blocks.forEach(block => {
      block.houses.forEach(house => {
        house.createImage(CondoEditingComponent.component.canvas.nativeElement);
      });
    });

    CondoEditingComponent.component.filteredDesigns.forEach(design => {
      design.createImage(CondoEditingComponent.component.canvas.nativeElement);
    });
  }

  filterDesignsBySelectedSize() {
    this.filteredDesigns = this.mainservice.designs.filter(design =>{ return design.size == this.selectedAddingSize});
    return this.filteredDesigns;
  }

  addBlock() {
    var newBlock = new Block(this.bloques[this.condoService.condoEditing.blocks.length]);
    for (var i = 0; i < this.selectedCantHouses; i++) {
      newBlock.addHouse(new CondoHouse(this.selectedDesign.clone()));
    }
    this.condoService.condoEditing.blocks.push(newBlock);
    this.selectedDesign = null;
    this.isAdding = false;
  }

  stopAddingBlock() {
    this.selectedDesign = null;
  }

  assignLetters() {
    var i = 0;
    this.condoService.condoEditing.blocks.forEach(block => {
      block.letter = this.bloques[i++];
    });
  }

  deleteBlock(block) {
    this.condoService.condoEditing.blocks = this.condoService.condoEditing.blocks.filter(blockP => {
      return block != blockP;
    })
    this.assignLetters();
  }

  cancel() {
    this.router.navigate(["condo-management"]);
  }

  save() {
    if (this.condoService.condoEditing.name == ""
      || this.condoService.condoEditing.provincia == ""
      || this.condoService.condoEditing.canton == ""
      || this.condoService.condoEditing.distrito == ""
      || this.condoService.condoEditing.contactname ==""
      || this.condoService.condoEditing.phonenumber == "") {
        alert("Debe ingresar los datos del proyecto");
        return;
    }
    this.snack.openFromComponent(SavingSnack, {
      duration: 3 * 1000,
    });

    console.log(this.condoService.condoEditing);
    if (this.condoService.condoEditing._id == null) {
      
      this.server.saveCondoProject(this.condoService.condoEditing).subscribe(data => {
        if ((data as any).ok == 1) {
          console.log((data as any).data);
          this.condoService.condoEditing._id = (data as any).data;
          this.condoService.condoProjects.push(this.condoService.condoEditing);
        }
      });
    } else {
      this.server.updateCondoProject(this.condoService.condoEditing).subscribe(data => {
        console.log(data);
      });
    }
    this.router.navigate(["condo-management"]);
  }

  showOwner(house: CondoHouse) {
    this.selectedHouse = house;
    if (house.owner == null) {
      this.owner = new Owner("", "", "");  
      return;
    }
    this.owner.firstname = house.owner.firstname;
    this.owner.lastname1 = house.owner.lastname1;
    this.owner.lastname2 = house.owner.lastname2;
  }

  setOwner() {
    this.selectedHouse.setOwner(new Owner(this.owner.firstname, this.owner.lastname1, this.owner.lastname2));
    this.owner = new Owner("", "", "");
  }

  
  exit() {
    this.router.navigate(["condo-management"]);
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
export class SavingSnack {
  constructor() {}
}