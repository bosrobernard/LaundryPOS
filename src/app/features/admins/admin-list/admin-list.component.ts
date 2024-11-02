import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin.model';
import { AdminService } from '../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminFormDialogComponent } from '../admin-form-dialog/admin-form-dialog/admin-form-dialog.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss'
})
export class AdminListComponent {

  admins: Admin[] = [];
  currentUserId = 1; // This would typically come from an auth service

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe(admins => {
      this.admins = admins;
    });
  }

  addAdmin() {
    const dialogRef = this.dialog.open(AdminFormDialogComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.addAdmin(result).subscribe(() => {
          this.loadAdmins();
        });
      }
    });
  }

  editAdmin(admin: Admin) {
    const dialogRef = this.dialog.open(AdminFormDialogComponent, {
      width: '500px',
      data: { mode: 'edit', admin }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.updateAdmin(admin.id, result).subscribe(() => {
          this.loadAdmins();
        });
      }
    });
  }

  deleteAdmin(admin: Admin) {
    if (confirm(`Are you sure you want to delete ${admin.name}?`)) {
      this.adminService.deleteAdmin(admin.id).subscribe(() => {
        this.loadAdmins();
      });
    }
  }

}
