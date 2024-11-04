// src/app/features/payments/models/payment.model.ts
export type PaymentMethod = 'cash' | 'card' | 'online';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: Customer;
  orderDate: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
  receivedBy: string;
  invoiceNumber: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Optional: Add form-related interfaces
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PaymentFilter {
  dateRange: DateRange;
  paymentMethod: PaymentMethod | 'all';
}