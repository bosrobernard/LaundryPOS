/// src/app/features/orders/pages/order-form/order-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OrderService } from '../services/order.service';
import { Observable, debounceTime, of, startWith, switchMap } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

interface OrderItem {
  service: string;
  quantity: number;
  price: number;
  total: number;
  notes: string;
}


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})



export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  customerSearch = new FormControl('');
  filteredCustomers$: Observable<any[]> | undefined;
  selectedCustomer: any = null;
  isEditMode = false;
  isSubmitting = false;
  taxRate = 8.5;
  cartItems: OrderItem[] = [];

  orderStatuses = ['Pending', 'Processing', 'Completed', 'Delivered'];
  currentStatus = 'Pending';
  statusDate = new Date();

  services = [
    {
      id: 1,
      name: 'Wash & Fold',
      price: 2.50,
      icon: 'ri-t-shirt-line'
    },
    {
      id: 2,
      name: 'Dry Cleaning',
      price: 6.00,
      icon: 'ri-shirt-line'
    },
    {
      id: 3,
      name: 'Ironing',
      price: 3.00,
      icon: 'ri-iron-line'
    },
    {
      id: 4,
      name: 'Stain Removal',
      price: 8.00,
      icon: 'ri-drop-line'
    },
    {
      id: 5,
      name: 'Express Service',
      price: 5.00,
      icon: 'ri-timer-flash-line'
    }
  ];

  timeSlots = [
    { value: 'morning', label: '9:00 AM - 12:00 PM' },
    { value: 'afternoon', label: '12:00 PM - 3:00 PM' },
    { value: 'evening', label: '3:00 PM - 6:00 PM' }
  ];

 
  private conditionalValidator(condition: () => boolean): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
        if (condition()) {
            return Validators.required(formControl);
        }
        return null;
    }
}


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
) {
    this.orderForm = this.fb.group({
        customerId: ['', Validators.required],
        items: this.fb.array([]), // Remove Validators.required since items will be in cartItems
        deliveryDate: ['', Validators.required],
        timeSlot: ['', Validators.required],
        deliveryAddress: this.fb.group({
            sameAsCustomer: [true],
            street: ['', this.conditionalValidator(() => !this.orderForm?.get('deliveryAddress.sameAsCustomer')?.value)],
            city: ['', this.conditionalValidator(() => !this.orderForm?.get('deliveryAddress.sameAsCustomer')?.value)],
            state: ['', this.conditionalValidator(() => !this.orderForm?.get('deliveryAddress.sameAsCustomer')?.value)],
            zipCode: ['', this.conditionalValidator(() => !this.orderForm?.get('deliveryAddress.sameAsCustomer')?.value)]
        }),
        paymentMethod: ['cash', Validators.required],
        priority: ['normal', Validators.required],
        instructions: [''], // Optional
        status: ['pending']
    });

    this.setupCustomerSearch();
}



  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadOrderData(id);
    }
  }



  private setupCustomerSearch() {
    this.filteredCustomers$ = this.customerSearch.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (typeof value === 'string') {
          return this.searchCustomers(value);
        }
        return of([]);
      })
    );
  }

  private searchCustomers(query: string): Observable<any[]> {
    // Implement customer search logic
    return of([]); // Replace with actual API call
  }

  private loadOrderData(id: number) {
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        this.patchOrderForm(order);
      },
      error: (error) => {
        this.snackBar.open('Error loading order', 'Close', { duration: 3000 });
      }
    });
  }

  private patchOrderForm(order: any) {
    // Implement form patching logic
  }


  get orderItems() {
    return this.orderForm.get('items') as FormArray;  // Remove the optional chaining
  }

 

  removeOrderItem(index: number) {
    this.orderItems.removeAt(index);
  }

  updateItemTotal(index: number) {
    const item = this.orderItems.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = quantity * price;
    item.patchValue({ total });
  }

  onCustomerSelected(event: MatAutocompleteSelectedEvent) {
    const customer = event.option.value;
    this.selectedCustomer = customer;
    this.orderForm.patchValue({
      customerId: customer.id
    });
  }

  clearSelectedCustomer() {
    this.selectedCustomer = null;
    this.customerSearch.setValue('');
    this.orderForm.patchValue({
      customerId: ''
    });
  }


  onSameAddressChange(event: MatCheckboxChange) {
    const addressGroup = this.orderForm.get('deliveryAddress');
    if (event.checked && this.selectedCustomer) {
      addressGroup?.patchValue({
        street: this.selectedCustomer.address.street,
        city: this.selectedCustomer.address.city,
        state: this.selectedCustomer.address.state,
        zipCode: this.selectedCustomer.address.zipCode
      });
    } else {
      addressGroup?.patchValue({
        street: '',
        city: '',
        state: '',
        zipCode: ''
      });
    }
  }



  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'ri-time-line';
      case 'processing':
        return 'ri-loader-4-line';
      case 'completed':
        return 'ri-checkbox-circle-line';
      case 'delivered':
        return 'ri-truck-line';
      default:
        return 'ri-question-line';
    }
  }

  getSubtotal(): number {
    return this.orderItems.controls.reduce((sum, item) => {
      return sum + (item.get('total')?.value || 0);
    }, 0);
  }

  getTax(): number {
    return this.getSubtotal() * (this.taxRate / 100);
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.isSubmitting = true;
      const orderData = this.prepareOrderData();

      const request = this.isEditMode
        ? this.orderService.updateOrder(this.route.snapshot.params['id'], orderData)
        : this.orderService.createOrder(orderData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Order ${this.isEditMode ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000 }
          );
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open('Error saving order', 'Close', { duration: 3000 });
        }
      });
    }
  }


  private prepareOrderData() {
    const formValue = this.orderForm?.value;
    // Implement data preparation logic
    return formValue;
  }

  goBack() {
    this.router.navigate(['/orders']);
  }

  addOrderItem() {
    const itemForm = this.fb.group({
      service: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [0],
      notes: ['']
    });

    this.orderItems.push(itemForm);
  }

  addToCart(index: number) {
    const item = this.orderItems.at(index);
    if (item.valid) {
      const itemValue = item.value;
      const service = this.services.find(s => s.id === itemValue.service);
      
      const cartItem: OrderItem = {
        service: service?.name || '',
        quantity: itemValue.quantity,
        price: itemValue.price,
        total: itemValue.total,
        notes: itemValue.notes
      };

      this.cartItems.push(cartItem);
      this.orderItems.removeAt(index);
      this.addOrderItem(); // Add new empty form
      
      this.snackBar.open('Item added to cart', 'Close', { duration: 2000 });
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 2000 });
    }
  }


  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  getCartTax(): number {
    return this.getCartTotal() * (this.taxRate / 100);
  }

  getCartGrandTotal(): number {
    return this.getCartTotal() + this.getCartTax();
  }
}
