import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Order } from "../../models/order.model";

@Component({
    selector: 'app-order-details-dialog',
    templateUrl: './order-details-dialog.component.html',
    styleUrls: ['./order-details-dialog.component.scss']
  })
  export class OrderDetailsDialogComponent {
    displayedColumns: string[] = ['item', 'description', 'quantity', 'price', 'amount'];
    
    constructor(
      @Inject(MAT_DIALOG_DATA) public order: Order,
      public dialogRef: MatDialogRef<OrderDetailsDialogComponent>
    ) {}
  
    close() {
      this.dialogRef.close();
    }
}