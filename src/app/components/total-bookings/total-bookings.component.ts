import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-bookings',
  templateUrl: './total-bookings.component.html',
  styleUrls: ['./total-bookings.component.css']
})
export class TotalBookingsComponent {
  @Input() bookingData: any;

  // totalBookings = 296;
  // bookingsIncrease = 0;
  // bookingData: any;
  ngOnInit(): void {
    console.log(this.bookingData, 'dd');

    // this.bookingsIncrease = 8;
    // this.bookingData = { total: this.totalBookings, cancel: 0 };
  }
}
