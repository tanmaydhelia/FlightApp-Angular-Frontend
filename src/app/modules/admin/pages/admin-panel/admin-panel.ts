import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { AddFlightForm } from '../../containers/add-flight-form/add-flight-form';
import { FlightService } from '../../../../core/services/flight';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, AddFlightForm],
  providers: [DatePipe],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {
  private flightService = inject(FlightService);
  private datePipe = inject(DatePipe);

  @ViewChild(AddFlightForm) formComponent!: AddFlightForm;

  status = signal('');

  private formatDateForBackend(dateString: string): string {
    if (!dateString) return '';
    return this.datePipe.transform(dateString, 'yyyy-MM-ddTHH:mm') || '';
  }

  onAddFlight(formValue: any) {
    const payload = {
      airlineCode: formValue.airlineCode,
      flights: [
        {
          fromAirport: formValue.fromAirport,
          toAirport: formValue.toAirport,
          departureTime: this.formatDateForBackend(formValue.departureTime),
          arrivalTime: this.formatDateForBackend(formValue.arrivalTime),
          price: formValue.price,
          totalSeats: formValue.totalSeats,
        },
      ],
    };

    this.flightService.addFlightInventory(payload).subscribe({
      next: () => {
        this.status.set('Flight added successfully!');
        this.formComponent.reset();
      },
      error: (err) => {
        this.status.set('Error: ' + (err.error?.message || 'Check console for details'));
      },
    });
  }
}
