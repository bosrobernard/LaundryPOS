import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-status-dialog',
  template: `
    <h2 mat-dialog-title>Update Order Status</h2>
    <mat-dialog-content>
      <p>Current Status: <span class="status-badge {{data.currentStatus}}">{{data.currentStatus}}</span></p>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>New Status</mat-label>
        <mat-select [(value)]="selectedStatus">
          <mat-option *ngFor="let status of statuses" [value]="status">
            {{status}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" 
              [disabled]="!selectedStatus || selectedStatus === data.currentStatus"
              (click)="updateStatus()">
        Update Status
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin: 16px 0; }
    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .IN-PROCESS { background: #fff3e0; color: #e65100; }
    .PICKED-UP { background: #e3f2fd; color: #1565c0; }
    .DELIVERED { background: #e8f5e9; color: #2e7d32; }
    .CANCELLED { background: #ffebee; color: #c62828; }
  `]
})
export class OrderStatusDialogComponent {
  selectedStatus: string = '';
  readonly statuses = ['CANCELLED', 'IN-PROCESS', 'PICKED-UP', 'DELIVERED'] as const;

  constructor(
    public dialogRef: MatDialogRef<OrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string; currentStatus: string }
  ) {}

  updateStatus() {
    if (this.selectedStatus) {
      // No need for toUpperCase() as we're using the exact values from statuses array
      this.dialogRef.close(this.selectedStatus);
    }
  }
}