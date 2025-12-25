import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-passenger-detail',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './passenger-detail.html',
  styleUrl: './passenger-detail.css',
})
export class PassengerDetail {
  @Input({ required: true }) passengerForm!: FormGroup;
  @Input({ required: true }) index!: number;
  @Input({ required: true }) isActive: boolean = false;
  
  @Output() activated = new EventEmitter<number>();

  onActivate(): void {
    this.activated.emit(this.index);
  }
}
