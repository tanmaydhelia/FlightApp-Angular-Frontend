import { Component, inject, signal } from '@angular/core';
import { CancelModal } from '../../containers/cancel-modal/cancel-modal';
import { BookingCard } from '../../containers/booking-card/booking-card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../../../core/services/flight';
import { ItineraryDto } from '../../../../core/models/flight-app.model';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule, RouterModule, BookingCard, CancelModal],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private flightService = inject(FlightService);

  bookings = signal<ItineraryDto[]>([]); 
  userEmail = signal<string | null>(null);
  showModal = signal(false);
  pnrToCancel = signal<string | null>(null);

  ngOnInit(): void {
    const email = this.flightService.getUserEmail();
    this.userEmail.set(email);

    if (email) {
      this.loadBookings(email);
    }
  }

  loadBookings(email: string) {
    this.flightService.getBookingHistory(email).subscribe({
      next: (data) => this.bookings.set(data),
      error: (err) => console.error('Error Loading History', err),
    });
  }

  openCancelPopup(pnr: string) {
    this.pnrToCancel.set(pnr);
    this.showModal.set(true);
  }

  closePopup() {
    this.showModal.set(false);
    this.pnrToCancel.set(null);
  }

  confirmCancellation() {
    const pnr = this.pnrToCancel();
    if (pnr) {
      this.flightService.cancelFlight(pnr).subscribe({
        next: () => {
          this.closePopup();
          const email = this.userEmail();
          if (email) this.loadBookings(email);
        },
        error: (err) => alert("Error: " + err.message)
      });
    }
  }
}
