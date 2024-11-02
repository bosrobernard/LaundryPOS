// src/app/features/payments/payment-list/payment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  selectedMethod: 'all' | 'cash' | 'card' | 'online' = 'all';
  totalRevenue: number = 0;
  todaysPayments: number = 0;
  dateRange: FormGroup;

  constructor(
    // private paymentService: PaymentService,
    private fb: FormBuilder
  ) {
    this.dateRange = this.fb.group({
      start: [null],
      end: [null]
    });

    // Subscribe to date range changes
    this.dateRange.valueChanges.subscribe(() => {
      this.filterPayments();
    });
  }

  ngOnInit() {
    // this.loadPayments();
  }

  // loadPayments() {
  //   this.paymentService.getPayments().subscribe(payments => {
  //     this.payments = payments;
  //     this.calculateStats();
  //     this.filterPayments();
  //   });
  // }

  calculateStats() {
    // Calculate total revenue
    this.totalRevenue = this.payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);

    // Calculate today's payments
    const today = new Date().setHours(0, 0, 0, 0);
    this.todaysPayments = this.payments
      .filter(p => {
        const paymentDate = new Date(p.createdAt).setHours(0, 0, 0, 0);
        return paymentDate === today && p.status === 'completed';
      })
      .reduce((sum, p) => sum + p.amount, 0);
  }

  filterPayments() {
    let filtered = [...this.payments];

    // Filter by payment method
    if (this.selectedMethod !== 'all') {
      filtered = filtered.filter(p => p.paymentMethod === this.selectedMethod);
    }

    // Filter by date range
    const startDate = this.dateRange.get('start')?.value;
    const endDate = this.dateRange.get('end')?.value;

    if (startDate && endDate) {
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= startDate && paymentDate <= endDate;
      });
    }

    this.filteredPayments = filtered;
  }
}