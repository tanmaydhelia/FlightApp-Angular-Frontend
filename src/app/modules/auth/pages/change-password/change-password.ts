import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlightService } from '../../../../core/services/flight';
import { Router } from '@angular/router';
import { PasswordForm } from '../../containers/password-form/password-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone:true,
  imports: [CommonModule, PasswordForm],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  private flightService = inject(FlightService);
  private router = inject(Router);

  @ViewChild(PasswordForm) formComponent!: PasswordForm;

  message = signal('');

  onUpdate(formData: any) {
    const request = {
      username: this.flightService.getUsername(),
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    };

    this.flightService.changePassword(request).subscribe({
      next: (res) => {
        this.message.set(res);
        this.formComponent.reset();
        // Redirect back to profile after success
        setTimeout(() => this.router.navigate(['/auth/profile']), 2000);
      },
      error: () => this.message.set("Failed to change password.")
    });
  }
}
