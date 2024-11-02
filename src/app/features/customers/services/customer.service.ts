import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Customer Interfaces
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  customerType: string;
  preferredContact: string;
  notes: string;
  emailMarketing: boolean;
  smsMarketing: boolean;
  specialOffers: boolean;
  status?: 'active' | 'inactive';
  joinDate: Date;
  totalOrders: number;
  totalSpent: number;
  avatar?: string;
}

export type CreateCustomerDTO = Omit<Customer, 'id' | 'joinDate' | 'totalOrders' | 'totalSpent'>;
export type UpdateCustomerDTO = Partial<CreateCustomerDTO>;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // Mock data for development
  private customers: Customer[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      streetAddress: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      customerType: 'regular',
      preferredContact: 'email',
      notes: '',
      emailMarketing: true,
      smsMarketing: false,
      specialOffers: true,
      status: 'active',
      joinDate: new Date(),
      totalOrders: 5,
      totalSpent: 500
    }
    // Add more mock customers as needed
  ];

  constructor() {}

  getCustomers(): Observable<Customer[]> {
    return of(this.customers);
  }

  getCustomerById(id: number): Observable<Customer | undefined> {
    const customer = this.customers.find(c => c.id === id);
    return of(customer);
  }

  createCustomer(customerData: CreateCustomerDTO): Observable<Customer> {
    const newCustomer: Customer = {
      ...customerData,
      id: Math.max(...this.customers.map(c => c.id)) + 1,
      joinDate: new Date(),
      totalOrders: 0,
      totalSpent: 0,
      status: 'active'
    };

    this.customers.push(newCustomer);
    return of(newCustomer);
  }

  updateCustomer(id: number, customerData: UpdateCustomerDTO): Observable<Customer> {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Customer not found');
    }

    const updatedCustomer: Customer = {
      ...this.customers[index],
      ...customerData
    };

    this.customers[index] = updatedCustomer;
    return of(updatedCustomer);
  }

  deleteCustomer(id: number): Observable<void> {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Customer not found');
    }

    this.customers.splice(index, 1);
    return of(void 0);
  }

  bulkDeleteCustomers(ids: number[]): Observable<void> {
    this.customers = this.customers.filter(c => !ids.includes(c.id));
    return of(void 0);
  }

  searchCustomers(query: string): Observable<Customer[]> {
    query = query.toLowerCase();
    const filteredCustomers = this.customers.filter(customer =>
      customer.firstName.toLowerCase().includes(query) ||
      customer.lastName.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.includes(query)
    );
    return of(filteredCustomers);
  }

  getCustomerStats(): Observable<{
    total: number;
    active: number;
    new: number;
    avgRevenue: number;
  }> {
    const total = this.customers.length;
    const active = this.customers.filter(c => c.status === 'active').length;
    const newCustomers = this.customers.filter(c => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(c.joinDate) >= oneMonthAgo;
    }).length;
    const totalRevenue = this.customers.reduce((sum, c) => sum + c.totalSpent, 0);

    return of({
      total,
      active,
      new: newCustomers,
      avgRevenue: total ? totalRevenue / total : 0
    });
  }

  getCustomerOrders(id: number): Observable<any[]> {
    // Mock method - implement actual order retrieval
    return of([]);
  }

  exportCustomers(format: 'excel' | 'csv' | 'pdf'): Observable<boolean> {
    // Mock export functionality
    console.log(`Exporting customers in ${format} format`);
    return of(true);
  }
}
