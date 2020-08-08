import { Component, OnInit } from '@angular/core';
import { HouseDesingComponent } from 'src/app/pages/house-desing/house-desing.component';

@Component({
  selector: 'app-header-vertical',
  templateUrl: './header-vertical.component.html',
  styleUrls: ['./header-vertical.component.scss']
})
export class HeaderVerticalComponent implements OnInit {

  constructor(private houseDesign: HouseDesingComponent) { }

  ngOnInit(): void {
  }

  save() {
    this.houseDesign.saveDesign();
  }

  exit() {
    this.houseDesign.exit();
  }

  showProfile() {
    this.houseDesign.showProfile();
  }
}
