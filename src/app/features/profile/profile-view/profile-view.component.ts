import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from '../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  profile: UserProfile | null = null;
  profileForm: FormGroup;
  isEditing = false;
  isLoading = true;
  isSaving = false;

  recentActivity = [
    { action: 'Processed Order #1234', time: new Date('2024-01-17T10:30:00') },
    { action: 'Updated Customer Profile', time: new Date('2024-01-17T09:15:00') },
    { action: 'Completed Training', time: new Date('2024-01-16T16:45:00') }
  ];

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      settings: this.fb.group({
        notifications: [true],
        twoFactorAuth: [false],
        emailUpdates: [true]
      })
    });
  }

  loadProfile(): void {
    this.isLoading = true;
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.profileForm.patchValue(profile);
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Error loading profile', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onEdit(): void {
    this.isEditing = true;
  }

  onCancel(): void {
    this.profileForm.patchValue(this.profile!);
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.profileService.updateProfile(this.profileForm.value).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.isEditing = false;
          this.isSaving = false;
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
          this.isSaving = false;
        }
      });
    }
  }

  onAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileService.updateAvatar(file).subscribe({
        next: (avatarUrl) => {
          if (this.profile) {
            this.profile.avatar = avatarUrl;
          }
          this.snackBar.open('Avatar updated successfully', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error updating avatar', 'Close', { duration: 3000 });
        }
      });
    }
  }
}