import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, BookingsService } from 'src/services';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css'],
})
export class AppSettingsComponent implements OnInit {
  isLoad = true;
  currentUser: any = {};
  togglesData = [];
  toggles = [];

  booking_confirmation: boolean = false;
  track_driver_msg: boolean = false;
  arrived_driver_msg: boolean = false;

  constructor(
    private AS: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private BKS: BookingsService
  ) {}

  haveWabaDevice: boolean = false;

  ngOnInit(): void {
    this.isLoad = false;
    const storedUser = localStorage.getItem('user_details');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!this.currentUser) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.AS.getUser(this.currentUser._id).subscribe((user) => {
      this.BKS.getCompanyBots(this.currentUser._id).subscribe((admin) => {
        if (admin.data[0].wa_phone_id.length) {
          this.haveWabaDevice = true;
        }
      });
      // console.log('Fetched user from server:', user);
      this.booking_confirmation = user.booking_confirmation;
      this.track_driver_msg = user.track_driver_msg;
      this.arrived_driver_msg = user.arrived_driver_msg;
      if (
        user.booking_confirmation_time !== '' &&
        user.booking_confirmation_time !== '0'
      ) {
        this.bookingCancelAllow = true;
        this.bookingCancelTime = user.booking_confirmation_time;
      } else {
        this.bookingCancelAllow = false;
      }
      this.cd.detectChanges();
    });

    // console.log(this.currentUser);

    // Initialize togglesData AFTER currentUser is assigned
    this.togglesData = [
      {
        label: 'Otp Sms',
        type: 'otp_sms',
        enabled: !!this.currentUser.otp_sms,
      },
      {
        label: 'Booking Sms',
        type: 'booking_sms',
        enabled: !!this.currentUser.booking_sms,
      },
      {
        label: 'Track Sms',
        type: 'track_sms',
        enabled: !!this.currentUser.track_sms,
      },
      {
        label: 'Paylink Sms',
        type: 'paylink_sms',
        enabled: !!this.currentUser.paylink_sms,
      },
      {
        label: 'Drivew Review Sms',
        type: 'dreview_sms',
        enabled: !!this.currentUser.dreview_sms,
      },
      {
        label: 'Custom 1 Sms',
        type: 'custom1_sms',
        enabled: !!this.currentUser.custom1_sms,
      },
      {
        label: 'Missed Call Sms',
        type: 'missedcall_sms',
        enabled: !!this.currentUser.missedcall_sms,
      },
      {
        label: 'Late Sms',
        type: 'late_sms',
        enabled: !!this.currentUser.late_sms,
      },
      {
        label: 'Arrived Sms',
        type: 'arrived_sms',
        enabled: !!this.currentUser.arrived_sms,
      },
      {
        label: 'Review Sms',
        type: 'review_sms',
        enabled: !!this.currentUser.review_sms,
      },
      {
        label: 'PreAuth Sms',
        type: 'preAuth_sms',
        enabled: !!this.currentUser.preAuth_sms,
      },
      {
        label: 'Custom 2 Sms',
        type: 'custom2_sms',
        enabled: !!this.currentUser.custom2_sms,
      },
    ];

    this.route.queryParams.subscribe((params) => {
      const tabName = params['tab'] || 'SMS Settings';
      this.currentTab =
        this.tabs.find((tab) => tab.name === tabName) || this.tabs[0];
    });

    this.toggles = [
      {
        label: 'Allow all messages via official whatsapp',
        enabled:
          this.currentUser.waba_check === 'all_route_waba' ||
          this.currentUser.waba_check === 'all_waba',
      },
      {
        label: 'Allow only waba hooks via official whatsapp',
        enabled: this.currentUser.waba_check === 'all_route_waba',
      },
    ];
  }
  onBookingToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    // console.log('Toggle clicked. Checked =', input.value);
    // console.log(
    //   'Current booking_confirmation_time =',
    //   this.currentUser.booking_confirmation_time
    // );

    if (input.checked) {
      this.bookingCancelAllow = true;
      this.showBookingModal = true;
    } else {
      const obj = {
        _id: this.currentUser._id,
        booking_confirmation_time: '0',
      };
      this.AS.updateUser(obj).subscribe(
        (res) => {
          this.bookingCancelAllow = false;
          this.showBookingModal = false;
        },
        (err) => {
          this.bookingCancelAllow = true;
          console.error(err);
        }
      );
    }
  }

  isActive: boolean = false;

  firstToggleSwitch(index: number, event: Event): void {
    event.preventDefault();

    // If clicking the second toggle and the first is disabled, do nothing
    // if (index === 1 && !this.toggles[0].enabled) {
    //   return; // Block interaction
    // }

    // Toggle the current switch
    this.toggles[index].enabled = !this.toggles[index].enabled;

    // If first toggle is turned off, disable the second toggle
    if (index === 0 && this.toggles[0].enabled) {
      this.toggles[1].enabled = false;
    }

    // console.log(`Toggle ${index + 1} Status:`, this.toggles[index].enabled);

    let waba_check = '';

    if (this.toggles[0].enabled && this.toggles[1].enabled) {
      waba_check = 'all_route_waba';
    } else if (this.toggles[0].enabled) {
      waba_check = 'all_waba';
    } else {
      waba_check = 'no_waba';
    }

    const obj = {
      _id: this.currentUser._id,
      waba_check: waba_check,
    };

    // console.log(obj);

    this.AS.updateUser(obj).subscribe((res) => {
      this.currentUser.waba_check = waba_check;
      localStorage.setItem('user_details', JSON.stringify(this.currentUser));
    });
  }

  toggleColor(index: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    // Update the togglesData
    this.togglesData[index].enabled = isChecked;

    // Create the update object
    const updateObj = {
      _id: this.currentUser._id,
      [this.togglesData[index].type]: isChecked,
    };

    this.isLoad = true;

    // Send update request
    this.AS.updateUser(updateObj).subscribe((res) => {
      // console.log('Update Response:', res);
      this.isLoad = false;
    });
  }

  changeSettings(e, type) {
    this.isLoad = true;
    let obj = {
      _id: this.currentUser._id,
    };
    obj[type] = e.target.checked;
    // console.log(obj);

    this.AS.updateUser(obj).subscribe((res) => {
      // console.log(res);
      // console.log(this.togglesData);
      this.isLoad = false;
    });
  }

  tabs = [
    {
      name: 'SMS Settings',
      icon: '../../../assets/icons/sms.png',
    },
    // {
    //   name: 'Profile',
    //   icon: '../../../assets/icons/profile.png',
    // },
    {
      name: 'Notification',
      icon: '../../../assets/icons/notification.png',
    },
    {
      name: 'Help & Support',
      icon: '../../../assets/icons/help.png',
    },
    // {
    //   name: 'Role Management',
    //   icon: '../../../assets/icons/help.png',
    // },
  ];
  currentTab: any = this.tabs[1];
  setCurrentTab = (item) => (this.currentTab = item);

  bookingConfirmation() {
    const currentUser = JSON.parse(localStorage.getItem('user_details'));
    this.booking_confirmation = !this.booking_confirmation; // toggle immediately
    // console.log('New value:', this.booking_confirmation);

    const updatedUser = {
      _id: currentUser._id,
      booking_confirmation: this.booking_confirmation,
    };

    this.AS.updateUser(updatedUser).subscribe({
      error: (err) => {
        // revert if API fails
        this.booking_confirmation = !this.booking_confirmation;
        console.error('Failed to update booking confirmation:', err);
      },
    });
  }

  trackDriverMsg() {
    const currentUser = JSON.parse(localStorage.getItem('user_details'));
    this.track_driver_msg = !this.track_driver_msg;
    // console.log('New value:', this.track_driver_msg);

    const updatedUser = {
      _id: currentUser._id,
      track_driver_msg: this.track_driver_msg,
    };

    this.AS.updateUser(updatedUser).subscribe({
      error: (err) => {
        this.track_driver_msg = !this.track_driver_msg;
        console.error('Failed to update track driver message:', err);
      },
    });
  }

  arrivedDriverMsg() {
    const currentUser = JSON.parse(localStorage.getItem('user_details'));
    this.arrived_driver_msg = !this.arrived_driver_msg;
    // console.log('New value:', this.arrived_driver_msg);

    const updatedUser = {
      _id: currentUser._id,
      arrived_driver_msg: this.arrived_driver_msg,
    };

    this.AS.updateUser(updatedUser).subscribe({
      error: (err) => {
        this.arrived_driver_msg = !this.arrived_driver_msg;
        console.error('Failed to update arrived driver message:', err);
      },
    });
  }
  showBookingModal = false;
  bookingCancelTime: string = '';
  bookingCancelAllow = false;
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;

    // Allow: 0-9 (char codes 48 to 57)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  cancelBookingCancelTime() {
    this.bookingCancelTime = '';
    this.showBookingModal = !this.showBookingModal;
  }

  updateBookingCancelTime() {
    const obj = {
      _id: this.currentUser._id,
      booking_confirmation_time: this.bookingCancelTime,
    };
    this.AS.updateUser(obj).subscribe(
      (res) => {
        // console.log(res);
        if (
          res.booking_confirmation_time !== '' &&
          res.booking_confirmation_time !== '0'
        ) {
          this.bookingCancelAllow = true;
        } else {
          this.bookingCancelAllow = false;
        }

        this.showBookingModal = false;
        // console.log(this.bookingCancelAllow);
      },
      (err) => {
        this.showBookingModal = false;
      }
    );
  }

  showAddUserModal = false;
}
