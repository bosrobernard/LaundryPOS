import { AdminActivity } from "./admin.model";

export interface AdminMetrics {
    dailyStats: {
      date: Date;
      ordersProcessed: number;
      customersServed: number;
      revenue: number;
    }[];
    performanceScore: number;
    recentActivities: AdminActivity[];
    workload: {
      pending: number;
      inProgress: number;
      completed: number;
    };
  }
  