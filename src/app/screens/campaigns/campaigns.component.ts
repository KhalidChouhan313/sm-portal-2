import { Component } from '@angular/core';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
})
export class CampaignsComponent {
  isVisible = false;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  broadcasts = [
    {
      dateTime: ' 12/07/2024, 4:38PM',
      campaignName: 'This is the new Campaign',
      template: 'Broadcast template 5',
      contacts: 452,
      deliveryRate: '385/452',
      readRate: '385/452',
      status: 'Completed',
    },
    {
      dateTime: ' 12/07/2024, 4:38PM',
      campaignName: 'This is the new Campaign',
      template: 'Broadcast template 5',
      contacts: 452,
      deliveryRate: '385/452',
      readRate: '385/452',
      status: 'Completed',
    },
    {
      dateTime: ' 12/07/2024, 4:38PM',
      campaignName: 'This is the new Campaign',
      template: 'Broadcast template 5',
      contacts: 452,
      deliveryRate: '385/452',
      readRate: '385/452',
      status: 'Completed',
    },
    {
      dateTime: ' 12/07/2024, 4:38PM',
      campaignName: 'This is the new Campaign',
      template: 'Broadcast template 5',
      contacts: 452,
      deliveryRate: '385/452',
      readRate: '385/452',
      status: 'Completed',
    },
    {
      dateTime: ' 12/07/2024, 4:38PM',
      campaignName: 'This is the new Campaign',
      template: 'Broadcast template 5',
      contacts: 452,
      deliveryRate: '385/452',
      readRate: '385/452',
      status: 'Completed',
    },
  ];
}
