import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightSearchRequest } from '../../../../core/models/flight-app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css',
})
export class SearchForm {
  private fb = inject(FormBuilder);
  @Output() search = new EventEmitter<FlightSearchRequest>();

  minDate = new Date().toISOString().split('T')[0];

  searchForm = this.fb.group({
    from: ['VNS', Validators.required],
    to: ['VLR', Validators.required],
    journeyDate: ['', Validators.required],
    tripType: ['ONE_WAY', Validators.required]
  });

  onSearchSubmit() {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value as FlightSearchRequest);
    }
  }
}
