import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, debounceTime, switchMap, of } from 'rxjs';
import { AppService } from '../../../../services/app.service';

interface OrderItem {
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  isSubmitting = false;
  customerSearchCtrl = new FormControl('');
  filteredCustomers$!: Observable<any[]>;
  selectedCustomer: any = null;
  isEditMode = false;
  orderId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.createForm();
    this.setupCustomerSearch();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.loadOrderData(params['id']);
      }
    });
  }

  private loadOrderData(orderId: string) {
    this.appService.getOrderWithPayment(orderId).subscribe({
      next: (response) => {
        // The data is nested under response.data.order
        const order = response.data.order;
        const payment = response.data.payment;
        
        // Store order ID
        this.orderId = order._id;
  
        // Set customer info
        this.selectedCustomer = order.customer;
        this.customerSearchCtrl.setValue(order.customer);
  
        // Reset form with order data
        this.orderForm.patchValue({
          customerId: order.customer._id,
          receivedBy: order.receivedBy,
          paymentMethod: order.paymentMethod,
          amountPaid: order.amountPaid,
          totalAmount: order.totalAmount,
          outstandingBalance: order.outstandingBalance,
          orderDate: new Date(order.orderDate)
        });
  
        // Clear existing items
        while (this.orderItems.length) {
          this.orderItems.removeAt(0);
        }
  
        // Add loaded items
        order.orderItems.forEach((item: { _id: any; item: any; description: any; quantity: any; price: any; amount: any; }) => {
          const orderItem = this.fb.group({
            _id: [item._id],
            item: [item.item, Validators.required],
            description: [item.description, Validators.required],
            quantity: [item.quantity, [Validators.required, Validators.min(1)]],
            price: [item.price, [Validators.required, Validators.min(0)]],
            amount: [item.amount]
          });
  
          // Setup calculations
          orderItem.get('quantity')?.valueChanges.subscribe(() => 
            this.calculateItemAmount(orderItem));
          orderItem.get('price')?.valueChanges.subscribe(() => 
            this.calculateItemAmount(orderItem));
  
          this.orderItems.push(orderItem);
        });
      },
      error: (error) => {
        this.snackBar.open('Error loading order', 'Close', { duration: 3000 });
        this.router.navigate(['/orders']);
      }
    });
  }

  private createForm() {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      orderItems: this.fb.array([]),
      receivedBy: ['', Validators.required],
      paymentMethod: ['cash', Validators.required],
      amountPaid: [0, [Validators.required, Validators.min(0)]],
      totalAmount: [0],
      outstandingBalance: [0],
      orderDate: [new Date(), Validators.required]
    });

    // Add first order item by default
    this.addOrderItem();

    // Listen to amount paid changes to calculate outstanding balance
    this.orderForm.get('amountPaid')?.valueChanges.subscribe(() => {
      this.calculateOutstandingBalance();
    });
  }

  get orderItems() {
    return this.orderForm.get('orderItems') as FormArray;
  }

  addOrderItem() {
    const orderItem = this.fb.group({
      item: ['', Validators.required], // Added new item field
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      amount: [0]
    });
  
    // Listen to quantity and price changes to calculate amount
    orderItem.get('quantity')?.valueChanges.subscribe(() => this.calculateItemAmount(orderItem));
    orderItem.get('price')?.valueChanges.subscribe(() => this.calculateItemAmount(orderItem));
  
    this.orderItems.push(orderItem);
  }

  removeOrderItem(index: number) {
    this.orderItems.removeAt(index);
    this.calculateTotalAmount();
  }

  private calculateItemAmount(orderItem: FormGroup) {
    const quantity = orderItem.get('quantity')?.value || 0;
    const price = orderItem.get('price')?.value || 0;
    const amount = quantity * price;
    orderItem.patchValue({ amount }, { emitEvent: false });
    this.calculateTotalAmount();
  }

  private calculateTotalAmount() {
    const total = this.orderItems.controls.reduce((sum, item) => {
      return sum + (item.get('amount')?.value || 0);
    }, 0);
    
    this.orderForm.patchValue({ totalAmount: total }, { emitEvent: false });
    this.calculateOutstandingBalance();
  }

  private calculateOutstandingBalance() {
    const totalAmount = this.orderForm.get('totalAmount')?.value || 0;
    const amountPaid = this.orderForm.get('amountPaid')?.value || 0;
    const outstandingBalance = amountPaid - totalAmount;
    this.orderForm.patchValue({ outstandingBalance }, { emitEvent: false }); // Changed to outstandingBalance
  }

  private setupCustomerSearch() {
    this.filteredCustomers$ = this.customerSearchCtrl.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => {
        if (!value || typeof value !== 'string') {
          return of([]);
        }
        return this.appService.searchCustomers(value);
      })
    );
  }

  private calculateAmount() {
    const quantity = this.orderForm.get('quantity')?.value || 0;
    const price = this.orderForm.get('price')?.value || 0;
    const amount = quantity * price;
    this.orderForm.patchValue({ amount, cash: amount }, { emitEvent: false });
  }

  onCustomerSelected(event: any) {
    this.selectedCustomer = event.option.value;
    this.orderForm.patchValue({
      customerId: this.selectedCustomer._id
    });
  }

  displayCustomerFn(customer: any): string {
    return customer ? customer.name : '';
  }

  clearCustomer() {
    this.selectedCustomer = null;
    this.customerSearchCtrl.setValue('');
    this.orderForm.get('customerId')?.setValue('');
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.isSubmitting = true;
      
      const orderData = {
        customerId: this.orderForm.get('customerId')?.value,
        orderDate: this.orderForm.get('orderDate')?.value.toISOString(),
        orderItems: this.orderForm.get('orderItems')?.value,
        totalAmount: this.orderForm.get('totalAmount')?.value,
        receivedBy: this.orderForm.get('receivedBy')?.value,
        amountPaid: this.orderForm.get('amountPaid')?.value,
        outstandingBalance: this.orderForm.get('outstandingBalance')?.value,
        paymentMethod: this.orderForm.get('paymentMethod')?.value
      };

      const request = this.isEditMode ? 
        this.appService.updateOrder(this.orderId!, orderData) :
        this.appService.createOrder(orderData);

      request.subscribe({
        next: (response) => {
          this.snackBar.open(
            `Order ${this.isEditMode ? 'updated' : 'created'} successfully`, 
            'Close', 
            { duration: 3000 }
          );
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(
            error.message || `Error ${this.isEditMode ? 'updating' : 'creating'} order`, 
            'Close', 
            { duration: 3000 }
          );
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/orders']);
  }
}