import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItineraryDto } from '../../../../core/models/flight-app.model';

@Component({
  selector: 'app-booking-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.css',
})
export class BookingCard {
  @Input({ required: true }) booking!: ItineraryDto;
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit(this.booking.pnr);
  }
}
