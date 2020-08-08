import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CondoService } from 'src/app/services/condo.service';
import { Router } from '@angular/router';
import { CondoProject } from 'src/app/logic/condo/condo-project';

@Component({
  selector: 'app-condo-management',
  templateUrl: './condo-management.component.html',
  styleUrls: ['./condo-management.component.scss']
})
export class CondoManagementComponent implements OnInit {
  searchText: string = "";
  filteredCondos: CondoProject[] = [];

  constructor(public condoService: CondoService, private route: Router) {

  }

  filter(){
    console.log("here");
    this.filteredCondos = this.condoService.condoProjects.filter(element => {
      return element.name.toLowerCase().includes(this.searchText.toLowerCase()) || this.searchText == "";
    });
  }

  editCondo(condo) {
    this.condoService.isEditing = true;
    this.condoService.isAdding = false;
    this.condoService.condoEditing = condo;
    this.route.navigate(["condo-editing"]);
  }

  ngOnInit(): void {
    this.filteredCondos = this.condoService.condoProjects;
  }

  goToAdding(): void {
    this.condoService.isEditing = false;
    this.condoService.isAdding = true;
    this.route.navigate(["condo-editing"]);
  }

  
}
