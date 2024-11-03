import { Component, OnInit } from '@angular/core';
import { Admin, AdminRole, AdminPermission } from '../models/admin.model';
// import { AdminService } from '../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminFormDialogComponent } from '../admin-form-dialog/admin-form-dialog/admin-form-dialog.component';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  admins: Admin[] = [];
  filteredAdmins: Admin[] = [];
  currentUserId = 1;
  searchQuery = '';
  selectedRole: 'all' | AdminRole = 'all';
  sortBy: 'name' | 'role' | 'lastLogin' = 'name';

  permissionDescriptions: Record<AdminPermission, string> = {
    'manage_users': 'Manage system users and their accounts',
    'manage_orders': 'Process and manage customer orders',
    'manage_payments': 'Handle payment processing and refunds',
    'manage_admins': 'Manage administrator accounts'
  };

  permissionIcons: Record<AdminPermission, string> = {
    'manage_users': 'ri-user-settings-line',
    'manage_orders': 'ri-shopping-cart-line',
    'manage_payments': 'ri-money-dollar-circle-line',
    'manage_admins': 'ri-shield-keyhole-line'
  };

  constructor(
    // private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.appService.getAdmin().subscribe({
      next: (admins: Admin[]) => {
        this.admins = admins.map(admin => ({
          _id: admin._id,
          name: admin.name,
          phone: admin.phone,
          role: admin.role,
          createdAt: new Date(admin.createdAt)
        }));

        this.filteredAdmins = [...this.admins];
        this.filterAdmins();

        // Show success message
        this.snackBar.open('Admins loaded successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error fetching admins:', error);
        this.snackBar.open('Error fetching admins', 'Close', { duration: 3000 });
      }
    });
  }

  filterAdmins() {
    let filtered = this.admins;

    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(admin => admin.role === this.selectedRole);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(admin =>
        admin.name.toLowerCase().includes(query) ||
        // admin.email.toLowerCase().includes(query) ||
        admin.phone.includes(query)
      );
    }

    filtered = this.sortAdmins(filtered);
    this.filteredAdmins = filtered;
  }

  private sortAdmins(admins: Admin[]): Admin[] {
    return [...admins].sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'lastLogin':
          // const aTime = a.lastLogin?.getTime() ?? 0;
          // const bTime = b.lastLogin?.getTime() ?? 0;
          // return bTime - aTime;
        default:
          return 0;
      }
    });
  }

  getSuperAdminCount(): number {
    return this.admins.filter(admin => admin.role === 'SUPER_ADMIN').length;
  }

  getAdminCount(): number {
    return this.admins.filter(admin => admin.role === 'ADMIN').length;
  }


  // getOnlineCount(): number {
  //   const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  //   // return this.admins.filter(admin => 
  //   //   admin.lastLogin && admin.lastLogin > fiveMinutesAgo
  //   // ).length;
  // }

  // isOnline(admin: Admin): boolean {
  //   // if (!admin.lastLogin) return false;
  //   // const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  //   // return admin.lastLogin > fiveMinutesAgo;
  // }

  getPermissionDescription(permission: AdminPermission): string {
    return this.permissionDescriptions[permission];
  }

  getPermissionIcon(permission: AdminPermission): string {
    return this.permissionIcons[permission];
  }

  addAdmin() {
    const dialogRef = this.dialog.open(AdminFormDialogComponent, {
      width: '600px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appService.addAdmin(result).subscribe({
          next: () => {
            this.loadAdmins();
            this.snackBar.open('Admin added successfully', 'Close', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Error adding admin', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  editAdmin(admin: Admin) {
    // const dialogRef = this.dialog.open(AdminFormDialogComponent, {
    //   width: '600px',
    //   data: { mode: 'edit', admin }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.adminService.updateAdmin(admin.id, result).subscribe({
    //       next: () => {
    //         this.loadAdmins();
    //         this.snackBar.open('Admin updated successfully', 'Close', { duration: 3000 });
    //       },
    //       error: () => {
    //         this.snackBar.open('Error updating admin', 'Close', { duration: 3000 });
    //       }
    //     });
    //   }
    // });
  }

  viewAdmin(admin:any){
    console.log(admin)
  }

  deleteAdmin(admin: Admin) {
    // if (admin.id === this.currentUserId) {
    //   this.snackBar.open('You cannot delete your own account', 'Close', { duration: 3000 });
    //   return;
    // }

    // const confirmDelete = confirm(`Are you sure you want to delete ${admin.name}?`);
    // if (confirmDelete) {
    //   this.adminService.deleteAdmin(admin.id).subscribe({
    //     next: () => {
    //       this.loadAdmins();
    //       this.snackBar.open('Admin deleted successfully', 'Close', { duration: 3000 });
    //     },
    //     error: () => {
    //       this.snackBar.open('Error deleting admin', 'Close', { duration: 3000 });
    //     }
    //   });
    // }
  }

  managePermissions(admin: Admin) {
    // TODO: Implement permissions management
    console.log('Managing permissions for', admin.name);
  }
}