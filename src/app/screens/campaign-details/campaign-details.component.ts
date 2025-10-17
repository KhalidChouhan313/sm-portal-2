import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BroadcastService } from 'src/services/broad-casts/broadcast.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css'],
})
export class CampaignDetailsComponent {
  campaignId: string | null = null;
  campaign: any;
  contacts: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private bdService: BroadcastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.campaignId = params['id'];
      if (this.campaignId) {
        this.fetchCampaignDetails(this.campaignId);
      }
      console.log('contacts', this.contacts);
    });
  }

  fetchCampaignDetails(id: string) {
    this.bdService.getBroadcast(id).subscribe({
      next: (res) => {
        this.campaign = res;
        this.contacts = res.contacts || [];
      },
      error: (err) => {
        console.error('Error fetching campaign details:', err);
      },
    });
  }
}
