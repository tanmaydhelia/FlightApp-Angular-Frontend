import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-modal',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './cancel-modal.html',
  styleUrl: './cancel-modal.css',
})
export class CancelModal {
  @Input({ required: true }) pnr!: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
