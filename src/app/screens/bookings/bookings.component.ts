import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  showBanner = false;
  menuItems = [
    {
      name: 'All Bookings',
      icon: '',
    },
    {
      name: 'Complete',
      icon: '',
    },
    {
      name: 'Cancel',
      icon: '',
    },
    {
      name: 'Upcoming',
      icon: '',
    },
    {
      name: 'In progress',
      icon: '',
    },
  ];

  currentItem: { name: string; icon: string } = this.menuItems[0];
  setCurrentItem = (item: any) => (this.currentItem = item);
  loading = true;
  // bookings
  bookings: any[] = [];
  botDetails: any;
  currentBookingDetails: any;
  selectedBooking: string = '';

  constructor(
    private bookingsService: BookingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!currentUser) {
      this.router.navigateByUrl('login');
    }
    // console.log(currentUser._id);

    this.bookingsService.getCompanyBookings(currentUser._id).subscribe(
      (res) => {
        // console.log('bookings', res);
        this.bookingsService
          .getCompanyBots(currentUser._id)
          .subscribe((bot) => {
            this.botDetails = bot.data[0];
          });
        this.bookings = res.data
          ?.map((item: any) => ({ ...item, selected: false }))
          ?.sort(
            (a: any, b: any) =>
              new Date(b?.createdAt).getTime() -
              new Date(a?.createdAt).getTime()
          );
        this.loading = false;
      },
      (err) => {
        this.bookings = [];
        this.loading = false;
      }
    );
  }

  bookingLoader = false;
  selectBooking = (item: any) => {
    this.bookingLoader = true;
    if (item._id === this.selectedBooking) {
      this.selectedBooking = '';
      this.currentBookingDetails = null;
    } else {
      this.bookingsService
        .getBookingDetails(item.booking_id, this.botDetails._id)
        .subscribe((bookingData) => {
          this.bookingLoader = false;
          this.currentBookingDetails = bookingData.data;
          this.selectedBooking = item?._id;
          // console.log(bookingData);
        });
    }
  };

  // bookings dummy
  bookingsDummy = [
    {
      selected: false,
      booking_id: '56873038',
      company_id: '5fa33297c9ec66867188999f',
      createdAt: new Date('2024-11-26T10:46:34.924Z').toLocaleString(),
      date: '',
      phone: '923070186322',
      time: 'ASAP',
      _id: '6745a70a75994f2a07415264a',
    },
  ];
}
