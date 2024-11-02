import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit{

  customerForm: FormGroup;
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
    this.initializeForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadCustomerData(id);
    }
  }

  private initializeForm() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      customerType: ['regular'],
      preferredContact: ['email'],
      notes: [''],
      emailMarketing: [false],
      smsMarketing: [false],
      specialOffers: [false]
    });
  }

  private loadCustomerData(id: number) {
    // Implement loading customer data
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

  onSubmit() {
    if (this.customerForm.valid) {
      this.isSubmitting = true;
      const customerData = this.customerForm.value;
      
      // Implement form submission
    }
  }

  goBack() {
    this.router.navigate(['/customers']);
  }
}
