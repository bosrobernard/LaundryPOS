import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order, OrderItem } from '../../../models/order.model';


@Component({
  selector: 'app-order-items-dialog',
  templateUrl: './order-items-dialog.component.html',
  styleUrl: './order-items-dialog.component.scss'
})


export class OrderItemsDialogComponent {
  taxRate = 8.5;
  services = [
    { id: 1, name: 'Wash & Fold', icon: 'ri-t-shirt-line' },
    { id: 2, name: 'Dry Cleaning', icon: 'ri-shirt-line' },
    { id: 3, name: 'Ironing', icon: 'ri-iron-line' },
    { id: 4, name: 'Stain Removal', icon: 'ri-drop-line' },
    { id: 5, name: 'Express Service', icon: 'ri-timer-flash-line' }
  ];

  constructor(
    private dialogRef: MatDialogRef<OrderItemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order
  ) {}

  hasNotes(item: OrderItem): boolean {
    return !!item.notes && item.notes.trim().length > 0;
  }

  getServiceIcon(serviceId: string): string {
    const service = this.services.find(s => s.id.toString() === serviceId);
    return service?.icon || 'ri-question-line';
  }

  getServiceName(serviceId: string): string {
    const service = this.services.find(s => s.id.toString() === serviceId);
    return service?.name || 'Unknown Service';
  }

  getSubtotal(): number {
    return this.order.items.reduce((sum, item) => sum + item.total, 0);
  }

  getTax(): number {
    return this.getSubtotal() * (this.taxRate / 100);
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  printOrder() {
    window.print();
  }

  close() {
    this.dialogRef.close();
  }
}