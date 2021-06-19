import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AlertModule} from 'ngx-bootstrap/alert';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    FormsModule,
    ModalModule,
    AlertModule,
    TooltipModule
  ]
})
export class ConfigModule { }
