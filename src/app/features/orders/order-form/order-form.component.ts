import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, debounceTime, switchMap, of } from 'rxjs';
import { AppService } from '../../../../services/app.service';

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

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
    this.setupCustomerSearch();
  }

  ngOnInit() {}

  private createForm() {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      receivedBy: ['', Validators.required],
      cash: [0, [Validators.required, Validators.min(0)]],
      paymentMethod: ['cash', Validators.required],
      orderDate: [new Date(), Validators.required]
    });

    // Listen to quantity and price changes to calculate amount
    this.orderForm.get('quantity')?.valueChanges.subscribe(() => this.calculateAmount());
    this.orderForm.get('price')?.valueChanges.subscribe(() => this.calculateAmount());
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
        ...this.orderForm.value,
        orderDate: this.orderForm.get('orderDate')?.value.toISOString()
      };

      this.appService.createOrder(orderData).subscribe({
        next: (response) => {
          this.snackBar.open('Order created successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(error.message || 'Error creating order', 'Close', {
            duration: 3000
          });
        }
      });
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000
      });
    }
  }

  goBack() {
    this.router.navigate(['/orders']);
  }
}