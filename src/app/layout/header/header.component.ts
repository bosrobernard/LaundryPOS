// src/app/layout/header/header.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  searchQuery = '';
  notificationCount = 5;
  currentUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
    avatar: '../../assets/profile.jpg'
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

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    // Implement logout logic
  }
}
