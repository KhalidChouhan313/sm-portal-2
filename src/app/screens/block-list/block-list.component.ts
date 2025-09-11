import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { BotService } from 'src/services';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css'],
})
export class BlockListComponent {
  tabs = ['All Messages', 'WhatsApp', 'SMS', 'Non-whatsapp', 'Non-SMS'];
  tab: any = this.tabs[0];
  showBanner = true;
  showAddCon = false;
  currentUser: any;
  blacklist = [];
  filteredBlacklist: any[] = [];
  phone = '';
  isLoad = true;
  whatsapp = false;
  sms = false;
  type = '';
  isWhatsApp = false;
  isSMS = false;

  updateType(option: string): void {
    if (option === 'whatsapp') {
      this.isWhatsApp = !this.isWhatsApp;
    } else if (option === 'sms') {
      this.isSMS = !this.isSMS;
    }

    // Set the type value based on active switches
    if (this.isWhatsApp && this.isSMS) {
      this.type = 'both';
    } else if (this.isWhatsApp) {
      this.type = 'whatsapp';
    } else if (this.isSMS) {
      this.type = 'sms';
    } else {
      this.type = '';
    }
  }

  updatePhone(event: Event): void {
    this.phone = (event.target as HTMLInputElement).value;
  }

  constructor(private router: Router, private BS: BotService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!this.currentUser) {
      this.router.navigateByUrl('/login');
    }

    this.BS.getBlacklistUser(this.currentUser._id).subscribe((list) => {
      this.blacklist = list;
      this.filterBlacklist(); // Initial filtering based on the default tab
      this.isLoad = false;
    });
  }

  showPhoneNumber() {
    const enteredNumber = this.numberControl.value;
    const foundNumber = this.filteredBlacklist.find(
      (item) => item.phone === enteredNumber
    );

    if (foundNumber) {
      this.filteredBlacklist = [foundNumber];
    } else if (!enteredNumber) {
      this.filterBlacklist();
    } else {
      this.filteredBlacklist = [];
    }
  }

  addBlacklistUser() {
    this.isLoad = true;
    let obj = {
      user_id: this.currentUser._id,
      phone: this.phone,
      whatsapp: this.type === 'whatsapp' || this.type === 'both' ? true : false,
      sms: this.type === 'sms' || this.type === 'both' ? true : false,
    };
    this.BS.setBlacklistUser(obj).subscribe(
      (usr) => {
        this.phone = '';
        this.type = '';
        this.blacklist.push(usr);
        this.isLoad = false;
        this.whatsapp = false;
        this.sms = false;
        this.showAddCon = false;
      },
      (err) => {
        if (err.status == 400) {
          alert('Number already exist..!');
          this.isLoad = false;
          this.whatsapp = false;
          this.sms = false;
          this.phone = '';
        }
      }
    );
  }

  blockWhatsApp(e, user, index) {
    this.isLoad = true;
    let obj = {
      _id: user,
      whatsapp: e,
    };

    this.BS.updateBlacklistUser(obj).subscribe(
      (usr) => {
        this.blacklist[index].whatsapp = e;
        this.isLoad = false;
        this.whatsapp = false;
        this.sms = false;
      },
      (err) => {
        this.phone = '';
        this.isLoad = false;
        this.whatsapp = false;
        this.sms = false;
      }
    );
  }

  blockSms(e, user, index) {
    this.isLoad = true;
    let obj = {
      _id: user,
      sms: e,
    };

    this.BS.updateBlacklistUser(obj).subscribe(
      (usr) => {
        this.blacklist[index].sms = e;
        this.isLoad = false;
        this.whatsapp = false;
        this.sms = false;
      },
      (err) => {
        this.phone = '';
        this.isLoad = false;
        this.whatsapp = false;
        this.sms = false;
      }
    );
  }

  numberControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{12}$'), // 12-digit numeric validation
  ]);

  get isInvalid() {
    return this.numberControl.invalid && this.numberControl.touched;
  }

  restrictInput(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  deleteBlacklistUser(user, index) {
    this.isLoad = true;
    this.BS.deleteBlacklistUser(user).subscribe(
      (usr) => {
        this.blacklist.splice(index, 1);
        this.isLoad = false;
      },
      (err) => {
        this.isLoad = false;
      }
    );
  }

  isVisible: boolean = false; // Initial state

  toggleVisibility() {
    // console.log('working');
    this.isVisible = !this.isVisible; // Toggle the boolean value
  }

  onTabChange(tab: string) {
    this.tab = tab;
    this.filterBlacklist();
  }

  filterBlacklist() {
    if (this.tab === 'All Messages') {
      this.filteredBlacklist = this.blacklist;
    } else if (this.tab === 'WhatsApp') {
      this.filteredBlacklist = this.blacklist.filter((item) => item.whatsapp);
    } else if (this.tab === 'SMS') {
      this.filteredBlacklist = this.blacklist.filter((item) => item.sms);
    } else if (this.tab === 'Non-whatsapp') {
      this.filteredBlacklist = this.blacklist.filter((item) => !item.whatsapp);
    } else if (this.tab === 'Non-SMS') {
      this.filteredBlacklist = this.blacklist.filter((item) => !item.sms);
    }
  }
}
