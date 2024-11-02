// src/app/features/orders/models/order.model.ts
export interface OrderItem {
    id: number;
    service: string;
    quantity: number;
    price: number;
    total: number;
  }
  
  export type OrderStatus = 'pending' | 'processing' | 'completed' | 'delivered';
  
  export interface Order {
    id: number;
    customerId: number;
    customerName: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    deliveryDate: Date;
  }