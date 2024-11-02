import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // For demo purposes, using mock data
    if (email === 'admin@example.com' && password === 'admin123') {
      const user: User = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin',
        token: 'mock-jwt-token'
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user);
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  register(userData: any): Observable<any> {
    // Implement registration logic
    return of({ success: true });
  }

  forgotPassword(email: string): Observable<any> {
    // Implement forgot password logic
    return of({ success: true });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
