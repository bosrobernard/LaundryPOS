import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormDialogComponent } from './admin-form-dialog/admin-form-dialog/admin-form-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent,
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'new',
    component: AdminFormDialogComponent,
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'edit/:id',
    component: AdminFormDialogComponent,
    // canActivate: [AuthGuard, AdminGuard]
  },
  // {
  //   path: ':id',
  //   component: AdminDetailComponent,
  //   // canActivate: [AuthGuard, AdminGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
