import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {

  customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St'
    }
    // Add more mock data as needed
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Load customers from service
  }

  addNewCustomer() {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }

  deleteCustomer(id: number) {
    // Implement delete logic
  }

}
