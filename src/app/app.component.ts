import { Component } from '@angular/core';
import { Resource } from './logic/generalSettings/resource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pry3-Condominios';
  constructor() {
    Resource.init();
  }
}
