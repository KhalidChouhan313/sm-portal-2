import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-stacks',
  templateUrl: './qr-stacks.component.html',
  styleUrls: ['./qr-stacks.component.css'],
})
export class QrStacksComponent implements OnInit {
  qrId: string | null = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetching query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.qrId = params['qrId']; // qrId is the query parameter in the URL
      // console.log('QR ID:', this.qrId); // Should log '1000'
    });
  }
}
