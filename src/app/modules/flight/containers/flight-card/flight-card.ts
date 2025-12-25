import { Component, Input } from '@angular/core';
import { FlightSummary } from '../../../../core/models/flight-app.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './flight-card.html',
  styleUrl: './flight-card.css',
})
export class FlightCard {
  @Input({ required: true }) flight!: FlightSummary;
}
