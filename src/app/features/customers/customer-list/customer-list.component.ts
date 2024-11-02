import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface CustomerStats {
  total: number;
  active: number;
  new: number;
  avgRevenue: number;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  joinDate: Date;
  totalOrders: number;
  totalSpent: number;
  avatar?: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  // Data sources
  customers: Customer[] = [];
  dataSource: MatTableDataSource<Customer>;
  selection = new SelectionModel<Customer>(true, []);

  // Filters and sorting
  searchQuery = '';
  selectedStatus: 'all' | 'active' | 'inactive' = 'all';
  sortBy: 'name' | 'date' | 'orders' | 'revenue' = 'name';

  // Pagination
  pageSize = 10;
  totalCustomers = 0;

  // Display columns
  displayedColumns: string[] = [
    'select',
    'customer',
    'contact',
    'orders',
    'status',
    'joinDate',
    'actions'
  ];

  // Statistics
  customerStats: CustomerStats = {
    total: 0,
    active: 0,
    new: 0,
    avgRevenue: 0
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Customer>([]);
  }

  ngOnInit() {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCustomers() {
    // Implement loading from service
    this.customers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        status: 'active',
        joinDate: new Date(),
        totalOrders: 5,
        totalSpent: 500
      }
      // Add more mock data
    ];
    
    this.dataSource.data = this.customers;
    this.calculateStats();
  }

  private calculateStats() {
    const total = this.customers.length;
    const active = this.customers.filter(c => c.status === 'active').length;
    const newCustomers = this.customers.filter(c => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(c.joinDate) >= oneMonthAgo;
    }).length;
    const totalRevenue = this.customers.reduce((sum, c) => sum + c.totalSpent, 0);

    this.customerStats = {
      total,
      active,
      new: newCustomers,
      avgRevenue: total ? totalRevenue / total : 0
    };
  }

  filterCustomers() {
    let filtered = this.customers;

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === this.selectedStatus);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query)
      );
    }

    // Apply sorting
    filtered = this.applySorting(filtered);

    this.dataSource.data = filtered;
    this.totalCustomers = filtered.length;
  }

  private applySorting(customers: Customer[]): Customer[] {
    switch (this.sortBy) {
      case 'name':
        return [...customers].sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
        return [...customers].sort((a, b) => 
          new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        );
      case 'orders':
        return [...customers].sort((a, b) => b.totalOrders - a.totalOrders);
      case 'revenue':
        return [...customers].sort((a, b) => b.totalSpent - a.totalSpent);
      default:
        return customers;
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedStatus = 'all';
    this.sortBy = 'name';
    this.loadCustomers();
  }

  addNewCustomer() {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['/customers/edit', customer.id]);
  }

  viewCustomer(customer: Customer) {
    this.router.navigate(['/customers', customer.id]);
  }

  viewOrders(customer: Customer) {
    this.router.navigate(['/orders'], { 
      queryParams: { customerId: customer.id } 
    });
  }

  deleteCustomer(customer: Customer) {
    // Implement delete confirmation dialog
  }

  bulkDelete() {
    const selectedCustomers = this.selection.selected;
    // Implement bulk delete
  }

  bulkExport() {
    const selectedCustomers = this.selection.selected;
    // Implement bulk export
  }

  exportAs(format: 'excel' | 'csv' | 'pdf') {
    // Implement export functionality
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
  }
}