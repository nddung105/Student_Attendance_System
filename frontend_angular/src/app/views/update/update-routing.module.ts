import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './update.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateComponent,
    data: {
      title: 'update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRoutingModule { }
