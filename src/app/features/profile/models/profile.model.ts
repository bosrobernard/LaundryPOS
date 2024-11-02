export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    avatar?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    joinDate: Date;
    lastLogin: Date;
    settings: {
      notifications: boolean;
      twoFactorAuth: boolean;
      emailUpdates: boolean;
    };
    stats: {
      totalOrdersProcessed: number;
      customersHelped: number;
      avgResponseTime: string;
    };
  }