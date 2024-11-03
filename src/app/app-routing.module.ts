import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent,
  // },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module')
          .then(m => m.DashboardModule),canActivate: [AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: () => import('./features/customers/customers.module')
          .then(m => m.CustomersModule),canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module')
          .then(m => m.OrdersModule),canActivate: [AuthGuard]
      },
      {
        path: 'payments',
        loadChildren: () => import('./features/payments/payments.module')
          .then(m => m.PaymentsModule),canActivate: [AuthGuard]
      },
      {
        path: 'admins',
        loadChildren: () => import('./features/admins/admins.module')
          .then(m => m.AdminsModule),canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module')
          .then(m => m.ProfileModule),canActivate: [AuthGuard]
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
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
