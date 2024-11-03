// src/app/layout/header/header.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../state/app.state';
import { AuthService } from '../../features/auth/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  searchQuery = '';
  notificationCount = 5;
  currentUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
    avatar: '/assets/profile.jpg'
  };

  notifications = [
    {
      type: 'info',
      icon: 'ri-information-line',
      message: 'New order received from Sarah Johnson',
      time: new Date(Date.now() - 1000 * 60 * 5),
      unread: true
    },
    {
      type: 'success',
      icon: 'ri-checkbox-circle-line',
      message: 'Order #1234 has been completed',
      time: new Date(Date.now() - 1000 * 60 * 30),
      unread: true
    },
    {
      type: 'warning',
      icon: 'ri-alert-line',
      message: 'Payment pending for Order #5678',
      time: new Date(Date.now() - 1000 * 60 * 60),
      unread: false
    },
    {
      type: 'error',
      icon: 'ri-error-warning-line',
      message: 'Failed to process Order #9012',
      time: new Date(Date.now() - 1000 * 60 * 120),
      unread: false
    }
  ];

  userName: string = '';
  userPhone: string = '';
  userRole: string = '';

  constructor(private appState: AppState,private authService: AuthService) {}

  ngOnInit(): void {
    this.appState.getState$().subscribe(state => {
      const user = state.user;
      if (user) {
        this.userName = user.name;
        // this.userPhoto = user.photo || '../../assets/images/artisan3.png'; // Default photo if user.photo is undefined
        this.userRole = user.role;
        this.userPhone = user.phone;
      }
    });
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
