import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlightService } from '../../../../core/services/flight';
import { BookingRequest } from '../../../../core/models/flight-app.model';
import { CommonModule } from '@angular/common';
import { SeatMap } from '../../containers/seat-map/seat-map';
import { PassengerDetail } from '../../containers/passenger-detail/passenger-detail';

@Component({
  selector: 'app-book-flight',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SeatMap, PassengerDetail],
  templateUrl: './book-flight.html',
  styleUrl: './book-flight.css',
})
export class BookFlight implements OnInit{
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private flightService = inject(FlightService);
  private router = inject(Router);

  flightId!: number;
  occupiedSeats: string[] = [];
  selectedSeats: string[] = [];
  activePassengerIndex: number = 0;

  bookingForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tripType: ['ONE_WAY', Validators.required],
    numberOfSeats: [1, [Validators.required, Validators.min(1)]],
    passengers: this.fb.array([]),
  });

  get passengerGroups() {
    return (this.bookingForm.get('passengers') as FormArray).controls as FormGroup[];
  }

  ngOnInit() {
    this.flightId = Number(this.route.snapshot.paramMap.get('id'));
    this.syncPassengerForms();
    this.loadOccupiedSeats();
  }

  loadOccupiedSeats() {
    this.flightService.getOccupiedSeats(this.flightId).subscribe({
      next: (seats) => (this.occupiedSeats = seats),
      error: () => console.error('Could not load seat map'),
    });
  }

  handleSeatSelection(seatId: string) {
    const passengers = this.bookingForm.get('passengers') as FormArray;
    const currentForm = passengers.at(this.activePassengerIndex);

    if (currentForm) {
      const oldSeat = currentForm.get('seatNumber')?.value;
      if (oldSeat) {
        this.selectedSeats = this.selectedSeats.filter(s => s !== oldSeat);
      }
      
      currentForm.get('seatNumber')?.setValue(seatId);
      this.selectedSeats.push(seatId);

      if (this.activePassengerIndex < passengers.length - 1) {
        this.activePassengerIndex++;
      }
    }
  }

  syncPassengerForms() {
    const count = this.bookingForm.get('numberOfSeats')?.value || 1;
    const passengers = this.bookingForm.get('passengers') as FormArray;
    
    while (passengers.length < count) {
      passengers.push(this.fb.group({
        name: ['', Validators.required],
        gender: ['MALE', Validators.required],
        age: [18, [Validators.required, Validators.min(0), Validators.max(100)]],
        mealType: ['VEG', Validators.required],
        seatNumber: ['', Validators.required],
      }));
    }
    while (passengers.length > count) {
      passengers.removeAt(passengers.length - 1);
    }
  }

  onBook() {
    if (this.bookingForm.valid) {
      const request = this.bookingForm.value as BookingRequest;
      this.flightService.bookFlight(this.flightId, request).subscribe({
        next: (res) => {
          alert(`Success! PNR: ${res.pnr}`);
          this.router.navigate(['/flights/search']);
        },
        error: () => alert('Booking failed. Check your token or seats availability.'),
      });
    }
  }
}
