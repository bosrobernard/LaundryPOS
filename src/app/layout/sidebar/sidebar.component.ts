import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { AppState } from '../../state/app.state';
import { AppService } from '../../../services/app.service';
import { interval, Observable, startWith, switchMap } from 'rxjs';

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
  inProcessOrdersCount: number = 0;

  constructor(
    private authService: AuthService,
    private appState: AppState,
    private appService: AppService) {}
  
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


    this.loadInProcessOrdersCount();
    interval(30000).pipe(
      startWith(0),
      switchMap(() => this.loadInProcessOrdersCount())
    ).subscribe();
  }

  private loadInProcessOrdersCount(): Observable<void> {
    return new Observable(subscriber => {
      this.appService.getInProcessOrdersCount().subscribe({
        next: (count) => {
          this.inProcessOrdersCount = count;
          subscriber.next();
          subscriber.complete();
        },
        error: (error) => {
          console.error('Error loading orders count:', error);
          subscriber.error(error);
        }
      });
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
