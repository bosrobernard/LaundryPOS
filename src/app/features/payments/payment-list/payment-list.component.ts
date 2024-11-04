import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppService } from '../../../../services/app.service';

interface Customer {
  _id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: Customer;
  orderDate: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
  receivedBy: string;
  invoiceNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  orders: Order[] = [];
  dataSource: MatTableDataSource<Order>;
  dateRange: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = [
    'orderNumber',
    'customer',
    'description',
    'amount',
    'status',
    'date'
  ];

  stats = {
    totalRevenue: 0,
    todaysPayments: 0,
    totalTransactions: 0,
    successfulTransactions: 0
  };

  constructor(
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<Order>();
    this.dateRange = this.fb.group({
      start: [null],
      end: [null]
    });
  }

  ngOnInit() {
    this.loadOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOrders() {
    this.appService.getOrders().subscribe({
      next: (orders: Order[]) => {
        console.log('Orders loaded:', orders);
        this.orders = orders;
        this.dataSource.data = orders;
        this.calculateStats();
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  calculateStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.stats = this.orders.reduce((acc, order) => {
      acc.totalRevenue += order.amount;
      acc.totalTransactions++;

      const orderDate = new Date(order.orderDate);
      orderDate.setHours(0, 0, 0, 0);
      if (orderDate.getTime() === today.getTime()) {
        acc.todaysPayments += order.amount;
      }

      return acc;
    }, {
      totalRevenue: 0,
      todaysPayments: 0,
      totalTransactions: 0,
      successfulTransactions: 0
    });
  }
}