import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { MatDialog } from '@angular/material/dialog';
import { Architect } from 'src/app/logic/architect/architect';
import { MainService } from 'src/app/services/main.service';
import { JuniorArchitect } from 'src/app/logic/architect/junior-architect';

@Component({
  selector: 'app-architect-adding',
  templateUrl: './architect-adding.component.html',
  styleUrls: ['./architect-adding.component.scss']
})
export class ArchitectAddingComponent implements OnInit {
  addingArchitect: Architect;
  levels: string[] = Architect.levels;
  constructor(private mainService: MainService ,private server: ServerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.resetArchitect();
  }

  resetArchitect() {
    this.addingArchitect = new JuniorArchitect("", "", "", 0);
  }

  addArchitect() {
    if (this.validateArchitectInfo()) {
      this.server.saveArchitect(this.addingArchitect).subscribe(data=>{
        if ((data as any).ok == 1) {
          this.mainService.architects.push(this.addingArchitect);
          this.showMessage("Architecto registrado con éxito.");
        } else {
          this.showMessage("Architecto no registrado.");
        }
      });
      this.resetArchitect();
    } else {
      this.showMessage("Debe ingresar todos los datos.");
    }
  }

  showMessage(text: string) {
    alert(text);
  }

  validateArchitectInfo(): boolean {
    return this.addingArchitect.firstname.length > 0
      && this.addingArchitect.lastname.length > 0
      && this.addingArchitect.lastname2.length > 0
      && this.addingArchitect.experienceyears >= 0;
  }
}
