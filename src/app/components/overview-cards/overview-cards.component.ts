import { Component, Input, OnInit } from '@angular/core';
import { BookingsService } from 'src/services';

@Component({
  selector: 'app-overview-cards',
  templateUrl: './overview-cards.component.html',
  styleUrls: ['./overview-cards.component.css'],
})
export class OverviewCardsComponent implements OnInit {
  @Input() totalInteractions = 0;
  @Input() totalBookings = 0;
  @Input() bookingConversionRate = 0;
  @Input() totalTripValue = 0;
  @Input() averageFare = 0;
  overviewCards = [];
  constructor(private BS: BookingsService) { }

  formatCurrency(value) {
    let str = value.toString().replace(/£/g, '').trim();

    // Check if it contains a decimal
    const hasDecimal = str.includes('.');

    const num = parseFloat(str);
    if (isNaN(num)) return 'Invalid input';

    const hasPound = typeof value === 'string' && value.includes('£');

    const formatted = num.toLocaleString('en-GB', {
      minimumFractionDigits: hasDecimal ? 2 : 0,
      maximumFractionDigits: hasDecimal ? 2 : 0,
    });

    return hasPound ? '£' + formatted : formatted;
  }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    // console.log(
    //   this.totalInteractions,
    //   this.totalBookings,
    //   this.bookingConversionRate,
    //   this.totalTripValue,
    //   this.averageFare
    // );

    this.overviewCards = [
      {
        title: 'Total Interactions',
        value: this.totalInteractions ? this.totalInteractions : 0,
        description: '',
      },
      {
        title: 'Total Bookings',
        value: this.totalBookings ? this.totalBookings : 0,
        description: '',
      },
      {
        title: 'Booking Conversion Rate',
        value: `${(this.bookingConversionRate * 100).toFixed(2)}%`,
        description: '',
      },
      {
        title: 'Total Trip Value',
        value: `£${this.totalTripValue ? this.totalTripValue : 0}`,
        description: '',
      },
      {
        title: 'Average Fare',
        value: `£${this.averageFare ? this.averageFare : 0}`,
        description: '',
      },
    ];
  }
}
