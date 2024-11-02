import { AdminPermission } from "./admin.model";

export interface PermissionGroup {
    name: string;
    key: string;
    permissions: {
      name: string;
      key: AdminPermission;
      description: string;
    }[];
  }


  export const PERMISSION_GROUPS: PermissionGroup[] = [
    {
      name: 'User Management',
      key: 'users',
      permissions: [
        {
          name: 'Manage Users',
          key: 'manage_users',
          description: 'Create, edit, and delete user accounts'
        }
      ]
    },
    {
      name: 'Order Management',
      key: 'orders',
      permissions: [
        {
          name: 'Manage Orders',
          key: 'manage_orders',
          description: 'Process and manage customer orders'
        }
      ]
    },
    {
      name: 'Payment Management',
      key: 'payments',
      permissions: [
        {
          name: 'Manage Payments',
          key: 'manage_payments',
          description: 'Handle payment processing and refunds'
        }
      ]
    },
    {
      name: 'Admin Management',
      key: 'admins',
      permissions: [
        {
          name: 'Manage Admins',
          key: 'manage_admins',
          description: 'Manage admin users and their permissions'
        }
      ]
    },
    {
      name: 'Reporting',
      key: 'reports',
      permissions: [
        {
          name: 'View Reports',
          key: 'view_reports',
          description: 'Access and generate system reports'
        }
      ]
    },
    {
      name: 'Settings',
      key: 'settings',
      permissions: [
        {
          name: 'Manage Settings',
          key: 'manage_settings',
          description: 'Configure system settings and preferences'
        }
      ]
    }
  ];