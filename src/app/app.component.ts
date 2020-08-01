import { Component } from '@angular/core';
import { Color } from './logic/generalSettings/color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pry3-Condominios';
  constructor() {
    Color.init();
  }
}
