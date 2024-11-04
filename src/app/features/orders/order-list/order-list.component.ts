// src/app/features/orders/order-list/order-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
// import { appService } from '../services/order.service';
import { Order, OrderStatus } from '../models/order.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderItemsDialogComponent } from '../components/order-items-dialog/order-items-dialog/order-items-dialog.component';
import { AppService } from '../../../../services/app.service';
import { OrderStatusDialogComponent } from './dialogues/order-status-dialog.component';
import { forkJoin } from 'rxjs';


interface OrderStats {
  pending: number;
  processing: number;
  completed: number;
  total: number;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})



export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: OrderStatus | 'all' = 'all';
  dataSource: MatTableDataSource<Order>;
  selection = new SelectionModel<Order>(true, []);
  searchQuery: string = '';
  dateRange: FormGroup;
  pageSize = 10;
  totalOrders = 0;

  displayedColumns: string[] = [
    'select',
    'orderNumber',
    'customer',
    'description',
    'quantity',
    'amount',
    'status',
    'dates',
    'actions'
  ];

  orderStats: OrderStats = {
    pending: 0,
    processing: 0,
    completed: 0,
    total: 0
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appService: AppService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    // private appService: AppService
  ) {
    this.dataSource = new MatTableDataSource<Order>([]);
    this.dateRange = this.fb.group({
      start: [null],
      end: [null]
    });
  }

  ngOnInit() {
    this.loadOrders();
    // this.setupFilters();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // private setupFilters() {
  //   // Setup data source filtering
  //   this.dataSource.filterPredicate = (data: Order, filter: string) => {
  //     return data.customerName.toLowerCase().includes(filter) ||
  //            data.id.toString().includes(filter);
  //   };

  //   // Subscribe to date range changes
  //   this.dateRange.valueChanges.subscribe(() => {
  //     this.filterOrders();
  //   });
  // }

  loadOrders() {
    this.appService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.dataSource.data = orders;
        this.calculateOrderStats();
        // this.filterOrders();
        this.totalOrders = orders.length;
      },
      error: (error) => {
        this.snackBar.open('Failed to load orders', 'Close', {
          duration: 3000
        });
      }
    });
  }

  private calculateOrderStats() {
    this.orderStats = {
      pending: 0,
      processing: 0,
      completed: 0,
      total: 0
    };

    this.orders.forEach(order => {
      this.orderStats.total++;
      switch(order.status) {
        case 'pending':
          this.orderStats.pending++;
          break;
        case 'processing':
          this.orderStats.processing++;
          break;
        case 'completed':
          this.orderStats.completed++;
          break;
      }
    });
  }

  // filterOrders() {
  //   let filtered = this.orders;

  //   // Status filter
  //   if (this.selectedStatus !== 'all') {
  //     filtered = filtered.filter(order => order.status === this.selectedStatus);
  //   }

  //   // Date range filter
  //   const { start, end } = this.dateRange.value;
  //   if (start && end) {
  //     filtered = filtered.filter(order => {
  //       const orderDate = new Date(order.createdAt);
  //       return orderDate >= start && orderDate <= end;
  //     });
  //   }

  //   // Search query
  //   if (this.searchQuery) {
  //     const query = this.searchQuery.toLowerCase();
  //     filtered = filtered.filter(order =>
  //       order.customerName.toLowerCase().includes(query) ||
  //       order.id.toString().includes(query)
  //     );
  //   }

  //   this.dataSource.data = filtered;
  // }

  resetFilters() {
    this.selectedStatus = 'all';
    this.searchQuery = '';
    this.dateRange.reset();
    this.loadOrders();
  }

  createNewOrder() {
    this.router.navigate(['/orders/new']);
  }

  // editOrder(order: Order) {
  //   this.router.navigate(['/orders/edit', order.id]);
  // }

  // viewOrder(order: Order) {
  //   this.router.navigate(['/orders', order.id]);
  // }

  viewItems(order: Order) {
    // Implement view items dialog
    this.dialog.open(OrderItemsDialogComponent, {
      data: order,
      width: '600px'
    });
  }

  updateStatus(order: Order) {
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      width: '400px',
      data: { 
        orderId: order._id,
        currentStatus: order.status
      }
    });

    dialogRef.afterClosed().subscribe(newStatus => {
      if (newStatus) {
        this.appService.updateOrderStatus(order._id, newStatus).subscribe({
          next: (updatedOrder) => {
            // Update the order in the data source
            const index = this.dataSource.data.findIndex(o => o._id === order._id);
            if (index !== -1) {
              this.dataSource.data[index].status = newStatus;
              this.dataSource._updateChangeSubscription();
              this.calculateOrderStats();
            }
            this.snackBar.open('Order status updated successfully', 'Close', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Failed to update order status', 'Close', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  // Add bulk update status functionality
  bulkUpdateStatus() {
    const selectedOrders = this.selection.selected;
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      width: '400px',
      data: { 
        orderId: 'bulk',
        currentStatus: 'multiple'
      }
    });

    dialogRef.afterClosed().subscribe(newStatus => {
      if (newStatus) {
        // Create an array of observables for each order update
        const updateObservables = selectedOrders.map(order => 
          this.appService.updateOrderStatus(order._id, newStatus)
        );

        // Execute all updates
        forkJoin(updateObservables).subscribe({
          next: () => {
            // Update local data
            selectedOrders.forEach(order => {
              const index = this.dataSource.data.findIndex(o => o._id === order._id);
              if (index !== -1) {
                this.dataSource.data[index].status = newStatus;
              }
            });
            this.dataSource._updateChangeSubscription();
            this.calculateOrderStats();
            this.selection.clear();
            
            this.snackBar.open('Orders status updated successfully', 'Close', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Failed to update some orders', 'Close', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    // Implement pagination logic
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.value;
    if (this.paginator) {
      this.paginator.pageSize = event.value;
      this.paginator.pageIndex = 0;
    }
  }
}