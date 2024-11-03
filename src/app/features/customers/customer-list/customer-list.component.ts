import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../../../services/app.service';

interface CustomerStats {
  total: number;
  active: number;
  new: number;
  avgRevenue: number;
}

interface Customer {
  _id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: Date;
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
    'name',
    'phone',
    'address',
    'createdAt',
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
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {
    this.dataSource = new MatTableDataSource<Customer>([]);
  }

  ngOnInit() {
    // Initialize dataSource before loading data
    this.dataSource = new MatTableDataSource<Customer>([]);
    this.loadCustomers();
  }

  ngAfterViewInit() {
    // Set up sorting and filtering
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    // Custom filtering
    this.dataSource.filterPredicate = (data: Customer, filter: string) => {
      const searchStr = filter.toLowerCase();
      return data.name.toLowerCase().includes(searchStr) ||
             data.phone.includes(searchStr) ||
             data.address.toLowerCase().includes(searchStr);
    };
  }

  loadCustomers() {
    this.appService.getUser().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers.map((customer: any) => ({
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          createdAt: new Date(customer.createdAt)
        }));
  
        // Update data source and statistics
        this.dataSource.data = this.customers;
        this.totalCustomers = this.customers.length;
        this.updateCustomerStats();
  
        // Show success message
        this.snackBar.open('Customers loaded successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        this.snackBar.open('Error fetching customers', 'Close', { duration: 3000 });
      }
    });
  }
  

  private updateCustomerStats() {
    // Update the stats based on the current data
    this.customerStats = {
      total: this.customers.length,
      active: this.customers.length, // Assuming all customers are active for now
      new: this.getNewCustomersCount(),
      avgRevenue: 0 // Set to 0 since we don't have revenue data
    };
  }

  private getNewCustomersCount(): number {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return this.customers.filter(customer => 
      new Date(customer.createdAt) >= oneMonthAgo
    ).length;
  }

  // Filter functionality
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  // private calculateStats() {
  //   const total = this.customers.length;
  //   const active = this.customers.filter(c => c.status === 'active').length;
  //   const newCustomers = this.customers.filter(c => {
  //     const oneMonthAgo = new Date();
  //     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  //     return new Date(c.joinDate) >= oneMonthAgo;
  //   }).length;
  //   const totalRevenue = this.customers.reduce((sum, c) => sum + c.totalSpent, 0);

  //   this.customerStats = {
  //     total,
  //     active,
  //     new: newCustomers,
  //     avgRevenue: total ? totalRevenue / total : 0
  //   };
  // }

  // filterCustomers() {
  //   let filtered = this.customers;

  //   if (this.selectedStatus !== 'all') {
  //     filtered = filtered.filter(c => c.status === this.selectedStatus);
  //   }

  //   if (this.searchQuery) {
  //     const query = this.searchQuery.toLowerCase();
  //     filtered = filtered.filter(c =>
  //       c.name.toLowerCase().includes(query) ||
  //       c.email.toLowerCase().includes(query) ||
  //       c.phone.includes(query)
  //     );
  //   }

  //   // Apply sorting
  //   filtered = this.applySorting(filtered);

  //   this.dataSource.data = filtered;
  //   this.totalCustomers = filtered.length;
  // }

  // private applySorting(customers: Customer[]): Customer[] {
  //   switch (this.sortBy) {
  //     case 'name':
  //       return [...customers].sort((a, b) => a.name.localeCompare(b.name));
  //     case 'date':
  //       return [...customers].sort((a, b) => 
  //         new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
  //       );
  //     case 'orders':
  //       return [...customers].sort((a, b) => b.totalOrders - a.totalOrders);
  //     case 'revenue':
  //       return [...customers].sort((a, b) => b.totalSpent - a.totalSpent);
  //     default:
  //       return customers;
  //   }
  // }

  resetFilters() {
    this.searchQuery = '';
    this.selectedStatus = 'all';
    this.sortBy = 'name';
    this.loadCustomers();
  }

  addNewCustomer() {
    this.router.navigate(['/customers/new']);
  }

  // editCustomer(customer: Customer) {
  //   this.router.navigate(['/customers/edit', customer.id]);
  // }

  // viewCustomer(customer: Customer) {
  //   this.router.navigate(['/customers', customer.id]);
  // }

  // viewOrders(customer: Customer) {
  //   this.router.navigate(['/orders'], { 
  //     queryParams: { customerId: customer.id } 
  //   });
  // }

  deleteCustomer(customerId: string) {
    // Confirm deletion
    const confirmed = window.confirm('Are you sure you want to delete this customer?');

    if (confirmed) {
      
      // Call the service to delete the customer
      this.appService.deleteUser(customerId).subscribe({
        next: () => {
          this.snackBar.open('Customer deleted successfully', 'Close', { duration: 3000 });
          // Optional: Refresh the customer list if necessary
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
          this.snackBar.open('Error deleting customer', 'Close', { duration: 3000 });
        }
      });
    }
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