import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-form.html',
  styleUrl: './password-form.css',
})
export class PasswordForm {
private fb = inject(FormBuilder);

  @Output() update = new EventEmitter<any>();

  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.passwordForm.valid) {
      this.update.emit(this.passwordForm.value);
    }
  }
  reset() {
    this.passwordForm.reset();
  } 
}
