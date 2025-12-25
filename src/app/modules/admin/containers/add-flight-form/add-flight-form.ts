import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-flight-form',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-flight-form.html',
  styleUrl: './add-flight-form.css',
})
export class AddFlightForm {
  private fb = inject(FormBuilder);
  
  // Emits the form value to the smart parent component
  @Output() submitFlight = new EventEmitter<any>();
  @Input() statusMessage: string = '';

  flightForm = this.fb.group({
    airlineCode: ['', Validators.required],
    fromAirport: ['', Validators.required],
    toAirport: ['', Validators.required],
    departureTime: ['', Validators.required], 
    arrivalTime: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    totalSeats: [60, [Validators.required, Validators.min(1)]],
    availableSeats: [60, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.flightForm.valid) {
      this.submitFlight.emit(this.flightForm.value);
    }
  }

  reset() {
    this.flightForm.reset({ totalSeats: 60, availableSeats: 60 });
  }
}
