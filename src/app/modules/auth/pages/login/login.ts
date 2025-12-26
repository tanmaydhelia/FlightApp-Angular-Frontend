import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightService } from '../../../../core/services/flight';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../../containers/login-form/login-form';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginForm, GoogleSigninButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit{
  private flightService = inject(FlightService);
  private router = inject(Router);
  private socialAuthService = inject(SocialAuthService);

  isLoading = signal(false);
  error = signal('');

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user && user.idToken) {
        this.onGoogleLogin(user.idToken);
      }
    });
  }

  onGoogleLogin(idToken: string) {
    this.isLoading.set(true);
    this.flightService.googleLogin(idToken).subscribe({
      next: (token) => {
        this.handleSuccessfulLogin(token);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set('Google authentication failed.');
      }
    });
  }
  
  onLogin(credentials: any) {
    this.isLoading.set(true);
    this.error.set('');

    this.flightService.login(credentials).subscribe({
      next: (token) => this.handleSuccessfulLogin(token),
      error: (err) => {
        this.isLoading.set(false);
        this.error.set('Invalid username or password.'); 
        console.error('Login error:', err);
      }
    });
  }

  private handleSuccessfulLogin(token: string) {
    const expiryTime = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem('token', token); 
    localStorage.setItem('tokenExpiry', expiryTime.toString()); 
    this.isLoading.set(false);
    this.router.navigate(['/flights/search']);
  }
  
}
