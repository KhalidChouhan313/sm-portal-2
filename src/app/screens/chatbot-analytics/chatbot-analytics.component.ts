import { Component } from '@angular/core';
import { BookingsService } from 'src/services';

@Component({
  selector: 'app-chatbot-analytics',
  templateUrl: './chatbot-analytics.component.html',
  styleUrls: ['./chatbot-analytics.component.css'],
})
export class ChatbotAnalyticsComponent {
  constructor(private bookingService: BookingsService) {}
  devices = [];
  showFilters = false;
  data: any = {};
  vehicle_insights: any;
  price_base_stats: any;
  // data = {
  //   averageFareValue: 0,
  //   totalTripValue: 0,
  //   totalBookingCount: 0,
  //   categorizedBookings: 0
  // };

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    // console.log(currentUser);

    if (!currentUser) {
    }
    // console.log(currentUser);

    this.bookingService
      .getChatbotDashboardDetails(currentUser._id)
      .subscribe((res) => {
        this.bookingService
          .getBookingStats(currentUser._id)
          .subscribe((bDetails: any) => {
            this.bookingService
              .totalTripValueStats(currentUser._id)
              .subscribe((bDetails2: any) => {
                // console.log(bDetails, bDetails2);

                this.data = res;
                this.data['totalBookingCount'] = bDetails.totalBookingCount;
                this.data['categorizedBookings'] = bDetails.categorizedBookings;
                this.data['averageFareValue'] =
                  bDetails2.averageFareValue.toFixed(2);
                this.data['totalTripValue'] =
                  bDetails2.totalTripValue.toFixed(2);
                this.data['booking_conversion_rate'] = (
                  this.data.totalBookingCount / this.data.interaction
                ).toFixed(2);
                // console.log(this.data, 'fff');
              });
          });
      });

    this.bookingService
      .vehicleTypesStats(currentUser._id)
      .subscribe((vDetails: any) => {
        this.vehicle_insights = vDetails;
      });

    this.bookingService
      .priceBasedStats(currentUser._id)
      .subscribe((bDetails: any) => {
        this.price_base_stats = bDetails;
      });
  }
}
