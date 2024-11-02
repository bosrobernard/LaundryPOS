// src/app/features/orders/order-list/order-list.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order, OrderStatus } from '../models/order.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: OrderStatus | 'all' = 'all';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filterOrders();
      },
      error: (error) => {
        this.snackBar.open('Failed to load orders', 'Close', {
          duration: 3000
        });
      }
    });
  }

  filterOrders() {
    this.filteredOrders = this.selectedStatus === 'all'
      ? this.orders
      : this.orders.filter(order => order.status === this.selectedStatus);
  }

  createNewOrder() {
    this.router.navigate(['/orders/new']);
  }

  editOrder(order: Order) {
    this.router.navigate(['/orders/edit', order.id]);
  }

  updateStatus(order: Order) {
    // Implement status update logic
  }

  viewOrder(data:any){

  }
}