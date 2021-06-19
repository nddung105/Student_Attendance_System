import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {DataTablesModule} from 'angular-datatables';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    DataTablesModule,
    ModalModule,
    TooltipModule,
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
