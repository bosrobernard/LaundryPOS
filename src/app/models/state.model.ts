export interface IState {
    advertisements: any;
    admins: any;
    artisanCategory: any[];
    companyCategory: any[];
    trainCategories: Array<any>;
    categories: any[];
    complaints: any[];
    orders: any[];
    companies: any[];
    updateOrders: any[];
    loading: boolean;
    user: any;
    token: string;
    refreshToken: string;
    roles: any[];
    customers: any[];
    artisans: any[];
    permissions: Array<any>;
    transactions: Array<any>;
    withdrawals: Array<any>;
    isAuthenticated: boolean;
  }
  
  export interface IOtpState {
    id: string;
    email: string;
    otp: string;
    expires: string;
  }

  export interface Category {
    _id: string;
    id: string;
    name: string;
    description: string;
    certification: string;
    status: string;
    active: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
