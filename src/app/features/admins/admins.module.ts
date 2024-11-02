import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormDialogComponent } from './admin-form-dialog/admin-form-dialog/admin-form-dialog.component';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminListComponent,
    AdminFormDialogComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminsModule { }
