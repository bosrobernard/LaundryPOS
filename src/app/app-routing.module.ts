import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./features/customers/customers.module')
          .then(m => m.CustomersModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module')
          .then(m => m.OrdersModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('./features/payments/payments.module')
          .then(m => m.PaymentsModule)
      },
      {
        path: 'admins',
        loadChildren: () => import('./features/admins/admins.module')
          .then(m => m.AdminsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module')
          .then(m => m.ProfileModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
