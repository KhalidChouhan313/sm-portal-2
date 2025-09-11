import { Component, NgModule, OnInit } from '@angular/core';
import { BotService, AdminService } from 'src/services';
import { Router } from '@angular/router';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { MessageSettingsComponent } from '../message-settings/message-settings.component'
// import { BookingConfirmationComponent } from '../booking-confirmation/booking-confirmation.component'
// import { DriverMessageComponent } from '../driver-message/driver-message.component'
// import { MissedcallSettingsComponent } from '../missedcall-settings/missedcall-settings.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  textValues: string[] = ['', '', '']; // Array to store text for multiple textareas
  activeIndex: number | null = null; // Track which textarea is active
  isExpanded: boolean = false;

  messageLimit: number | null = null;

  toggleEmojiTab(index: number) {
    this.isExpanded = !this.isExpanded;

    this.activeIndex = this.activeIndex === index ? null : index;
  }

  addEmoji(event: any) {
    if (this.activeIndex !== null) {
      this.currentMessageList[this.activeIndex] += event.emoji.native;
    }
  }

  tab = '';
  tabs = [
    { name: 'Booking' },
    { name: 'Tracking' },
    { name: 'Arrived' },
    { name: 'Paylink' },
    { name: 'PrePay' },
    { name: 'Review' },
    { name: 'Review 2' },
    { name: 'Driver' },
    { name: 'Pre Auth' },
    { name: 'Custom 1' },
    { name: 'Custom 2' },
    { name: 'ChatBot' },
    { name: 'Missed Calls' },
  ];

  selectTab = (t) => {
    this.tab = t;
  };

  instanceData = [
    {
      id: 1,
      name: 'Booking Message 1',
      value: '',
      isEditable: false,
      limit: 0,
    },
    {
      id: 2,
      name: 'Booking Message 2',
      value: '',
      isEditable: false,
      limit: 0,
    },
    {
      id: 3,
      name: 'Booking Message 3',
      value: '',
      isEditable: false,
      limit: 0,
    },
    {
      id: 4,
      name: 'Booking Message 1',
      value: '',
      isEditable: false,
      limit: 128,
    },
  ];

  onTextAreaChange(instance: any, newValue: string) {
    instance.value = newValue;
  }

  // private serviceModal: NgbModalRef;

  adminDetails: any;
  isLoad: boolean = true;
  isCallResponse: boolean = false;
  isEdit: boolean = true;
  currentList = 'booking';
  currentMessageList = [];
  currentMsg = '';
  currentIndex = 0;
  review_limit = 0;
  preAuth_limit = 0;
  custom1_limit = 0;
  custom2_limit = 0;
  isTrackDriverMsg = false;
  isArrivedDriverMsg = false;
  isBookingConfirmation = false;
  trackDriverMessage = '';
  arrivedDriverMessage = '';
  chatbot_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  booking_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  late_msg = ['message text', 'message text', 'message text', 'message text'];
  tracking_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  arrived_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  missedcall_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  noshow_msg = ['message text', 'message text', 'message text', 'message text'];
  paylink_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  prepay_msg = ['message text', 'message text', 'message text', 'message text'];
  review_msg = ['message text', 'message text', 'message text', 'message text'];
  review2_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  dreview_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  preauth_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  custom1_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];
  custom2_msg = [
    'message text',
    'message text',
    'message text',
    'message text',
  ];

  isMessageLimitEditable = false;

  constructor(
    private BS: BotService,
    private AS: AdminService,
    // private _serviceModal: NgbModal,
    private router: Router
  ) { }

  currentUser: any;
  ngOnInit() {
    this.isLoad = true;
    this.isEdit = true;
    this.currentList = 'booking';
    this.currentMsg = '';
    this.currentIndex = 0;

    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!this.currentUser) {
      this.router.navigateByUrl('login');
    }
    // console.log('here', this.currentUser);

    this.AS.getUser(this.currentUser._id).subscribe((admin) => {
      this.adminDetails = admin;
      // console.log('test', admin.messages);
      this.currentMessageList = admin.messages.booking;
      this.tab = 'booking';
      // console.log('msgs', this.currentMessageList);

      this.currentMsg = admin.messages.booking[0];
      if (admin.messages.booking.length) {
        this.booking_msg = admin.messages.booking;
      }
      if (admin.messages.late.length) {
        this.late_msg = admin.messages.late;
      }
      if (admin.messages.tracking.length) {
        this.tracking_msg = admin.messages.tracking;
      }
      if (admin.messages.arrived.length) {
        this.arrived_msg = admin.messages.arrived;
      }
      if (admin.messages.paylink.length) {
        this.paylink_msg = admin.messages.paylink;
      }
      if (admin.messages.prepay.length) {
        this.prepay_msg = admin.messages.prepay;
      }
      if (admin.messages.review.length) {
        this.review_msg = admin.messages.review;
      }
      if (admin.messages.review2.length) {
        this.review2_msg = admin.messages.review2;
      }
      if (admin.messages.preAuth.length) {
        this.preauth_msg = admin.messages.preAuth;
      }
      if (admin.messages.custom1.length) {
        this.custom1_msg = admin.messages.custom1;
      }
      if (admin.messages.custom2.length) {
        this.custom2_msg = admin.messages.custom2;
      }
      if (admin.messages.noshow.length) {
        this.noshow_msg = admin.messages.noshow;
      }
      if (admin.messages.missedcall.length) {
        this.missedcall_msg = admin.messages.missedcall;
      }
      if (admin.messages.chatbot.length) {
        this.chatbot_msg = admin.messages.chatbot;
      }
      // if (admin.track_driver_message) { this.trackDriverMessage = admin.track_driver_message; }
      // if (admin.arrived_driver_message) { this.arrivedDriverMessage = admin.arrived_driver_message; }
      if (admin.track_driver_msg) {
        this.isTrackDriverMsg = admin.track_driver_msg;
      }
      if (admin.arrived_driver_msg) {
        this.isArrivedDriverMsg = admin.arrived_driver_msg;
      }
      this.isBookingConfirmation = admin.booking_confirmation;
      this.review_limit = admin.review_limit;
      this.preAuth_limit = admin.preAuth_limit;
      this.custom1_limit = admin.custom1_limit;
      this.custom2_limit = admin.custom2_limit;
      if (admin.messages.dreview) {
        this.dreview_msg = admin.messages.dreview;
      }
      this.isCallResponse = this.adminDetails.call_response;
      this.isLoad = false;
      // console.log(this.chatbot_msg);
    });
    // console.log(this.currentMsg);
  }

  tempMessages: any;

  toggleEdit(instance, index) {
    // Toggle the isEditable property for the clicked item
    this.instanceData[index].isEditable = !this.instanceData[index].isEditable;

    if (!this.tempMessages) {
      this.tempMessages = {}; // Initialize tempMessages object if not already
    }

    if (this.instanceData[index].isEditable) {
      // Store original message before editing
      this.tempMessages[index] = this.currentMessageList[index];
    } else {
      // If canceled, reset to original message
      this.currentMessageList[index] = this.tempMessages[index];
      delete this.tempMessages[index]; // Remove temp data after resetting
    }

    // console.log(instance);
  }

  editMessageLimit() {
    let toEdit = '';
    this.tab === 'review'
      ? (toEdit = 'review_limit')
      : this.tab === 'preauth'
        ? (toEdit = 'preAuth_limit')
        : this.tab === 'custom1'
          ? (toEdit = 'custom1_limit')
          : (toEdit = 'custom2_limit');
    const obj = {
      _id: this.currentUser._id,
      [toEdit]: this.messageLimit,
    };
    this.AS.updateUser(obj).subscribe((res) => {
      let user = JSON.parse(localStorage.getItem('user_details') || '{}');
      user[toEdit] = this.messageLimit;
      localStorage.setItem('user_details', JSON.stringify(user));

      // ✅ Optionally update currentUser in memory too
      this.currentUser[toEdit] = this.messageLimit;
    });
    this.isMessageLimitEditable = false;
  }

  textChange() {
    this.isEdit = true;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  setMessage(index) {
    this.isEdit = true;
    this.currentIndex = index;
    // console.log(this.currentMsg);

    this.currentMsg = this.currentMessageList[index];

    if (this.currentList == 'chatbot') {
      this.chatbot_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'booking') {
      this.booking_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'late') {
      this.late_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'tracking') {
      this.tracking_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'arrived') {
      this.arrived_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'paylink') {
      this.paylink_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'prepay') {
      this.prepay_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'review') {
      this.review_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'missedcall') {
      this.missedcall_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'noshow') {
      this.noshow_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'dreview') {
      this.dreview_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'preauth') {
      this.preauth_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'custom1') {
      this.custom1_msg[this.currentIndex] = this.currentMsg;
    }
    if (this.currentList == 'custom2') {
      this.custom2_msg[this.currentIndex] = this.currentMsg;
    }

    let obj = {
      _id: this.adminDetails._id,
      review_limit: this.review_limit,
      preAuth_limit: this.preAuth_limit,
      custom1_limit: this.custom1_limit,
      custom2_limit: this.custom2_limit,
      messages: {
        chatbot: this.chatbot_msg,
        booking: this.booking_msg,
        late: this.late_msg,
        tracking: this.tracking_msg,
        arrived: this.arrived_msg,
        paylink: this.paylink_msg,
        prepay: this.prepay_msg,
        review: this.review_msg,
        review2: this.review2_msg,
        noshow: this.noshow_msg,
        missedcall: this.missedcall_msg,
        dreview: this.dreview_msg,
        preAuth: this.preauth_msg,
        custom1: this.custom1_msg,
        custom2: this.custom2_msg,
      },
    };
    // console.log(this.currentMsg);

    this.AS.updateUser(obj).subscribe((res) => {
      if (res) {
        this.isEdit = false;
        this.currentMsg = null;
        this.instanceData[index].isEditable =
          !this.instanceData[index].isEditable;
      }
    });
  }

  openMessageList(name) {
    this.toggleEdit(0, 0);
    this.toggleEdit(0, 1);
    this.toggleEdit(0, 2);
    this.toggleEdit(0, 3);
    this.instanceData[0].isEditable = false;
    this.instanceData[1].isEditable = false;
    this.instanceData[2].isEditable = false;
    this.instanceData[3].isEditable = false;

    this.isExpanded = !this.isExpanded;
    this.activeIndex = null;

    this.currentList = name;
    this.tab = name;
    if (this.currentList == 'chatbot') {
      this.currentMessageList = this.chatbot_msg;
    }
    if (this.currentList == 'booking') {
      this.currentMessageList = this.booking_msg;
    }
    if (this.currentList == 'late') {
      this.currentMessageList = this.late_msg;
    }
    if (this.currentList == 'tracking') {
      this.currentMessageList = this.tracking_msg;
    }
    if (this.currentList == 'arrived') {
      this.currentMessageList = this.arrived_msg;
    }
    if (this.currentList == 'paylink') {
      this.currentMessageList = this.paylink_msg;
    }
    if (this.currentList == 'prepay') {
      this.currentMessageList = this.prepay_msg;
    }
    if (this.currentList == 'review') {
      this.currentMessageList = this.review_msg;
    }
    if (this.currentList == 'review2') {
      this.currentMessageList = this.review2_msg;
    }
    if (this.currentList == 'missedcall') {
      this.currentMessageList = this.missedcall_msg;
    }
    if (this.currentList == 'noshow') {
      this.currentMessageList = this.noshow_msg;
    }
    if (this.currentList == 'dreview') {
      this.currentMessageList = this.dreview_msg;
    }
    if (this.currentList == 'preauth') {
      this.currentMessageList = this.preauth_msg;
    }
    if (this.currentList == 'custom1') {
      this.currentMessageList = this.custom1_msg;
    }
    if (this.currentList == 'custom2') {
      this.currentMessageList = this.custom2_msg;
    }
    // console.log(this.currentList, this.currentMessageList);
  }

  openMessage(name, index, msg) {
    this.isEdit = true;
    this.currentIndex = index;
    this.currentMsg = msg;
  }

  callResponseSetting() {
    this.isEdit = true;
    this.currentList = 'call_response';
    this.currentMsg = this.adminDetails.call_response_msg;
  }

  // trackDriverMsgSetting() {
  //   this.isEdit = true;
  //   this.currentList = 'track_driver_msg';
  //   this.currentMsg = this.trackDriverMessage;
  // }

  // arrivedDriverMsgSetting() {
  //   this.isEdit = true;
  //   this.currentList = 'arrived_driver_msg';
  //   this.currentMsg = this.arrivedDriverMessage;
  // }

  setCallRespose() {
    let obj = {
      _id: this.adminDetails._id,
      call_response: this.isCallResponse,
      call_response_msg: this.currentMsg,
    };

    this.AS.updateUser(obj).subscribe((res) => {
      this.ngOnInit();
    });
  }

  setTrackDriverMsg() {
    this.isLoad = true;
    let obj = {
      _id: this.adminDetails._id,
      track_driver_msg: this.isTrackDriverMsg,
    };

    this.AS.updateUser(obj).subscribe((res) => {
      this.isLoad = false;
    });
  }

  setArrivedDriverMsg() {
    this.isLoad = true;
    let obj = {
      _id: this.adminDetails._id,
      arrived_driver_msg: this.isArrivedDriverMsg,
      track_driver_msg: this.isArrivedDriverMsg,
    };
    // console.log(obj);

    this.AS.updateUser(obj).subscribe((res) => {
      this.isLoad = false;
    });
  }

  setBookingConfirmation() {
    this.isLoad = true;
    let obj = {
      _id: this.adminDetails._id,
      booking_confirmation: this.isBookingConfirmation,
    };

    this.AS.updateUser(obj).subscribe((res) => {
      this.isLoad = false;
    });
  }

  // setBookingConfirmationDetails() {
  //   this.serviceModal = this._serviceModal.open(BookingConfirmationComponent, { size: 'lg' });
  //   // console.log(this.adminDetails);

  //   this.serviceModal.componentInstance.user = this.adminDetails
  //   this.serviceModal.result.then((result) => {
  //     this.isLoad = true;

  //     let obj = {
  //       _id: this.adminDetails._id,
  //       booking_confirmation_time: result.time,
  //       booking_confirmation_phone: result.phone,
  //       booking_cancellation_msg1: result.msg1,
  //       booking_cancellation_msg2: result.msg2,
  //       booking_cancellation_msg3: result.msg3,
  //       booking_cancellation_msg4: result.msg4,
  //       booking_cancellation_msg5: result.msg5,
  //       booking_cancellation_msg6: result.msg6
  //     }

  //     this.AS.updateUser(obj).subscribe(res => {
  //       this.isLoad = false;
  //       this.ngOnInit();
  //     })
  //   }, (reason) => {

  //   })
  // }

  // setDriverMessages() {
  //   this.serviceModal = this._serviceModal.open(DriverMessageComponent, { size: 'lg' });
  //   // console.log(this.adminDetails);
  //   this.serviceModal.componentInstance.user = this.adminDetails
  //   this.serviceModal.result.then((result) => {
  //     this.isLoad = true;

  //     let obj = {
  //       _id: this.adminDetails._id,
  //       driver_message_msg1: result.msg1,
  //       driver_message_msg2: result.msg2,
  //       driver_message_msg3: result.msg3
  //     }

  //     this.AS.updateUser(obj).subscribe(res => {
  //       this.isLoad = false;
  //       this.ngOnInit();
  //     })
  //   }, (reason) => {

  //   })
  // }

  // openMissedCallSettings() {
  //   this.serviceModal = this._serviceModal.open(MissedcallSettingsComponent, { size: 'lg' });
  //   this.serviceModal.componentInstance.user = this.adminDetails
  //   this.serviceModal.result.then((result) => {
  //     this.isLoad = true;

  //     let obj = {
  //       _id: this.adminDetails._id,
  //       missedcall_url: result.missedcall_url,
  //       missedcall_phone: result.missedcall_phone
  //     }

  //     this.AS.updateUser(obj).subscribe(res => {
  //       this.isLoad = false;
  //       this.ngOnInit();
  //     })
  //   }, (reason) => {

  //   })
  // }

  // openSettings() {
  //   this.serviceModal = this._serviceModal.open(MessageSettingsComponent, { size: 'lg' });
  //   this.serviceModal.componentInstance.user = this.adminDetails
  //   this.serviceModal.result.then((result) => {
  //     this.AS.getUser(this.adminDetails._id).subscribe(admin => {
  //       this.adminDetails = admin;
  //       this.currentMsg = admin.messages.booking[0];
  //       this.booking_msg = admin.messages.booking;
  //       this.late_msg = admin.messages.late;
  //       this.chatbot_msg = admin.messages.chatbot;
  //       this.tracking_msg = admin.messages.tracking;
  //       this.arrived_msg = admin.messages.arrived;
  //       this.paylink_msg = admin.messages.paylink;
  //       this.prepay_msg = admin.messages.prepay;
  //       this.review_msg = admin.messages.review;
  //       this.preauth_msg = admin.messages.preAuth;
  //       this.custom1_msg = admin.messages.custom1;
  //       this.custom2_msg = admin.messages.custom2;
  //       this.noshow_msg = admin.messages.noshow;
  //       this.missedcall_msg = admin.messages.missedcall;
  //       this.review_limit = admin.review_limit;
  //       this.preAuth_limit = admin.preAuth_limit;
  //       this.custom1_limit = admin.custom1_limit;
  //       this.custom2_limit = admin.custom2_limit;
  //       if (admin.messages.dreview) { this.dreview_msg = admin.messages.dreview }
  //     })
  //   }, (reason) => {
  //     this.AS.getUser(this.adminDetails._id).subscribe(admin => {
  //       this.adminDetails = admin;
  //       this.currentMsg = admin.messages.booking[0];
  //       this.booking_msg = admin.messages.booking;
  //       this.late_msg = admin.messages.late;
  //       this.chatbot_msg = admin.messages.chatbot;
  //       this.tracking_msg = admin.messages.tracking;
  //       this.arrived_msg = admin.messages.arrived;
  //       this.paylink_msg = admin.messages.paylink;
  //       this.prepay_msg = admin.messages.prepay;
  //       this.review_msg = admin.messages.review;
  //       this.preauth_msg = admin.messages.preAuth;
  //       this.custom1_msg = admin.messages.custom1;
  //       this.custom2_msg = admin.messages.custom2;
  //       this.missedcall_msg = admin.messages.missedcall;
  //       this.noshow_msg = admin.messages.noshow;
  //       this.review_limit = admin.review_limit;
  //       this.preAuth_limit = admin.preAuth_limit;
  //       this.custom1_limit = admin.custom1_limit;
  //       this.custom2_limit = admin.custom2_limit;
  //       if (admin.messages.dreview) { this.dreview_msg = admin.messages.dreview }
  //     })
  //   })
  // }

  editMessage() {
    this.isEdit = false;
  }
}
