// // src/app/core/mock-data/mock-data.ts

// export const MOCK_CUSTOMERS = [
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'john.doe@email.com',
//       phone: '(555) 123-4567',
//       address: '123 Main St, Anytown, ST 12345',
//       joinDate: new Date('2023-01-15'),
//       totalOrders: 15,
//       totalSpent: 450.75
//     },
//     {
//       id: 2,
//       name: 'Sarah Johnson',
//       email: 'sarah.j@email.com',
//       phone: '(555) 234-5678',
//       address: '456 Oak Ave, Somewhere, ST 12346',
//       joinDate: new Date('2023-02-20'),
//       totalOrders: 8,
//       totalSpent: 275.50
//     },
//     {
//       id: 3,
//       name: 'Michael Smith',
//       email: 'mike.smith@email.com',
//       phone: '(555) 345-6789',
//       address: '789 Pine Rd, Elsewhere, ST 12347',
//       joinDate: new Date('2023-03-10'),
//       totalOrders: 22,
//       totalSpent: 680.25
//     },
//     {
//       id: 4,
//       name: 'Emma Wilson',
//       email: 'emma.w@email.com',
//       phone: '(555) 456-7890',
//       address: '321 Elm St, Nowhere, ST 12348',
//       joinDate: new Date('2023-04-05'),
//       totalOrders: 12,
//       totalSpent: 390.00
//     },
//     {
//       id: 5,
//       name: 'David Brown',
//       email: 'david.b@email.com',
//       phone: '(555) 567-8901',
//       address: '654 Maple Dr, Anywhere, ST 12349',
//       joinDate: new Date('2023-05-15'),
//       totalOrders: 18,
//       totalSpent: 525.80
//     }
//   ];
  
//   export const MOCK_ORDERS = [
//     {
//       id: 1,
//       customerId: 1,
//       customerName: 'John Doe',
//       items: [
//         { id: 1, service: 'Wash & Fold', quantity: 5, price: 2.50, total: 12.50 },
//         { id: 2, service: 'Dry Cleaning', quantity: 2, price: 6.00, total: 12.00 }
//       ],
//       totalAmount: 24.50,
//       status: 'completed',
//       createdAt: new Date('2024-01-15T10:30:00'),
//       deliveryDate: new Date('2024-01-17T16:00:00')
//     },
//     {
//       id: 2,
//       customerId: 2,
//       customerName: 'Sarah Johnson',
//       items: [
//         { id: 3, service: 'Ironing', quantity: 8, price: 3.00, total: 24.00 },
//         { id: 4, service: 'Wash & Fold', quantity: 3, price: 2.50, total: 7.50 }
//       ],
//       totalAmount: 31.50,
//       status: 'processing',
//       createdAt: new Date('2024-01-16T14:20:00'),
//       deliveryDate: new Date('2024-01-18T17:00:00')
//     },
//     {
//       id: 3,
//       customerId: 3,
//       customerName: 'Michael Smith',
//       items: [
//         { id: 5, service: 'Dry Cleaning', quantity: 4, price: 6.00, total: 24.00 },
//         { id: 6, service: 'Stain Removal', quantity: 1, price: 8.00, total: 8.00 }
//       ],
//       totalAmount: 32.00,
//       status: 'pending',
//       createdAt: new Date('2024-01-17T09:15:00'),
//       deliveryDate: new Date('2024-01-19T15:30:00')
//     },
//     {
//       id: 4,
//       customerId: 4,
//       customerName: 'Emma Wilson',
//       items: [
//         { id: 7, service: 'Wash & Fold', quantity: 6, price: 2.50, total: 15.00 },
//         { id: 8, service: 'Ironing', quantity: 5, price: 3.00, total: 15.00 }
//       ],
//       totalAmount: 30.00,
//       status: 'delivered',
//       createdAt: new Date('2024-01-15T11:45:00'),
//       deliveryDate: new Date('2024-01-17T14:30:00')
//     },
//     {
//       id: 5,
//       customerId: 5,
//       customerName: 'David Brown',
//       items: [
//         { id: 9, service: 'Dry Cleaning', quantity: 3, price: 6.00, total: 18.00 },
//         { id: 10, service: 'Wash & Fold', quantity: 4, price: 2.50, total: 10.00 }
//       ],
//       totalAmount: 28.00,
//       status: 'processing',
//       createdAt: new Date('2024-01-16T16:30:00'),
//       deliveryDate: new Date('2024-01-18T18:00:00')
//     }
//   ];
  
//   export const MOCK_PAYMENTS = [
//     {
//       id: 1,
//       orderId: 1,
//       customerId: 1,
//       customerName: 'John Doe',
//       amount: 24.50,
//       paymentMethod: 'card',
//       status: 'completed',
//       transactionId: 'TXN123456',
//       createdAt: new Date('2024-01-15T10:35:00')
//     },
//     {
//       id: 2,
//       orderId: 2,
//       customerId: 2,
//       customerName: 'Sarah Johnson',
//       amount: 31.50,
//       paymentMethod: 'cash',
//       status: 'completed',
//       transactionId: 'TXN123457',
//       createdAt: new Date('2024-01-16T14:25:00')
//     },
//     {
//       id: 3,
//       orderId: 3,
//       customerId: 3,
//       customerName: 'Michael Smith',
//       amount: 32.00,
//       paymentMethod: 'online',
//       status: 'pending',
//       transactionId: 'TXN123458',
//       createdAt: new Date('2024-01-17T09:20:00')
//     },
//     {
//       id: 4,
//       orderId: 4,
//       customerId: 4,
//       customerName: 'Emma Wilson',
//       amount: 30.00,
//       paymentMethod: 'card',
//       status: 'completed',
//       transactionId: 'TXN123459',
//       createdAt: new Date('2024-01-15T11:50:00')
//     },
//     {
//       id: 5,
//       orderId: 5,
//       customerId: 5,
//       customerName: 'David Brown',
//       amount: 28.00,
//       paymentMethod: 'online',
//       status: 'completed',
//       transactionId: 'TXN123460',
//       createdAt: new Date('2024-01-16T16:35:00')
//     }
//   ];
  
//   export const MOCK_ADMINS = [
//     {
//       id: 1,
//       name: 'Admin Smith',
//       email: 'admin.smith@laundry.com',
//       phone: '(555) 111-2222',
//       role: 'super_admin',
//       address: '789 Admin Ave, HQ City, ST 12345',
//       avatar: 'assets/avatars/admin1.jpg',
//       permissions: ['manage_users', 'manage_orders', 'manage_payments', 'manage_admins'],
//       lastLogin: new Date('2024-01-17T08:30:00')
//     },
//     {
//       id: 2,
//       name: 'Jane Manager',
//       email: 'jane.manager@laundry.com',
//       phone: '(555) 222-3333',
//       role: 'manager',
//       address: '456 Manager St, Branch City, ST 12346',
//       avatar: 'assets/avatars/admin2.jpg',
//       permissions: ['manage_users', 'manage_orders', 'manage_payments'],
//       lastLogin: new Date('2024-01-17T09:15:00')
//     },
//     {
//       id: 3,
//       name: 'Bob Admin',
//       email: 'bob.admin@laundry.com',
//       phone: '(555) 333-4444',
//       role: 'admin',
//       address: '123 Staff St, Store City, ST 12347',
//       avatar: 'assets/avatars/admin3.jpg',
//       permissions: ['manage_orders', 'manage_payments'],
//       lastLogin: new Date('2024-01-17T08:45:00')
//     },
//     {
//       id: 4,
//       name: 'Sarah Supervisor',
//       email: 'sarah.super@laundry.com',
//       phone: '(555) 444-5555',
//       role: 'manager',
//       address: '321 Super Rd, Branch City, ST 12348',
//       avatar: 'assets/avatars/admin4.jpg',
//       permissions: ['manage_users', 'manage_orders'],
//       lastLogin: new Date('2024-01-17T09:00:00')
//     },
//     {
//       id: 5,
//       name: 'Tom Support',
//       email: 'tom.support@laundry.com',
//       phone: '(555) 555-6666',
//       role: 'admin',
//       address: '654 Support Ave, Store City, ST 12349',
//       avatar: 'assets/avatars/admin5.jpg',
//       permissions: ['manage_orders'],
//       lastLogin: new Date('2024-01-17T08:15:00')
//     }
//   ];
  
//   export const MOCK_SERVICES = [
//     {
//       id: 1,
//       name: 'Wash & Fold',
//       price: 2.50,
//       description: 'Regular laundry service - price per pound',
//       estimatedTime: '24 hours'
//     },
//     {
//       id: 2,
//       name: 'Dry Cleaning',
//       price: 6.00,
//       description: 'Professional dry cleaning - price per item',
//       estimatedTime: '48 hours'
//     },
//     {
//       id: 3,
//       name: 'Ironing',
//       price: 3.00,
//       description: 'Professional ironing service - price per item',
//       estimatedTime: '24 hours'
//     },
//     {
//       id: 4,
//       name: 'Stain Removal',
//       price: 8.00,
//       description: 'Special stain removal treatment - price per stain',
//       estimatedTime: '72 hours'
//     },
//     {
//       id: 5,
//       name: 'Express Service',
//       price: 5.00,
//       description: 'Same day service - additional charge per order',
//       estimatedTime: '8 hours'
//     }
//   ];
  
//   // Mock user profile for currently logged-in user
//   export const MOCK_CURRENT_USER = {
//     id: 1,
//     name: 'Admin Smith',
//     email: 'admin.smith@laundry.com',
//     phone: '(555) 111-2222',
//     role: 'super_admin',
//     avatar: 'assets/avatars/admin1.jpg',
//     permissions: ['manage_users', 'manage_orders', 'manage_payments', 'manage_admins'],
//     settings: {
//       notifications: true,
//       emailAlerts: true,
//       darkMode: false
//     },
//     statistics: {
//       ordersProcessed: 145,
//       customersHelped: 89,
//       paymentsProcessed: 167
//     },
//     recentActivity: [
//       {
//         action: 'Processed Order #1234',
//         timestamp: new Date('2024-01-17T08:30:00')
//       },
//       {
//         action: 'Updated Customer Profile #89',
//         timestamp: new Date('2024-01-17T08:15:00')
//       },
//       {
//         action: 'Approved Payment #456',
//         timestamp: new Date('2024-01-17T08:00:00')
//       }
//     ]
//   };
  
//   // Helper function to get random mock data
//   export const getMockData = {
//     getRandomCustomer: () => {
//       return MOCK_CUSTOMERS[Math.floor(Math.random() * MOCK_CUSTOMERS.length)];
//     },
//     getRandomOrder: () => {
//       return MOCK_ORDERS[Math.floor(Math.random() * MOCK_ORDERS.length)];
//     },
//     getRandomPayment: () => {
//       return MOCK_PAYMENTS[Math.floor(Math.random() * MOCK_PAYMENTS.length)];
//     },
//     getRandomAdmin: () => {
//       return MOCK_ADMINS[Math.floor(Math.random() * MOCK_ADMINS.length)];
//     },
//     getRandomService: () => {
//       return MOCK_SERVICES[Math.floor(Math.random() * MOCK_SERVICES.length)];
//     }
//   };


// src/app/core/mock-data/mock-data.ts
import { Admin } from '../../features/admins/models/admin.model';
import { Order, OrderStatus } from '../../features/orders/models/order.model';

export const MOCK_ADMINS: Admin[] = [
  {
    id: 1,
    name: 'Admin Smith',
    email: 'admin.smith@example.com',
    phone: '(555) 111-2222',
    role: 'super_admin',
    address: '123 Admin St',
    permissions: ['manage_users', 'manage_orders'],
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active'
  },
  // Add more mock admins as needed
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    customerId: 1,
    customerName: 'John Doe',
    items: [
      { id: 1, service: 'Wash & Fold', quantity: 5, price: 2.50, total: 12.50 }
    ],
    totalAmount: 12.50,
    status: 'pending',
    createdAt: new Date(),
    deliveryDate: new Date()
  },
  // Add more mock orders as needed
];