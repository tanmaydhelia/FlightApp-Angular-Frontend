import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { AddFlightForm } from './containers/add-flight-form/add-flight-form';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AdminPanel,
    AddFlightForm
  ],
  exports:[
    AdminPanel
  ]
})
export class AdminModule { }
