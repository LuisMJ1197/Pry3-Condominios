import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/navbars/header/header.component';
import { HeaderVerticalComponent } from './components/navbars/header-vertical/header-vertical.component';
import { InitDesignComponent } from './pages/init-design/init-design.component';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HouseDesingComponent } from './pages/house-desing/house-desing.component';
import { AddingBedroomComponent } from './components/adding-bedroom/adding-bedroom.component';
import { AddingBathroomComponent } from './components/adding-bathroom/adding-bathroom.component';
import { RoomManageComponent } from './components/room-manage/room-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderVerticalComponent,
    InitDesignComponent,
    HouseDesingComponent,
    AddingBedroomComponent,
    AddingBathroomComponent,
    RoomManageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
