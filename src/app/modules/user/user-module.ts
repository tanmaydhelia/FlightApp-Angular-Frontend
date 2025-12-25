import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { BookingCard } from './containers/booking-card/booking-card';
import { CancelModal } from './containers/cancel-modal/cancel-modal';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    Profile,
    BookingCard,
    CancelModal
  ],
  exports:[
    Profile
  ]
})
export class UserModule { }
