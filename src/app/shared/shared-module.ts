import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from './components/navbar/navbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    Navbar
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    Navbar
  ]
})
export class SharedModule { }
