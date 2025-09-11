import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart, Colors } from 'chart.js';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements AfterViewInit {
  @Input() asap = 0;
  @Input() pre_booking = 0;
  data = [];
  labels = [];
  colors = ['#964de5', '#7ce0d8']; //['#e167ff', '#7ce0d8', '#964de5']
  ngAfterViewInit() {
    let totalData = this.asap + this.pre_booking;
    this.data = [
      (this.asap / totalData) * 100,
      (this.pre_booking / totalData) * 100,
    ];
    this.labels = ['ASAP', 'Pre Booking'];
    new Chart('bookingDetailsChart', {
      type: 'doughnut',
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const dataset = tooltipItem.dataset;
                const data = dataset.data as number[];
                const total = data.reduce((sum, value) => sum + value, 0);
                const value = data[tooltipItem.dataIndex];
                const percentage = total
                  ? ((value / total) * 100).toFixed(1)
                  : 0;
                const label = tooltipItem.label || '';
                return `${label}: ${percentage}%`;
              },
            },
          },
        },
      },
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
          },
        ],
      },
    });
  }
}
