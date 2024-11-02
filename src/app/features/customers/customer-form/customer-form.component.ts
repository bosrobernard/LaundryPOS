import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../services/customer.service';

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  customerType: string;
  preferredContact: string;
  notes: string;
  emailMarketing: boolean;
  smsMarketing: boolean;
  specialOffers: boolean;
}

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;  // Remove undefined
  isEditMode = false;
  isSubmitting = false;
  avatarPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
    // Initialize form in constructor
    this.customerForm = this.initializeForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadCustomerData(id);
    }
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]],
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: ['', Validators.pattern(/^\d{5}(-\d{4})?$/)],
      customerType: ['regular'],
      preferredContact: ['email'],
      notes: [''],
      emailMarketing: [false],
      smsMarketing: [false],
      specialOffers: [false]
    });
  }

  private loadCustomerData(id: number): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (customer) => {
        if (customer) {
          this.customerForm.patchValue({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            streetAddress: customer.streetAddress,
            city: customer.city,
            state: customer.state,
            zipCode: customer.zipCode,
            customerType: customer.customerType,
            preferredContact: customer.preferredContact,
            notes: customer.notes,
            emailMarketing: customer.emailMarketing,
            smsMarketing: customer.smsMarketing,
            specialOffers: customer.specialOffers
          });
          this.avatarPreview = customer.avatar || null;
        }
      },
      error: (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        this.snackBar.open('Error loading customer data: ' + errorMessage, 'Close', {
          duration: 3000
        });
        this.router.navigate(['/customers']);
      }
    });
  }

  onAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isSubmitting = true;
      const customerData = this.prepareCustomerData();
      
      const request = this.isEditMode
        ? this.customerService.updateCustomer(this.route.snapshot.params['id'], customerData)
        : this.customerService.createCustomer(customerData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Customer ${this.isEditMode ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000 }
          );
          this.router.navigate(['/customers']);
        },
        error: (error: unknown) => {
          this.isSubmitting = false;
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          this.snackBar.open(
            'Error saving customer data: ' + errorMessage,
            'Close',
            { duration: 3000 }
          );
        }
      });
    } else {
      this.markFormGroupTouched(this.customerForm);
    }
  }

  private prepareCustomerData(): CustomerFormData {
    return {
      ...this.customerForm.value,
      // Add any additional data transformation here
    };
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.customerForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${controlName} is required`;
    if (control.errors['email']) return 'Invalid email address';
    if (control.errors['minlength']) return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['pattern']) return `Invalid ${controlName} format`;

    return 'Invalid input';
  }

  goBack() {
    this.router.navigate(['/customers']);
  }
}