import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: CustomerFormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: CustomerFormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CustomerListComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
