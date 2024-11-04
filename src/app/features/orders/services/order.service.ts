// // src/app/features/orders/services/order.service.ts
// import { Injectable } from '@angular/core';
// import { Observable, of, throwError } from 'rxjs';
// import { Order, OrderStatus } from '../models/order.model';
// import { MOCK_ORDERS } from '../../../core/mock-data/mock-data';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   getOrders(): Observable<Order[]> {
//     return of(MOCK_ORDERS);
//   }

//   getOrderById(id: number): Observable<Order> {
//     const order = MOCK_ORDERS.find(o => o.id === id);
//     return order ? of(order) : throwError(() => new Error('Order not found'));
//   }

//   createOrder(order: Omit<Order, 'id' | 'createdAt'>): Observable<Order> {
//     const newOrder: Order = {
//       ...order,
//       id: Math.max(...MOCK_ORDERS.map(o => o.id)) + 1,
//       createdAt: new Date()
//     };
//     MOCK_ORDERS.push(newOrder);
//     return of(newOrder);
//   }

//   updateOrder(id: number, updates: Partial<Order>): Observable<Order> {
//     const index = MOCK_ORDERS.findIndex(o => o.id === id);
//     if (index !== -1) {
//       MOCK_ORDERS[index] = {
//         ...MOCK_ORDERS[index],
//         ...updates
//       };
//       return of(MOCK_ORDERS[index]);
//     }
//     return throwError(() => new Error('Order not found'));
//   }

//   updateOrderStatus(orderId: number, status: OrderStatus): Observable<Order> {
//     const index = MOCK_ORDERS.findIndex(o => o.id === orderId);
//     if (index !== -1) {
//       MOCK_ORDERS[index].status = status;
//       return of(MOCK_ORDERS[index]);
//     }
//     return throwError(() => new Error('Order not found'));
//   }

//   deleteOrder(id: number): Observable<void> {
//     const index = MOCK_ORDERS.findIndex(o => o.id === id);
//     if (index !== -1) {
//       MOCK_ORDERS.splice(index, 1);
//       return of(void 0);
//     }
//     return throwError(() => new Error('Order not found'));
//   }
// }