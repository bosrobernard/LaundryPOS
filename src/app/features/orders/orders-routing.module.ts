import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: OrderFormComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: OrderFormComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: ':id',
  //   component: OrderDetailComponent,
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
