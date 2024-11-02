// src/app/features/dashboard/models/dashboard.model.ts
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
  recentOrders: RecentOrder[];
  revenueChart: ChartData[];
  orderStats: OrderStats;
}

export interface RecentOrder {
  id: number;
  customerName: string;
  amount: number;
  status: string;
  date: Date;
}

export interface ChartData {
  date: string;
  value: number;
}

export interface OrderStats {
  pending: number;
  processing: number;
  completed: number;
  delivered: number;
}