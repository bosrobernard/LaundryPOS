import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  userAvatar = 'assets/profile.jpg';

  userName: string = '';
  // userPhoto: string = '';
  userRole: string = '';

  constructor(private authService: AuthService,private appState: AppState) {}
  
  onCollapse() {
    // Emit event to parent
  }

  ngOnInit(): void {
    this.appState.getState$().subscribe(state => {
      const user = state.user;
      if (user) {
        this.userName = user.name;
        // this.userPhoto = user.photo || '../../assets/images/artisan3.png'; // Default photo if user.photo is undefined
        this.userRole = user.role
      }
    });
  }



  logout(): void {
    this.authService.logout();
  }

}
