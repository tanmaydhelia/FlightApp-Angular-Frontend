import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seat-map',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './seat-map.html',
  styleUrl: './seat-map.css',
})
export class SeatMap {
  @Input({ required: true }) occupiedSeats: string[] = [];
  @Input({ required: true }) selectedSeats: string[] = [];
  @Input() rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Input() cols: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  @Output() seatSelected = new EventEmitter<string>();

  isOccupied(seatId: string): boolean {
    return this.occupiedSeats.includes(seatId);
  }

  isSelected(seatId: string): boolean {
    return this.selectedSeats.includes(seatId);
  }

  onSeatClick(seatId: string): void {
    if (!this.isOccupied(seatId)) {
      this.seatSelected.emit(seatId);
    }
  }
}
