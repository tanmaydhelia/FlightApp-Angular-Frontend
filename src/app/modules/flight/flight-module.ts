import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookFlight } from './pages/book-flight/book-flight';
import { SearchForm } from './containers/search-form/search-form';
import { FlightCard } from './containers/flight-card/flight-card';
import { SeatMap } from './containers/seat-map/seat-map';
import { PassengerDetail } from './containers/passenger-detail/passenger-detail';
import { SearchFlight } from './pages/search-flight/search-flight';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SearchFlight,
    BookFlight,
    SearchForm,
    FlightCard,
    SeatMap,
    PassengerDetail
  ],
  exports:[
    SearchFlight,
    BookFlight
  ]
})
export class FlightModule { }
