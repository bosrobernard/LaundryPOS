export interface RecentOrder {
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
  };
  amount: number;
  status: string;
  createdAt: string;
}

export interface RevenueChartData {
  date: string;
  value: number;
}

export interface OrderStats {
  completed: number;
  pending: number;
  processing: number;
}

export interface ActivityItem {
  type: string;
  message: string;
  time: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
  revenueChart: RevenueChartData[];
  orderStats: OrderStats;
  recentOrders: RecentOrder[];
  recentActivity: ActivityItem[];
}