import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { authUrl, baseUrl } from '../constants/baseurl.constant';
import { Router } from '@angular/router';
import { AppState } from '../app/state/app.state';

@Injectable({
  providedIn: 'root',
})

export class authService {
  token: any;
  refreshToken: any;
  private permissions: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private appState: AppState
  ) {}

  login(data: any): Observable<any> {
    return this.http.post(`${authUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response.status) {
          const { accessToken, refreshToken, admin } = response.data;
  
          this.appState.setState({
            token: accessToken,
            refreshToken: refreshToken,
            user: admin,
            isAuthenticated: true,
          });
  
          if (response.message === 'Reset required') {
            // Redirect to the reset password screen after a short delay
            setTimeout(() => {
              this.router.navigate(['/auth/forgot-password']);
            }, 100);
          }
        } else {
          throw new Error(response.message);
        }
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => new Error(err.message));
      })
    );
  }
  

  getUserRole(): string {
    const user = this.appState.getState().user;
    return user?.role || '';
  }

  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
  }

  getUserPermissions(): string[] {
    const user = this.appState.getState().user;
    return user?.permissions || '';
  }

  requestOtp(email: string): Observable<any> {
    return this.http.post<any>(`${baseUrl}/admin/sendotp`, { email }).pipe(
      tap((response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
      }),
      catchError((err) => {
        console.error('OTP request error:', err);
        return throwError(() => new Error(err.message));
      })
    );
  }

  resetPassword(email: string, otp: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${baseUrl}/admin/reset`, { email, otp, password })
      .pipe(
        tap((response) => {
          if (!response.success) {
            throw new Error(response.message);
          }
        }),
        catchError((err) => {
          console.error('Password reset error:', err);
          return throwError(() => new Error(err.message));
        })
      );
  }

  logout(): void {
    this.appState.logout();
  }
}

//   signup(data: any): Observable<any> {
//     return this.http.post(${constants.BASEURL}/merchants/register, data);
//   }

//   // otp():Promise<any>{
//   //     return this.http.post(${constants.BASEURL}/transactions/reversal/otp)
//   //             .toPromise();
//   // }

//   requestOtp(): Promise<any> {
//     return fetch(${constants.BASEURL}/otp/sendotp, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'Application/json',
//       },
//     }).then((res) => res.json());
//   }

//   sendotp(data: any): Observable<any> {
//     return this.http.post(${constants.BASEURL}/otp/sendotp, data);
//   }

// }
