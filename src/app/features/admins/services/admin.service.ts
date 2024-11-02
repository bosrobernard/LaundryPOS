// src/app/features/admins/services/admin.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Admin } from '../models/admin.model';
import { MOCK_ADMINS } from '../../../core/mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getAdmins(): Observable<Admin[]> {
    return of(MOCK_ADMINS);
  }

  getAdminById(id: number): Observable<Admin> {
    const admin = MOCK_ADMINS.find(a => a.id === id);
    return admin ? of(admin) : throwError(() => new Error('Admin not found'));
  }

  addAdmin(admin: Omit<Admin, 'id' | 'createdAt' | 'updatedAt'>): Observable<Admin> {
    const newAdmin: Admin = {
      ...admin,
      id: Math.max(...MOCK_ADMINS.map(a => a.id)) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    MOCK_ADMINS.push(newAdmin);
    return of(newAdmin);
  }

  updateAdmin(id: number, admin: Partial<Admin>): Observable<Admin> {
    const index = MOCK_ADMINS.findIndex(a => a.id === id);
    if (index !== -1) {
      MOCK_ADMINS[index] = {
        ...MOCK_ADMINS[index],
        ...admin,
        updatedAt: new Date()
      };
      return of(MOCK_ADMINS[index]);
    }
    return throwError(() => new Error('Admin not found'));
  }

  deleteAdmin(id: number): Observable<void> {
    const index = MOCK_ADMINS.findIndex(a => a.id === id);
    if (index !== -1) {
      MOCK_ADMINS.splice(index, 1);
      return of(void 0);
    }
    return throwError(() => new Error('Admin not found'));
  }
}