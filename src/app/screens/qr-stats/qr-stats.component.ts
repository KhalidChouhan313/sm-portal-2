import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';

@Component({
  selector: 'app-qr-stats',
  templateUrl: './qr-stats.component.html',
  styleUrls: ['./qr-stats.component.css'],
})
export class QrStatsComponent implements OnInit {
  qrId: string | null = '';
  qrURL: string | null = '';
  stats: any;
  title: string = '';
  ipAddress: string | null = '';

  constructor(private route: ActivatedRoute, private QR: QrcodeService) { }

  ngOnInit(): void {
    // Fetching query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.qrId = params['qrId']; // qrId is the query parameter in the URL
      this.title = params['title'];
      this.qrURL = params['qrURL'];
      // console.log('QR ID:', this.qrId); // Should log '1000'

      this.QR.getQrCodeStats(params['qrId']).subscribe((res) => {
        // console.log('QR Code Stats:', res);

        this.stats = res;
        this.ipAddress = res.ipAddress;
      });
    });
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'scanned':
        return 'blue';
      case 'processed':
        return 'orange';
      case 'quoted':
        return 'purple';
      case 'completed':
      case 'booked':
        return 'green';
      default:
        return 'black';
    }
  }

  copyToClipboard(value: string) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        // console.log('Copied to clipboard:', value);
        // Optionally show a success message
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}
