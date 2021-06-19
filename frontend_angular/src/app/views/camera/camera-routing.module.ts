import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ListCameraComponent} from './list-camera/list-camera.component';


const routes: Routes = [
  {
    path: '',
    component: ListCameraComponent,
    data: {
      title: 'Camera'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule { }
