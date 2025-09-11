import { Component, OnInit } from '@angular/core';
import { BotService, AdminService } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-green-qr-code',
  templateUrl: './green-qr-code.component.html',
  styleUrls: ['./green-qr-code.component.css']
})
export class GreenQrCodeComponent {
  qrSrc = '';
  qrShow = false;
  constructor(
    private AS: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // console.log(this.activatedRoute.queryParams['_value']);
    let id1 = this.activatedRoute.queryParams['_value'].id1;
    let id2 = this.activatedRoute.queryParams['_value'].id2;
    let url = `https://api.green-api.com/waInstance${id1}/qr/${id2}`
    this.getQr(url)
  }

  getQr(url) {
    this.qrShow = false;
    this.qrSrc = '';
    this.AS.getGreenApiQrCode(url).subscribe(qrRes => {
      if (qrRes.type == 'qrCode') {
        this.qrSrc = `data:image/png;base64,${qrRes['message']}`
        this.qrShow = true;
      }
      setTimeout(() => { this.getQr(url) }, 15000)
    })
  }
}
