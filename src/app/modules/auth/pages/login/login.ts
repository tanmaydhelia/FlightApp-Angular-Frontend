import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightService } from '../../../../core/services/flight';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../../containers/login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginForm],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
 private flightService = inject(FlightService);
  private router = inject(Router);

  isLoading = signal(false);
  error = signal('');

  onLogin(credentials: any) {
    this.isLoading.set(true);
    this.error.set('');

    this.flightService.login(credentials).subscribe({
      next: (token) => {
        const expiryTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem('token', token); 
        localStorage.setItem('tokenExpiry', expiryTime.toString()); 
        this.isLoading.set(false);
        this.router.navigate(['/flights/search']); 
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set('Invalid username or password.'); 
        console.error('Login error:', err);
      }
    });
  }
  
}
