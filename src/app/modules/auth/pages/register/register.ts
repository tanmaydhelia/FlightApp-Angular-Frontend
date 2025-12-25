import { Component, inject } from '@angular/core';
import { FlightService } from '../../../../core/services/flight';
import { Router } from '@angular/router';
import { RegisterForm } from '../../containers/register-form/register-form';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.css',
})


export class Register {
 private flightService = inject(FlightService);
  private router = inject(Router);

  onRegister(userData: any) {
    this.flightService.register(userData).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (err) => alert('Registration failed: ' + err.message)
    });
  }
}
