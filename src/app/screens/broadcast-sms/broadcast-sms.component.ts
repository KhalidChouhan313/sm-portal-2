import { Component, Input } from '@angular/core';
import { BotService, AdminService } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-broadcast-sms',
  templateUrl: './broadcast-sms.component.html',
  styleUrls: ['./broadcast-sms.component.css'],
})
export class BroadcastSmsComponent {
  // private serviceModal: NgbModalRef;
  showHoverText = false;
  showContactHoverText = false;
  adminDetails: any;
  broadcastList = [];
  currentBroadcastIndex = -1;
  confirmationType = '';
  isVisible = false;
  name = '';
  delay = 0;
  column = 1;
  messageBody = '';
  excelHeaders: string[] = [];
  excelData: any[] = [];
  isLoad = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private _serviceModal: NgbModal,
    private AS: AdminService,
    private BS: BotService
  ) {}
  // .ts file

  addMode = false;
  showDateAndTimeModal = false;
  @Input() newBroadcastDesc = '';

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!currentUser) {
      this.router.navigateByUrl('login');
    }
    this.AS.getUser(currentUser._id).subscribe((admin) => {
      this.adminDetails = admin;
      this.BS.getBroadcast(this.adminDetails._id).subscribe((res) => {
        this.broadcastList = res;
        // console.log(res);
      });
    });
  }

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const data = e.target?.result;
  //     const workbook = XLSX.read(data, { type: 'array' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const excelData = XLSX.utils.sheet_to_json(worksheet);

  //     console.log(excelData);
  //   };

  //   reader.readAsArrayBuffer(file);
  // }

  terminateBroadcast(index, broadcast) {
    this.isVisible = true;
    this.currentBroadcastIndex = index;
    this.confirmationType = 'terminate';
    //  this.serviceModal = this._serviceModal.open(ConfirmationModalComponent);
    //   this.serviceModal.componentInstance.msg = "Are you sure you want to terminate this broadcast?"
    //   this.serviceModal.result.then((result) => {
    //     this.BS.pauseBroadcast(broadcast._id).subscribe(res => {
    //       this.BS.getBroadcast(this.adminDetails._id).subscribe(res => {
    //         this.broadcastList = res;
    //       })
    //     })
    //   }, (reason) => {
    //     // console.log('cross');
    //   })
  }

  confirm(broadcast) {
    if (this.confirmationType == 'terminate') {
      this.BS.pauseBroadcast(broadcast._id).subscribe((res) => {
        this.BS.getBroadcast(this.adminDetails._id).subscribe((res) => {
          this.broadcastList = res;
          this.currentBroadcastIndex = -1;
          this.isVisible = false;
        });
      });
    }
    if (this.confirmationType == 'delete') {
      this.BS.deleteBroadcast(broadcast._id).subscribe((res) => {
        this.broadcastList.splice(this.currentBroadcastIndex, 1);
        this.currentBroadcastIndex = -1;
        this.isVisible = false;
      });
    }
  }

  cancel() {
    this.currentBroadcastIndex = -1;
    this.isVisible = false;
  }

  deleteBroadcast(index, broadcast) {
    this.isVisible = true;
    this.currentBroadcastIndex = index;
    this.confirmationType = 'delete';
    // this.serviceModal = this._serviceModal.open(ConfirmationModalComponent);
    // this.serviceModal.componentInstance.msg = "Are you sure you want to delete this?"
    // this.serviceModal.result.then((result) => {
    //   this.BS.deleteBroadcast(broadcast._id).subscribe(res => {
    //     this.broadcastList.splice(index, 1);
    //   })
    // }, (reason) => {
    //   // console.log('cross');
    // })
  }

  addBroadcast() {
    this.router.navigateByUrl('/bot/broadcast');
  }

  // showText() {
  //   this.showHoverText = true;

  // }

  // hideText() {
  //   this.showHoverText = false;
  // }

  hideTextOfContact() {
    this.showContactHoverText = false;
  }

  showTextOfContact() {
    this.showContactHoverText = true;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;

      const workbook = XLSX.read(data, {
        type: 'array',
      });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      if (this.excelData.length > 0) {
        console.log(this.excelData);
        this.excelHeaders = this.excelData[0];

        this.excelData.splice(0, 1); // Remove the header row
      }
    };

    reader.readAsArrayBuffer(file);
  }

  setBroadcast() {
    this.isLoad = true;
    let contacts = [];
    if (this.delay >= 0 && this.column > 0) {
      this.excelData.map((rl) => {
        let number = rl[this.column - 1].toString();
        number.replace('+', '');
        if (number.startsWith('7')) {
          number = '44' + number;
        }
        if (number.startsWith('07')) {
          number = number.slice(1);
          number = '44' + number;
        }
        if (number.startsWith('00447')) {
          number = number.slice(2);
        }
        if (number.startsWith('447')) {
          contacts.push(number);
        }
      });
      let obj = {
        company_id: this.adminDetails._id,
        broadcast_name: this.name,
        message_body: this.messageBody,
        delay_time: this.delay,
        contacts: contacts,
      };
      // console.log(obj);

      this.BS.setBroadcast(obj).subscribe((res) => {
        this.name = '';
        this.messageBody = '';
        this.delay = 0;
        this.column = 1;
        this.isLoad = false;
        this.addMode = false;
        // setTimeout(() => { window.location.reload() }, 5000)
      });
    } else {
      alert('Set delay and Contact column.');
    }
  }

  showText() {
    this.showHoverText = true;
  }

  hideText() {
    this.showHoverText = false;
  }
}
