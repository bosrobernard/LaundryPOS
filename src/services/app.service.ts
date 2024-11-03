import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { baseUrl } from '../constants/baseurl.constant';
import { Router } from '@angular/router';
import { AppState } from '../app/state/app.state';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private http: HttpClient,
    private $state: AppState,
    private route: Router
  ) {}

  addCategory(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/categories/add`, payload).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  getYeaTrainCategories(): void {
    this.$state.setState({ loading: true });
    this.http
      .get(`${baseUrl}/categories/get/yeatrain`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data.data)
      )
      .subscribe({
        next: (trainCategories: Array<any>) => {
          this.$state.setState({ trainCategories });
        },
        error: () => {
          this.$state.setState({ loading: false });
        },
        complete: () => {
          this.$state.setState({ loading: false });
        },
      });
  }

  getYeaJobCategories(): void {
    this.$state.setState({ loading: true });
    this.http
      .get(`${baseUrl}/categories/get/yeajob`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      )
      .subscribe({
        next: (categories: Array<any>) => {
          this.$state.setState({ categories });
        },
        error: () => {
          this.$state.setState({ loading: false });
        },
        complete: () => {
          this.$state.setState({ loading: false });
        },
      });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/customers/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  addUser(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/customers/add`, payload).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  addAdmin(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/add`, payload).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) {
          throw new Error(res.message || 'Failed to add admin');
        }
        return res.data; // Only return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error adding admin:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }
  

  getUser(): Observable<any> {
    return this.http.get(`${baseUrl}/customers/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) { // Check for 'status' instead of 'success' if that's the correct field
          throw new Error(res.message || 'Failed to retrieve customers');
        }
        return res.data; // Return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error fetching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  getAdmin(): Observable<any> {
    return this.http.get(`${baseUrl}/admin/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) { // Check for 'status' instead of 'success' if that's the correct field
          throw new Error(res.message || 'Failed to retrieve customers');
        }
        return res.data; // Return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error fetching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }
  

  getArtisan(): Observable<any> {
    return this.http.get(`${baseUrl}/artisan/get`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  getUserPhoto(userId: string): Observable<any> {
    return this.http.get(`${baseUrl}/customers/get/photo/${userId}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  getArtisanMetrics(artisanId: string): Observable<any> {
    return this.http
      .get(`${baseUrl}/orders/get/artisan-metrics-web/${artisanId}`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      );
  }

  getArtisanIds(artisanId: string): Observable<any> {
    return this.http.get(`${baseUrl}/artisan/get/documents/${artisanId}`).pipe(
      take(1),
      catchError((err) => {
        console.error('HTTP error:', err);
        throw err;
      }),
      map((res: any) => {
        // console.log('Response from server:', res);
        return res; // Return the response directly
      })
    );
  }

  getCompanyPhotos(companyId: string): Observable<any> {
    return this.http
      .get(`${baseUrl}/companies/get/documents/${companyId}`)
      .pipe(
        take(1),
        catchError((err) => {
          console.error('HTTP error:', err);
          throw err;
        }),
        map((res: any) => {
          // console.log('Response from server:', res);
          return res; // Return the response directly
        })
      );
  }

  getCustomerMetrics(userId: string): Observable<any> {
    return this.http
      .get(`${baseUrl}/orders/get/customer-metrics-web/${userId}`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      );
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/orders/get`).pipe(
      take(1),
      catchError((err) => {
        console.error('Error in getOrders:', err);
        return of([]); // Return an empty array in case of error
      }),
      tap((res: any) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res: any) => res.data)
    );
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/transactions/get`).pipe(
      take(1),
      catchError((err) => {
        console.error('Error in getTransactions:', err);
        return of([]); // Return an empty array in case of error
      }),
      tap((res: any) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res: any) => res.data)
    );
  }

  getChartData(): Observable<number[]> {
    return this.http.get<any[]>(`${baseUrl}/orders/metrics`).pipe(
      take(1),
      catchError((err) => {
        console.error('Error in getOrders:', err);
        return of([]); // Return an empty array in case of error
      }),
      tap((res: any) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res: any) => res.data)
    );
  }

  getWithdrawals(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/transactions/get/withdrawals`).pipe(
      take(1),
      catchError((err) => {
        console.error('Error in getOrders:', err);
        return of([]); // Return an empty array in case of error
      }),
      tap((res: any) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res: any) => res.data)
    );
  }

  getAdvertisements(): void {
    this.$state.setState({ loading: true });
    this.http
      .get(`${baseUrl}/adverts/get`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      )
      .subscribe({
        next: (advertisements: Array<any>) => {
          this.$state.setState({ advertisements });
        },
        error: () => {
          this.$state.setState({ loading: false });
        },
        complete: () => {
          this.$state.setState({ loading: false });
        },
      });
  }

  getAdmins(): void {
    this.$state.setState({ loading: true });
    this.http
      .get(`${baseUrl}/admin/get/admins`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      )
      .subscribe({
        next: (admins: Array<any>) => {
          this.$state.setState({ admins });
        },
        error: () => {
          this.$state.setState({ loading: false });
        },
        complete: () => {
          this.$state.setState({ loading: false });
        },
      });
  }

  getArtisanCategory(artisanId: string): void {
    this.$state.setState({ loading: true });
    this.http
      .get(`${baseUrl}/artisan/categories/get/web/${artisanId}`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      )
      .subscribe({
        next: (artisanCategory: Array<any>) => {
          this.$state.setState({ artisanCategory });
        },
        error: () => {
          this.$state.setState({ loading: false });
        },
        complete: () => {
          this.$state.setState({ loading: false });
        },
      });
  }

  getCompanyCategory(companyId: string): Observable<any> {
    return this.http
      .get(`${baseUrl}/companies/categories/get/${companyId}`)
      .pipe(
        map((res: any) => res.data), // Assuming the response has a 'data' field containing the categories
        catchError((err) => {
          console.error('Error fetching company categories', err);
          return of([]);
        })
      );
  }

  getArtisanReview(artisanId: string): Observable<any> {
    return this.http
      .get(`${baseUrl}/reviews/get/web/${artisanId}`)
      .pipe(
        map((res: any) => res.data), // Assuming the response has a 'data' field containing the categories
        catchError((err) => {
          return of([]);
        })
      );
  }

  getComplaints(): Observable<any> {
    return this.http.get(`${baseUrl}/customers/get/complaints`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  getVersions(): Observable<any> {
    return this.http.get(`${baseUrl}/versions/get/all`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  getCompanies(): void {
    this.$state.setState({ loading: true });
    this.http
      .get(`${baseUrl}/companies/get`)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      )
      .subscribe({
        next: (companies: Array<any>) => {
          this.$state.setState({ companies });
        },
        error: () => {
          this.$state.setState({ loading: false });
        },
        complete: () => {
          this.$state.setState({ loading: false });
        },
      });
  }

  getPendingOrders(): Observable<any> {
    return this.http.get(`${baseUrl}/orders/get/metrics`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  getRoles(): Observable<any> {
    return this.http.get(`${baseUrl}/admin/roles`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  getPermissions(): Observable<any> {
    return this.http.get(`${baseUrl}/admin/permissions`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateArtisan(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/artisan/update/web`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateVersion(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/versions/update`, requestData).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateCompany(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/companies/update`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateCategory(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/categories/update`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateAdmin(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/admin/update`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateAdvertisements(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/adverts/update`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/categories/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  deleteVersion(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/versions/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  deleteArtisanReview(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/reviews/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/admin/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  deleteComplaint(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/customers/delete/complaint/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  deleteAdvert(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/adverts/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateCategoryPhoto(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/categories/update/photo`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateAdvertisementPhoto(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/adverts/update/photo`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateCompanyPhoto(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/companies/update/photo/web`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateArtisanIds(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/artisan/update/document`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateConpanyPhotos(id: string, data: any): Observable<any> {
    const requestData = { id, data };
    return this.http.put(`${baseUrl}/companies/update/document`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  updateDetails(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/admin/update`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  blockCategory(data: any): Observable<any> {
    return this.http
      .put(`${baseUrl}/categories/update/category/status`, data)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      );
  }

  blockAdmin(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/admin/modify/status`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  blockAdvertisement(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/adverts/update/adverts/status`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res: any) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res: any) => res.data)
    );
  }

  addCompany(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/companies/add`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  addVersion(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/versions/create`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  // addAdmin(data: any): Observable<any> {
  //   return this.http.post(`${baseUrl}/admin/add`, data).pipe(
  //     take(1),
  //     catchError((err) => of(err)),
  //     tap((res) => {
  //       if (!res.success) {
  //         throw Error(res.message);
  //       }
  //     }),
  //     map((res) => res.data)
  //   );
  // }

  filterOrders(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/orders/filter`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  // filterOrderStatus(status: any): Observable<any> {
  //   return this.http.post(`${baseUrl}/orders/filterpayload`, status).pipe(
  //     take(1),
  //     catchError((err) => of(err)),
  //     tap((res) => {
  //       if (!res.success) {
  //         throw Error(res.message);
  //       }
  //     }),
  //     map((res) => res.data)
  //   );
  // }

  filterUsers(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/customers/filter/assault`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  filterArtisans(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/artisan/filter`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  filterCompanies(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/companies/filter/date`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  filterComplaints(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/customers/filter/assault`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  filterPaymentTransactions(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/transactions/filter/payments`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  filterPaymentWithdrawals(data: any): Observable<any> {
    return this.http
      .post(`${baseUrl}/transactions/filter/withdrawals`, data)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res) => res.data)
      );
  }

  updateArtisanStatus(id: string, status: string): Observable<any> {
    const payload = { id, status };
    return this.http
      .put(`${baseUrl}/artisan/update/artisan/status`, payload)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res: any) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res: any) => res.data)
      );
  }

  updateCompanyStatus(id: string, status: string): Observable<any> {
    const payload = { id, status };
    return this.http
      .put(`${baseUrl}/companies/update/company/status`, payload)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res: any) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res: any) => res.data)
      );
  }

  updateUserStatus(id: string, status: string): Observable<any> {
    const payload = { id, status };
    return this.http
      .put(`${baseUrl}/customers/update/customer/status`, payload)
      .pipe(
        take(1),
        catchError((err) => of(err)),
        tap((res: any) => {
          if (!res.success) {
            throw Error(res.message);
          }
        }),
        map((res: any) => res.data)
      );
  }

  addAdvertisment(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/adverts/add`, data).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res: any) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res: any) => res.data)
    );
  }

  //   addFaultyBeneficiaryDocument(payload : any) {
  //     console.log(payload);

  //     return this.http.post(`${storageUrl}/storev2`, payload).pipe(
  //       take(1),
  //       catchError((err) => of(err)),
  //       tap((res) => {
  //         if (!res.success) {
  //           throw Error(res.message);
  //         }
  //       }),
  //       map((res) => res.data)
  //     );
  //   }
}
