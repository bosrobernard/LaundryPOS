import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  userAvatar = 'assets/profile.jpg';

  constructor(private router: Router) {}
  
  onCollapse() {
    // Emit event to parent
  }

  logout() {
    this.router.navigate(['/auth/login']);  }

}
