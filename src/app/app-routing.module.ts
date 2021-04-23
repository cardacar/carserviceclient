import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { OwnersListComponent} from './owners-list/owners-list.component';
import { OwnerComponent } from './owner/owner.component';
import { MainViewComponent } from './main-view/main-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: MainViewComponent
  },
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: 'car-add',
    component: CarEditComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent
  },
  {
    path: 'owners-list',
    component: OwnersListComponent
  },
  {
    path: 'owner-add',
    component: OwnerComponent
  },

  {
    path: 'owner-edit/:id',
    component: OwnerComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
