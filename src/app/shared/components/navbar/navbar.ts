import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FlightService } from '../../../core/services/flight';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public flightService = inject(FlightService);
  private router = inject(Router);
  private socialAuthService = inject(SocialAuthService);

  logout() {
    // Sign out from Google if logged in via Google
    this.socialAuthService.signOut().catch(() => {
      // Ignore error if user wasn't logged in via Google
    });
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');

    this.router.navigate(['/auth/login']);
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
