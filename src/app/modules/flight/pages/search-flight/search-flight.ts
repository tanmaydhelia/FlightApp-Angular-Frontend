import { Component, inject, signal } from '@angular/core';
import { FlightService } from '../../../../core/services/flight';
import { FlightSearchRequest, FlightSummary } from '../../../../core/models/flight-app.model';
import { CommonModule } from '@angular/common';
import { SearchForm } from '../../containers/search-form/search-form';
import { FlightCard } from '../../containers/flight-card/flight-card';

@Component({
  selector: 'app-search-flight',
  standalone:true,
  imports: [CommonModule, SearchForm, FlightCard],
  templateUrl: './search-flight.html',
  styleUrl: './search-flight.css',
})
export class SearchFlight {
  private flightService = inject(FlightService);

  searchResults = signal<FlightSummary[]>([]);
  hasSearched = signal(false);
  isLoading = signal(false);

  onSearch(criteria: FlightSearchRequest) {
    this.isLoading.set(true);
    this.hasSearched.set(true);
    
    this.flightService.searchFlights(criteria).subscribe({
      next: (data) => {
        this.searchResults.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Search failed', err);
        this.isLoading.set(false);
        alert('Could not fetch flights. Check console for details.');
      }
    });
  }
}