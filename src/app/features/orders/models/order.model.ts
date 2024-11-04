interface OrderPaymentDetails {
  amountPaid: number;
  outstandingBalance: number;
  paymentMethod: 'cash' | 'bank' | 'mobile_money';
}

export interface Order extends OrderPaymentDetails {
  _id: string;
  orderNumber: string;
  customer: {
    _id: string;
    name: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
  orderDate: string;
  orderItems: OrderItem[];
  totalAmount: number;
  receivedBy: string;
  invoiceNumber: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  _id: string;
  item: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

export type OrderStatus = 'IN-PROCESS' | 'PICKED-UP' | 'DELIVERED' | 'CANCELLED';