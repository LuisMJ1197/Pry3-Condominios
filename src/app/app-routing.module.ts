import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitDesignComponent } from './pages/init-design/init-design.component';
import { HouseDesingComponent } from './pages/house-desing/house-desing.component';


const routes: Routes = [
  {
    path: 'init-design',
    component: InitDesignComponent
  },
  {
    path: 'house-design',
    component: HouseDesingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
