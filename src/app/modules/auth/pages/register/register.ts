import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightService } from '../../../../core/services/flight';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})


export class Register {
  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)
      ]
    ],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value as any;

      this.flightService.register(user).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Registration failed. Try again.');
        },
      });
    }
  }
}
