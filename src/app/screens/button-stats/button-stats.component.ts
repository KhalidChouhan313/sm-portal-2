import { Component } from '@angular/core';

@Component({
  selector: 'app-button-stats',
  templateUrl: './button-stats.component.html',
  styleUrls: ['./button-stats.component.css'],
})
export class ButtonStatsComponent {
  templates = [
    {
      title: 'Booking',
      icon: 'assets/icons/Frame.svg',
      active: true,
      totalClicks: 2847,
      items: [
        { label: 'Create Booking', value: 1420, percent: 49.8, type: 'normal' },
        { label: 'Edit Booking', value: 854, percent: 30.1, type: 'normal' },
        { label: 'Cancel Booking', value: 573, percent: 20.1, type: 'danger' },
      ],
    },

    {
      title: 'Tracking',
      icon: 'assets/icons/tracking.svg',
      active: true,
      items: [
        { label: 'Track Driver', value: 1420, percent: 49.8, type: 'normal' },
        { label: 'Share Location', value: 854, percent: 30.1, type: 'normal' },
      ],
    },
    {
      title: 'Paylink 2',
      icon: 'assets/icons/Group 73 (1).png',
      active: true,
      totalClicks: 2847,
      items: [
        { label: 'Cash Payment', value: 1420, percent: 49.8, type: 'normal' },
        { label: 'Card Payment', value: 854, percent: 30.1, type: 'normal' },
      ],
    },
    {
      title: 'Review',
      icon: 'assets/icons/Vector.png',
      active: true,
      totalClicks: 2847,
      items: [
        {
          label: 'Book On Whatsapp',
          value: 1420,
          percent: 49.8,
          type: 'normal',
        },
        {
          label: 'Book On Whatsapp',
          value: 1420,
          percent: 49.8,
          type: 'normal',
        },
        { label: 'Cancel Booking', value: 573, percent: 20.1, type: 'danger' },
      ],
    },
    {
      title: 'Arrived',
      icon: 'assets/icons/Group 73.png',
      active: true,
      // totalClicks: 2847,
      items: [
        { label: 'Fix Here', value: 1420, percent: 49.8, type: 'normal' },
        { label: 'Call Passenger', value: 854, percent: 30.1, type: 'green' },
        { label: 'Wait 5 Minutes', value: 573, percent: 20.1, type: 'normal' },
        {
          label: 'Book On Whatsapp',
          value: 573,
          percent: 20.1,
          type: 'bgn',
        },
        { label: 'Cancel Booking', value: 573, percent: 20.1, type: 'danger' },
      ],
    },
  ];
}
