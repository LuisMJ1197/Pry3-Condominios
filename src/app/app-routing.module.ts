import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitDesignComponent } from './pages/init-design/init-design.component';
import { HouseDesingComponent } from './pages/house-desing/house-desing.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CondoManagementComponent } from './pages/condo-management/condo-management.component';
import { CondoEditingComponent } from './pages/condo-editing/condo-editing.component';
import { ArchitectAddingComponent } from './pages/architect-adding/architect-adding.component';
import { DesignsPageComponent } from './pages/designs-page/designs-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'condo-management',
    component: CondoManagementComponent
  },
  {
    path: 'add-architect',
    component: ArchitectAddingComponent
  },
  {
    path: 'condo-editing',
    component: CondoEditingComponent
  },
  {
    path: 'designs-page',
    component: DesignsPageComponent
  },
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
