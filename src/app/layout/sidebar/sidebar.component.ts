import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  userAvatar = 'assets/profile.jpg';

  onCollapse() {
    // Emit event to parent
  }

  logout() {
    // Implement logout
  }

}
