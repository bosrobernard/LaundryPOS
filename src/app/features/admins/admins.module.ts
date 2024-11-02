import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormDialogComponent } from './admin-form-dialog/admin-form-dialog/admin-form-dialog.component';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    AdminListComponent,
    AdminFormDialogComponent,
    // TimeAgoPipe
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminsModule { }
