import { Component } from '@angular/core';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css'],
})
export class CampaignDetailsComponent {
  campaigns = [
    {
      contact: 'Techon Ventures',
      phone: '+923332223300',
      date: '2025-09-29 09:00:00',
      status: 'Accepted',
    },
    {
      contact: 'Techon Ventures',
      phone: '+923332223301',
      date: '2025-09-29 09:00:00',
      status: 'Accepted',
    },
    {
      contact: 'Techon Ventures',
      phone: '+923332223302',
      date: '2025-09-29 09:00:00',
      status: 'Accepted',
    },
    {
      contact: 'Techon Ventures',
      phone: '+923332223303',
      date: '2025-09-29 09:00:00',
      status: 'Accepted',
    },
    {
      contact: 'Techon Ventures',
      phone: '+923332223304',
      date: '2025-09-29 09:00:00',
      status: 'Accepted',
    },
    {
      contact: 'Techon Ventures',
      phone: '+923332223305',
      date: '2025-09-29 09:00:00',
      status: 'Accepted',
    },
  ];
}
