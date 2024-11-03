import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Admin } from '../../models';

@Component({
  selector: 'app-admin-form-dialog',
  templateUrl: './admin-form-dialog.component.html',
  styleUrl: './admin-form-dialog.component.scss'
})
export class AdminFormDialogComponent {
adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', admin?: Admin }
  ) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['admin', Validators.required],
      // address: ['', Validators.required],
      // permissions: [[]],
      // avatar: ['']
    });

    if (data.mode === 'edit' && data.admin) {
      this.adminForm.patchValue(data.admin);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.dialogRef.close(this.adminForm.value);
    }
  }
}
