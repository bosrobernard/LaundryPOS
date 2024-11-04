import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { baseUrl } from '../constants/baseurl.constant';
import { Router } from '@angular/router';
import { AppState } from '../app/state/app.state';
import { Order } from '../app/features/orders/models/order.model';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private http: HttpClient,
    private $state: AppState,
    private route: Router
  ) {}
  

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/customers/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  addUser(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/customers/add`, payload).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  addAdmin(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/add`, payload).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) {
          throw new Error(res.message || 'Failed to add admin');
        }
        return res.data; // Only return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error adding admin:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }
  

  getUser(): Observable<any> {
    return this.http.get(`${baseUrl}/customers/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) { // Check for 'status' instead of 'success' if that's the correct field
          throw new Error(res.message || 'Failed to retrieve customers');
        }
        return res.data; // Return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error fetching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${baseUrl}/orders/add`, orderData).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) {
          throw new Error(res.message || 'Failed to create order');
        }
        return res.data;
      }),
      catchError((err) => {
        console.error('Error creating order:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  searchCustomers(query: string): Observable<any[]> {
    return this.http.get(`${baseUrl}/customers/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) {
          throw new Error(res.message);
        }
        // Filter customers based on query
        return res.data.filter((customer: any) => 
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.phone.includes(query)
        );
      }),
      catchError((err) => {
        console.error('Error searching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  getAdmin(): Observable<any> {
    return this.http.get(`${baseUrl}/admin/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) { // Check for 'status' instead of 'success' if that's the correct field
          throw new Error(res.message || 'Failed to retrieve customers');
        }
        return res.data; // Return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error fetching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  getOrders(): Observable<any> {
    return this.http.get(`${baseUrl}/orders/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) { // Check for 'status' instead of 'success' if that's the correct field
          throw new Error(res.message || 'Failed to retrieve customers');
        }
        return res.data; // Return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error fetching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  getNewOrders(): Observable<Order[]> {
    return this.http.get<any>(`${baseUrl}/orders/get`).pipe(
      map(response => response.data), // Extract the data array from the response
      catchError(error => {
        console.error('Error fetching orders:', error);
        return throwError(() => error);
      })
    );
  }

  getPayments(): Observable<any> {
    return this.http.get(`${baseUrl}/orders/get`).pipe(
      take(1),
      map((response: any) => {
        if (!response.status) {
          throw new Error('Failed to retrieve orders');
        }
        return response.data; // Return just the data array
      }),
      catchError(error => {
        console.error('Error fetching orders:', error);
        return throwError(() => error);
      })
    );
  }

  getDashboardStats(dateRange: string = 'week'): Observable<any> {
    return this.http.get(`${baseUrl}/dashboard/stats?dateRange=${dateRange}`)
      .pipe(
        map((response: any) => {
          if (!response.status) {
            throw new Error(response.message);
          }
          return response.data;
        })
      );
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(`${baseUrl}/orders/status/${orderId}`, { 
      status: status 
    }).pipe(
      map((response: any) => {
        if (!response.status) {
          throw new Error(response.message || 'Failed to update order status');
        }
        return response.data;
      })
    );
  }

  getInProcessOrdersCount(): Observable<number> {
    return this.http.get<any>(`${baseUrl}/orders/get`).pipe(
      map(response => {
        if (response.status && response.data) {
          return response.data.filter(
            (order: any) => order.status === 'IN-PROCESS'
          ).length;
        }
        return 0;
      }),
      catchError(error => {
        console.error('Error getting in-process orders count:', error);
        return of(0);
      })
    );
  }
}
  

  

