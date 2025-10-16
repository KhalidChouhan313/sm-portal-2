import { Component, OnInit } from '@angular/core';
import { BroadcastService } from 'src/services/broad-casts/broadcast.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
})
export class CampaignsComponent implements OnInit {
  broadcasts: any[] = [];
  isVisible = false;
  loading = false;
  constructor(private bdcast: BroadcastService) {}

  ngOnInit(): void {
    this.fetchBroadcasts();
    console.log(this.broadcasts);
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  fetchBroadcasts() {
    const Job_Id = '7';

    this.loading = true;
    this.bdcast.getBroadcast(Job_Id).subscribe({
      next: (response) => {
        console.log('Response:', response);
        if (Array.isArray(response)) {
          this.broadcasts = response;
        } else {
          this.broadcasts = [response];
        }
      },
      error: (err) => {
        console.error('Error fetching broadcasts:', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
