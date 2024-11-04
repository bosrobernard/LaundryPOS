import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
// import { OrderItemsDialogComponent } from './components/order-items-dialog/order-items-dialog/order-items-dialog.component';
import { OrderStatusDialogComponent } from './order-list/dialogues/order-status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OrderDetailsDialogComponent } from './order-list/dialogues/order-details-dialogue.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderFormComponent,
    // OrderItemsDialogComponent,
    OrderStatusDialogComponent,
    OrderDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class OrdersModule { }
