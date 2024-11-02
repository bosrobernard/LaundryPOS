import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private mockProfile: UserProfile = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    role: 'Admin',
    avatar: 'assets/default-avatar.png',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345'
    },
    joinDate: new Date('2023-01-15'),
    lastLogin: new Date(),
    settings: {
      notifications: true,
      twoFactorAuth: false,
      emailUpdates: true
    },
    stats: {
      totalOrdersProcessed: 1234,
      customersHelped: 567,
      avgResponseTime: '2.5 hours'
    }
  };

  getProfile(): Observable<UserProfile> {
    return of(this.mockProfile);
  }

  updateProfile(data: Partial<UserProfile>): Observable<UserProfile> {
    this.mockProfile = { ...this.mockProfile, ...data };
    return of(this.mockProfile);
  }

  updateAvatar(file: File): Observable<string> {
    // Mock avatar upload
    return of(URL.createObjectURL(file));
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    // Mock password update
    return of(true);
  }
}