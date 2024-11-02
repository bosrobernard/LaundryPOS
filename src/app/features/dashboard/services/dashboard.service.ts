// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { DashboardStats } from '../models/dashboard.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {
//   getDashboardStats(): Observable<DashboardStats> {
//     return of({
//       totalOrders: 150,
//       totalRevenue: 15000,
//       totalCustomers: 45,
//       pendingOrders: 8,
//       recentOrders: [],
//       revenueChart: [],
//       orderStats: {
//         pending: 8,
//         processing: 12,
//         completed: 25,
//         delivered: 105
//       }
//     });
//   }

//   const mockStats: DashboardStats = {
//     totalOrders: 150,
//     totalRevenue: 15000,
//     totalCustomers: 45,
//     pendingOrders: 8,
//     recentOrders: [],
//     revenueChart: [
//       { date: 'Mon', value: 30 },
//       { date: 'Tue', value: 40 },
//       { date: 'Wed', value: 35 },
//       { date: 'Thu', value: 50 },
//       { date: 'Fri', value: 49 },
//       { date: 'Sat', value: 60 },
//       { date: 'Sun', value: 70 }
//     ],
//     orderStats: {
//       pending: 8,
//       processing: 12,
//       completed: 25,
//       delivered: 105
//     }
//   };

//   return of(mockStats);

// }

// src/app/features/dashboard/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStats } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getDashboardStats(): Observable<DashboardStats> {
    // Mock data for now
    const mockStats: DashboardStats = {
      totalOrders: 150,
      totalRevenue: 15000,
      totalCustomers: 45,
      pendingOrders: 8,
      recentOrders: [],
      revenueChart: [
        { date: 'Mon', value: 30 },
        { date: 'Tue', value: 40 },
        { date: 'Wed', value: 35 },
        { date: 'Thu', value: 50 },
        { date: 'Fri', value: 49 },
        { date: 'Sat', value: 60 },
        { date: 'Sun', value: 70 }
      ],
      orderStats: {
        pending: 8,
        processing: 12,
        completed: 25,
        delivered: 105
      }
    };

    return of(mockStats);
  }
}