import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileViewComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'edit',
  //   component: EditProfileComponent,
  //   // canActivate: [AuthGuard]
  // },
  // {
  //   path: 'change-password',
  //   component: ChangePasswordComponent,
  //   canActivate: [AuthGuard] 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
