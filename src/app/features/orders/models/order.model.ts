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
  

    export interface Order {
      id: number;
      customerId: number;
      customerName: string;
      customerEmail?: string;  
      customerAvatar?: string; 
      items: OrderItem[];
      totalAmount: number;
      status: OrderStatus;
      createdAt: Date;
      deliveryDate: Date;
  }