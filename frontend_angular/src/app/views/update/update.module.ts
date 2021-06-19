import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateRoutingModule } from './update-routing.module';

import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AlertModule} from 'ngx-bootstrap/alert';
import { UpdateComponent } from './update.component';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    FormsModule,
    ModalModule,
    AlertModule,
    TooltipModule
  ]
})
export class UpdateModule { }
