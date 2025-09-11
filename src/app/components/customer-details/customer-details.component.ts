import { Component } from '@angular/core';
import { BookingsService } from 'src/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent {
  bookings = [];
  constructor(
    private bookingsService: BookingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!currentUser) {
      this.router.navigateByUrl('/login');
    }
    // console.log(currentUser._id);

    this.bookingsService.getCompanyBookings(currentUser._id).subscribe(
      (res) => {
        // console.log('res', res);
        if (res.data.length > 15) {
          res.data = res.data.slice(0, 15);
        }
        this.bookings = res.data
          ?.map((item: any) => ({ ...item, selected: false }))
          ?.sort(
            (a: any, b: any) =>
              new Date(b?.createdAt).getTime() -
              new Date(a?.createdAt).getTime()
          );
      },
      (err) => {
        this.bookings = [];
      }
    );
  }
}
