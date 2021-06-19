import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { ListCameraComponent } from './list-camera/list-camera.component';
import {DataTablesModule} from 'angular-datatables';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TooltipModule} from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [ListCameraComponent],
  imports: [
    CommonModule,
    CameraRoutingModule,
    DataTablesModule,
    ModalModule,
    FormsModule,
    AlertModule,
    TooltipModule
  ]
})
export class CameraModule { }
