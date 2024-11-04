// src/app/features/orders/models/order.model.ts
export interface OrderItem {
  id: number;
  service: string;
  quantity: number;
  price: number;
  total: number;
  notes?: string;  
  }
  
  export type OrderStatus = 'pending' | 'processing' | 'completed' | 'delivered';
  

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