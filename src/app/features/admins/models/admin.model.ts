export type AdminRole = 'SUPER_ADMIN' | 'ADMIN'

export type AdminStatus = 'active' | 'inactive' | 'suspended';

export interface Admin {
// avatar: any;
  _id: number;
  name: string;
  // email: string;
  phone: string;
  role: AdminRole;
  // address: string;
  // permissions: AdminPermission[];
  // lastLogin: Date;
  // status: AdminStatus;
  createdAt: Date;
  // updatedAt: Date;
}


// export type AdminRole = 'super_admin' | 'admin' | 'manager';
export type AdminPermission = 'manage_users' | 'manage_orders' | 'manage_payments' | 'manage_admins';

// export interface Admin {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   role: AdminRole;
//   address: string;
//   avatar?: string;
//   permissions: AdminPermission[];
//   lastLogin?: Date;
// }



// export type AdminPermission = 
//   | 'manage_users' 
//   | 'manage_orders' 
//   | 'manage_payments' 
//   | 'manage_admins' 
//   | 'view_reports' 
//   | 'manage_settings';

// export interface Admin {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   role: AdminRole;
//   address: string;
//   avatar?: string;
//   permissions: AdminPermission[];
//   lastLogin?: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   status: 'active' | 'inactive';
// }

export interface AdminStats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  lastActiveTime: Date;
  performanceMetrics: {
    ordersProcessed: number;
    customersServed: number;
    avgResponseTime: number;
  };
}

export interface AdminActivity {
  id: number;
  adminId: number;
  action: string;
  details: string;
  timestamp: Date;
  ipAddress?: string;
  status: 'success' | 'failed';
}
