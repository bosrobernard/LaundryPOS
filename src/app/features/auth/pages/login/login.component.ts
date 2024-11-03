import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { authService } from '../../../../../services/auth.service';
import { AppState } from '../../../../state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;
  errorMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private authService: authService,
    private router: Router,
    private snackBar: MatSnackBar,
    private appState: AppState
  ) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit() {}

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const loginData = {
      phone: this.loginForm.get('phone')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        // Check if the user is authenticated after login
        if (this.appState.getState().isAuthenticated) {
          this.router.navigate(['dashboard']);

        } else {
          // Handle authentication failure
          this.errorMessage =
            'Authentication failed. Please check your credentials.';
          console.error('Login failed: Authentication failed');
          this.loading = false;

        }
      },
      error: (err) => {
        // Handle other errors
        this.errorMessage =
          err;
        console.error('Login failed', err);
        this.loading = false;

      },
    });
  }
}
