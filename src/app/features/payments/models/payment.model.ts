// src/app/features/payments/models/payment.model.ts
export type PaymentMethod = 'cash' | 'card' | 'online';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Payment {
  id: number;
  orderId: number;
  customerId: number;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
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