import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService, BotService, BookingsService } from 'src/services';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
// import { Label, Color } from 'ng2-charts';
import { FormBuilder, FormGroup } from '@angular/forms';
import jasmine from 'jasmine';
const PRODUCT_ID = '3055fd3a-661b-467e-8a25-16cd0c76b1fb';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  waToday = 0;
  wa15Min = 0;
  wa30Min = 0;
  wa60Min = 0;
  wa6Hr = 0;
  wa12Hr = 0;
  wa24Hr = 0;
  smsToday = 0;
  sms15Min = 0;
  sms30Min = 0;
  sms60Min = 0;
  sms6Hr = 0;
  sms12Hr = 0;
  sms24Hr = 0;
  totalBooking = 0;
  cancelledBooking = 0;
  trackDriverTotalMsg = 0;
  trackDriverYesMsg = 0;
  arrivedDriverTotalMsg = 0;
  arrivedDriverYesMsg = 0;
  isReload = false;
  isPageLoad = true;
  showFilter = false;
  isLoad = true;
  isMsgLoad = false;
  isGraphLoad = false;
  isLogout = false;
  isEdit = false;
  selected = '';
  currentUser: any;
  currentEditDevice: any;
  currentEditIndex = -1;
  deviceList = [];
  messageList: any[] = [];
  userList = [];
  userIndex = 0;
  errMessage = '';
  deviceName = '';
  deviceNumber = '';
  currentDevice: any;
  currentIndex = 0;
  currentPageLimit = 0;
  wait = 0;
  qrSrc: any = '';
  authStatus = '';
  connection = '';
  deviceActive = false;
  deviceConnected = false;
  qrShow = false;
  page = 1;
  target_type = '';
  target = '';
  filterForm: FormGroup;
  // targetList = []
  // targetTypeList = []
  // statusList = []
  // sentViaList = []
  status = '';
  sent_by = '';
  f_date = '';
  t_date = '';
  fDate = '';
  tDate = '';
  totalMsg = 0;
  totalSms = 0;
  totalWhatsapp = 0;
  totalFailed = 0;
  notSent = 0;
  showFilters = false;
  haveWabaDevice = false;
  wabaDeviceDetails: any;

  deviceConnections = {};
  isBannerVisible: boolean = true;

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // barChartLabels: Label[] = [];

  barChartData: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'SMS' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'WhatsApp' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Not Sent' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private _serviceModal: NgbModal,
    private AS: AdminService,
    private BS: BotService,
    private BKS: BookingsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let user_id = this.activatedRoute.params['value'].id;
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));

    if (!this.currentUser) {
      this.router.navigateByUrl('login');
    }

    this.AS.getUser(this.currentUser._id).subscribe((usr) => {
      this.currentUser = usr;

      this.BKS.getCompanyBots(this.currentUser._id).subscribe((admin) => {
        this.wabaDeviceDetails = admin.data[0];
        if (admin.data[0].wa_phone_id.length) {
          this.haveWabaDevice = true;
          this.deviceList.push({
            device_id: admin.data[0].wa_phone_id,
            device_name: 'Official WhatsApp Account',
          });
        }
      });

      this.deviceList = usr.wa_api.filter(
        (d) =>
          d.status &&
          (d.wa_api_platform == 'chatapi' ||
            d.wa_api_platform == 'maytapi' ||
            d.wa_api_platform == 'greenapi')
      );

      this.deviceConnections = {};

      if (this.deviceList.length) {
        this.deviceList.forEach((device, index) => {
          if (device.wa_api_platform == 'greenapi') {
            this.getGreenApiStatus(device, index);
          }
        });

        setTimeout(() => {
          this.refreshingGreenApi();
        }, 10000);

        const lastIndex = localStorage.getItem('lastDeviceIndex');
        const idx = lastIndex ? +lastIndex : 0;
        this.setCurrent(this.deviceList[idx].device_id, idx);
      } else {
        this.isLoad = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.currentGraphSubscription) {
      this.currentGraphSubscription.unsubscribe();
    }
  }
  currentDeviceIndex: number = 0;
  currentDeviceId: string = '';
  currentGraphSubscription: any;
  setCurrent = (id: number, index: number) => {
    this.currentDevice = this.deviceList[index];
    this.currentDeviceIndex = index;
    this.currentDeviceId = this.currentDevice.device_id;
    localStorage.setItem('lastDeviceIndex', index.toString());

    this.totalSms = this.totalWhatsapp = this.totalMsg = this.notSent = 0;

    if (this.currentGraphSubscription) {
      this.currentGraphSubscription.unsubscribe();
    }

    this.currentGraphSubscription = this.creatGraph(
      this.deviceList[index],
      index
    );
  };

  toggleBanner() {
    this.isBannerVisible = !this.isBannerVisible;
  }

  openDevice(device, index) {
    if (device.wa_api_platform == 'chatapi') {
      this.creatGraph(device, index);
      this.clean();
      this.isLoad = true;
      this.messageList = [];
      this.isMsgLoad = true;
      this.deviceActive = false;
      this.qrShow = false;
      this.currentDevice = device;
      this.currentIndex = index;
      this.authStatus = '';
      this.connection = '';
      this.currentPageLimit = 0;
      this.getDeviceStatus(device, index);
      let obj = {
        device_id: device.device_id,
        company_id: this.currentUser._id,
        skip: this.currentPageLimit,
      };
      this.AS.getMessageList(obj).subscribe({
        next: (ml: any) => {
          console.log('msg list response', ml);
          this.messageList = ml?.data ?? [];
          this.isMsgLoad = false;
        },
        error: (err) => {
          console.error(err);
          this.messageList = [];
          this.isMsgLoad = false;
        },
      });
    } else if (device.wa_api_platform == 'maytapi') {
      this.openMaytApi(device, index);
    } else if (device.wa_api_platform == 'greenapi') {
      this.openGreenApi(device, index);
    }
  }

  refreshingDevice() {
    if (this.authStatus != 'Authenticated') {
      this.deviceActive = false;
      this.qrShow = false;
      let obj = this.currentDevice;
      obj['user_id'] = this.currentUser._id;
      this.AS.getDeviceStatus(obj).subscribe(
        (res) => {
          this.isLoad = false;
          if (res['accountStatus'] == 'authenticated') {
            if (res['statusData'].substatus == 'phone') {
              this.authStatus = 'Authenticated';
              this.connection = 'Inactive';
            } else {
              this.authStatus = 'Authenticated';
              this.connection = 'Active';
            }
          } else if (res['accountStatus'] == 'got qr code') {
            this.authStatus = 'Scan QR code';
            this.connection = 'Inactive';
            this.qrShow = true;
            this.qrSrc = res['qrCode'];
          }
        },
        (err) => {
          this.errMessage =
            'Unfortunately a network issue has been occurred, please reboot the session';
          this.isLoad = false;
        }
      );
    }
  }

  openMaytApi(device, index) {
    this.creatGraph(device, index);
    this.clean();
    this.isLoad = true;
    this.isMsgLoad = true;
    this.deviceActive = false;
    this.qrShow = false;
    this.currentDevice = device;
    this.currentIndex = index;
    this.authStatus = '';
    this.connection = '';
    this.currentPageLimit = 0;
    this.getMaytApiStatus(device, index);
    let obj = {
      device_id: device.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit,
    };
    this.AS.getMessageList(obj).subscribe((ml) => {
      this.messageList = ml;
      this.isMsgLoad = false;
    });
  }

  refreshingMaytApi() {
    if (this.authStatus != 'Authenticated') {
      this.deviceActive = false;
      this.qrShow = false;
      let obj = this.currentDevice;
      obj['user_id'] = this.currentUser._id;
      this.AS.getMaytApiStatus(obj).subscribe(
        (res) => {
          this.isLoad = false;
          if (res.success && res.status.state) {
            if (res.status.state.state == 'CONNECTED') {
              this.authStatus = 'Authenticated';
              this.connection = 'Active';
            } else if (res.status.state.state == 'TIMEOUT') {
              this.authStatus = 'Authenticated';
              this.connection = 'Inactive';
            } else if (res.status.state.state == 'UNPAIR') {
              let url = `https://api.maytapi.com/api/${PRODUCT_ID}/${this.currentDevice.device_id}/qrCode`;
              this.AS.getQrCode(url).subscribe((qrRes) => {
                this.createImageFromBlob(qrRes);
              });
            }
          } else {
            if (res.status.isQr) {
              let url = `https://api.maytapi.com/api/${PRODUCT_ID}/${this.currentDevice.device_id}/qrCode`;
              this.AS.getQrCode(url).subscribe((qrRes) => {
                this.createImageFromBlob(qrRes);
              });
            } else {
              setTimeout(() => {
                this.refreshingMaytApi();
              }, 10000);
            }
          }
        },
        (err) => {
          this.errMessage =
            'Unfortunately a network issue has been occurred, please reboot the session';
          this.isLoad = false;
        }
      );
    }
  }

  openGreenApi(device, index) {
    // console.log('green', device);
    this.creatGraph(device, index);
    this.clean();
    this.isLoad = true;
    this.isMsgLoad = true;
    this.deviceActive = false;
    this.qrShow = false;
    this.currentDevice = device;
    this.currentIndex = index;
    this.authStatus = '';
    this.connection = '';
    this.currentPageLimit = 0;
    this.getGreenApiStatus(device, index);
    let obj = {
      device_id: device.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit,
    };
    this.AS.getMessageList(obj).subscribe((ml) => {
      this.messageList = ml;
      // console.log('list', ml);
      this.isMsgLoad = false;
      // this.targetList = [...new Set(this.messageList.map(item => item.to_number))];
      // this.targetTypeList = [...new Set(this.messageList.map(item => item.target_type))];
      // this.statusList = [...new Set(this.messageList.map(item => item.status))];
      // this.statusList = [...new Set(this.messageList.map(item => item.status))];
      // this.sentViaList = [...new Set(this.messageList.map(item => item.sent_by))];
    });
  }

  creatGraph(device, index) {
    // console.log('dev', device, 'ind', index);
    this.waToday =
      this.wa15Min =
      this.wa30Min =
      this.wa60Min =
      this.wa6Hr =
      this.wa12Hr =
      this.wa24Hr =
        0;
    this.smsToday =
      this.sms15Min =
      this.sms30Min =
      this.sms60Min =
      this.sms6Hr =
      this.sms12Hr =
      this.sms24Hr =
        0;
    this.totalBooking = this.cancelledBooking = 0;
    this.trackDriverTotalMsg = this.trackDriverYesMsg = 0;
    this.arrivedDriverTotalMsg = this.arrivedDriverYesMsg = 0;
    this.isGraphLoad = false;
    this.barChartData = [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'SMS' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'WhatsApp' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Not Sent' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' },
    ];
    this.totalMsg = this.totalSms = this.totalWhatsapp = this.notSent = 0;

    // date strings
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);

    const tz = endDate.getTimezoneOffset() / 60;
    startDate.setDate(startDate.getDate() - 1);
    const fh = 24 + tz;
    let m = (startDate.getMonth() + 1).toString().padStart(2, '0');
    let d = startDate.getDate().toString().padStart(2, '0');
    const startDateStr = `${startDate.getFullYear()}-${m}-${d}T${fh}:00:00.000Z`;

    const th = 23 + tz;
    let em = (endDate.getMonth() + 1).toString().padStart(2, '0');
    let dm = (endDate.getDate() + 1).toString().padStart(2, '0');
    const endDateStr = `${endDate.getFullYear()}-${em}-${dm}T${th}:59:59.999Z`;

    let obj = {
      device_id: device.device_id,
      company_id: this.currentUser._id,
      startDate: startDateStr,
      endDate: endDateStr,
    };

    this.AS.getMessageGraphValue(obj).subscribe((ml) => {
      // console.log(ml.length);
      if (this.currentDeviceId !== device.device_id) return;

      let tday = ml[ml.length - 1].day;
      let today = ml[ml.length - 1].day;
      let x = 0;
      while (x < 7) {
        today++;
        if (today > 6) {
          today = 0;
        }
        // this.barChartLabels[x] = this.days[today];
        x++;
      }
      ml.map((gv, j) => {
        this.totalMsg++;
        if (gv.sent_by == 0) {
          this.totalSms++;
        }
        if (gv.sent_by == 1) {
          this.totalWhatsapp++;
        }
        if (gv.sent_by == 2) {
          this.notSent++;
        }
        let td = new Date();
        let d = new Date(gv.createdAt);
        let t = td.getTime() - d.getTime();
        t = t / (1000 * 60);
        let i = parseInt(gv.day);
        let dayIndex = parseInt(gv.day);
        let ind = this.days.findIndex((day) => day === this.days[dayIndex]);
        if (gv.sent_by == 0) {
          let v = this.barChartData[0]['data'][ind];
          this.barChartData[0]['data'][ind] = parseInt(v.toString()) + 1;
          if (tday == gv.day) {
            this.smsToday++;
          }
          if (t <= 15) {
            this.sms15Min++;
          }
          if (t <= 30) {
            this.sms30Min++;
          }
          if (t <= 60) {
            this.sms60Min++;
          }
          if (t <= 360) {
            this.sms6Hr++;
          }
          if (t <= 720) {
            this.sms12Hr++;
          }
          if (t <= 1440) {
            this.sms24Hr++;
          }
        } else if (gv.sent_by == 1) {
          let v = this.barChartData[1]['data'][ind];
          this.barChartData[1]['data'][ind] = parseInt(v.toString()) + 1;
          if (tday == gv.day) {
            this.waToday++;
          }
          if (t <= 15) {
            this.wa15Min++;
          }
          if (t <= 30) {
            this.wa30Min++;
          }
          if (t <= 60) {
            this.wa60Min++;
          }
          if (t <= 360) {
            this.wa6Hr++;
          }
          if (t <= 720) {
            this.wa12Hr++;
          }
          if (t <= 1440) {
            this.wa24Hr++;
          }
        } else {
          let v = this.barChartData[2]['data'][ind];
          this.barChartData[2]['data'][ind] = parseInt(v.toString()) + 1;
        }
        let v = this.barChartData[3]['data'][ind];
        this.barChartData[3]['data'][ind] = parseInt(v.toString()) + 1;

        if (gv.msg_type == 'booking') {
          this.totalBooking++;
          if (gv.is_booking_cancel) {
            this.cancelledBooking++;
          }
        }
        if (gv.driver_id && gv.msg_type == 'track') {
          this.trackDriverTotalMsg++;
          if (gv.is_driver_msg) {
            this.trackDriverYesMsg++;
          }
        }
        if (gv.driver_id && gv.msg_type == 'arrived') {
          this.arrivedDriverTotalMsg++;
          if (gv.is_driver_msg) {
            this.arrivedDriverYesMsg++;
          }
        }

        if (j == ml.length - 1) {
          this.isGraphLoad = true;
        }
      });
    });
    // console.log(this.barChartData);
  }

  public getDeviceStatus(device, index) {
    let obj = device;
    this.errMessage = '';
    obj['user_id'] = this.currentUser._id;
    this.AS.getDeviceStatus(obj).subscribe(
      (res) => {
        this.isLoad = false;
        if (res['accountStatus'] == 'authenticated') {
          if (res['statusData'].substatus == 'phone') {
            this.authStatus = 'Authenticated';
            this.connection = 'Inactive';
          } else {
            this.authStatus = 'Authenticated';
            this.connection = 'Active';
          }
        } else if (res['accountStatus'] == 'got qr code') {
          this.authStatus = 'Scan QR code';
          this.connection = 'Inactive';
          this.qrShow = true;
          this.qrSrc = res['qrCode'];
          // setTimeout(() => { this.openDevice(device, index) }, 10000)
        }
      },
      (err) => {
        this.errMessage =
          'Unfortunately a network issue has been occurred, please reboot the session';
        this.isLoad = false;
      }
    );
  }

  getMaytApiStatus(device, index) {
    // console.log('qr', device);
    this.AS.getMaytApiStatus(device).subscribe((res) => {
      this.isLoad = false;
      if (res.success && res.status.state) {
        if (res.status.state.state == 'CONNECTED') {
          this.authStatus = 'Authenticated';
          this.connection = 'Active';
        } else if (res.status.state.state == 'TIMEOUT') {
          this.authStatus = 'Authenticated';
          this.connection = 'Inactive';
        } else if (res.status.state.state == 'UNPAIR') {
          this.authStatus = 'Scan QR code';
          this.connection = 'Inactive';
          let url = `https://api.maytapi.com/api/${PRODUCT_ID}/${device.device_id}/qrCode`;
          this.AS.getQrCode(url).subscribe((qrRes) => {
            this.createImageFromBlob(qrRes);
          });
        }
      } else {
        if (res.status.isQr) {
          let url = `https://api.maytapi.com/api/${PRODUCT_ID}/${device.device_id}/qrCode`;
          this.AS.getQrCode(url).subscribe((qrRes) => {
            // console.log(qrRes);
            this.createImageFromBlob(qrRes);
          });
        } else {
          setTimeout(() => {
            this.refreshingMaytApi();
          }, 10000);
        }
      }
    });
  }

  clean() {
    // this.refreshingGreenApi()
    this.target_type = '';
    this.target = '';
    this.status = '';
    this.sent_by = '';
    this.f_date = '';
    this.t_date = '';
    this.search();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.qrSrc = reader.result
          .toString()
          .replace('application/json', 'image/png');
        this.authStatus = 'Scan QR code';
        this.connection = 'Inactive';
        this.qrShow = true;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getGreenApiStatus(device, index) {
    this.AS.getGreenApiStatus(device).subscribe((res) => {
      this.isLoad = false;
      let deviceId = device.device_id;

      if (res.statusInstance == 'online') {
        this.authStatus = 'Authenticated';
        this.connection = 'Active';
        this.deviceConnections[deviceId] = 'Active';
      } else {
        let url = `https://api.green-api.com/waInstance${device.device_id}/qr/${device.token}`;
        this.AS.getGreenApiQrCode(url).subscribe((qrRes) => {
          // console.log('qr', qrRes);
          if (qrRes.type == 'qrCode') {
            this.qrSrc = `data:image/png;base64,${qrRes['message']}`;
            this.authStatus = 'Scan QR code';
            this.connection = 'Inactive';
            this.qrShow = true;
            this.deviceConnections[deviceId] = 'Inactive';
          } else if (qrRes.type == 'alreadyLogged') {
            this.authStatus = 'Authenticated';
            this.connection = 'Inactive';
            this.deviceConnections[deviceId] = 'Inactive';
            setTimeout(() => {
              this.refreshingGreenApi();
            }, 10000);
          }
        });
      }
    });
  }

  refreshingGreenApi() {
    if (this.authStatus != 'Authenticated') {
      this.deviceActive = false;
      this.qrShow = false;
      let obj = this.currentDevice;
      // console.log(obj);
      obj['user_id'] = this.currentUser._id;
      this.AS.getGreenApiStatus(obj).subscribe(
        (res) => {
          this.isLoad = false;
          if (res.statusInstance == 'online') {
            this.authStatus = 'Authenticated';
            this.connection = 'Active';
          } else {
            let url = `https://api.green-api.com/waInstance${obj.device_id}/qr/${obj.token}`;
            // console.log(url);
            this.AS.getGreenApiQrCode(url).subscribe((qrRes) => {
              if (qrRes.type == 'qrCode') {
                this.qrSrc = `data:image/png;base64,${qrRes['message']}`;
                this.authStatus = 'Scan QR code';
                this.connection = 'Inactive';
                this.qrShow = true;
              } else if (qrRes.type == 'alreadyLogged') {
                this.authStatus = 'Authenticated';
                this.connection = 'Inactive';
                // setTimeout(() => {
                //   this.refreshingGreenApi();
                // }, 10000);
              }
            });
          }
        },
        (err) => {
          this.errMessage =
            'Unfortunately a network issue has been occurred, please reboot the session';
          this.isLoad = false;
        }
      );
    }
    // setTimeout(() => { this.refreshingDevice() }, 12000)
  }

  logoutMaytApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id;
    this.AS.logoutMaytApi(obj).subscribe((result) => {
      this.openDevice(device, index);
    });
  }

  logoutGreenApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id;
    this.AS.logoutGreenApi(obj).subscribe((result) => {
      this.openDevice(device, index);
    });
  }

  filters() {
    this.showFilter = !this.showFilter;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_details');
    this.isLogout = true;
    this.router.navigateByUrl('/login');
  }

  search() {
    this.page = 0;
    this.isMsgLoad = true;
    this.currentPageLimit = 0;
    let obj = {
      device_id: this.currentDevice.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit,
    };

    let t = new Date();
    let fd = new Date(this.f_date);
    let tz = t.getTimezoneOffset() / 60;
    if (this.f_date != '' && this.t_date != '') {
      fd.setDate(fd.getDate() - 1);
      let fh = 24 + tz;
      let m = (fd.getMonth() + 1).toString();
      let d = fd.getDate().toString();
      if (parseInt(m) < 10) {
        m = '0' + m;
      }
      if (parseInt(d) < 10) {
        d = '0' + d;
      }
      this.fDate =
        fd.getFullYear() + '-' + m + '-' + d + 'T' + fh + ':00:00.000Z';

      let th = 23 + tz;
      this.tDate = this.t_date + 'T' + th + ':59:59.999Z';

      // let qry = { createdAt: { $gte: new Date("2021-09-30T19:00:00.000Z"), $lte: new Date("2021-10-03T18:59:59.999Z") } }
      obj['fDate'] = this.fDate;
      obj['tDate'] = this.tDate;
    }
    if (this.target != '') {
      obj['target'] = this.target;
    }
    if (this.target_type != '') {
      obj['target_type'] = this.target_type;
    }
    if (this.sent_by != '') {
      obj['sent_by'] = parseInt(this.sent_by);
    }
    if (this.status != '') {
      obj['status'] = this.status;
    }
    this.AS.getMessageList(obj).subscribe((ml) => {
      this.messageList = ml;
      // this.currentPageLimit += 50
      this.isMsgLoad = false;
    });
    this.showFilters = false;
  }

  nextPage() {
    this.isMsgLoad = true;
    ++this.page;
    let obj = {
      device_id: this.currentDevice.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit + 50,
    };
    if (this.fDate != '' && this.tDate != '') {
      obj['fDate'] = this.fDate;
      obj['tDate'] = this.tDate;
    }
    if (this.target != '') {
      obj['target'] = this.target;
    }
    if (this.target_type != '') {
      obj['target_type'] = this.target_type;
    }
    if (this.sent_by != '') {
      obj['sent_by'] = parseInt(this.sent_by);
    }
    if (this.status != '') {
      obj['status'] = this.status;
    }
    console.log(obj);

    this.AS.getMessageList(obj).subscribe((ml) => {
      this.messageList = ml;
      this.currentPageLimit += 50;
      this.isMsgLoad = false;
    });
  }

  previousPage() {
    this.isMsgLoad = true;
    --this.page;
    let obj = {
      device_id: this.currentDevice.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit - 50,
    };
    if (this.fDate != '' && this.tDate != '') {
      obj['fDate'] = this.fDate;
      obj['tDate'] = this.tDate;
    }
    if (this.target != '') {
      obj['target'] = this.target;
    }
    if (this.target_type != '') {
      obj['target_type'] = this.target_type;
    }
    if (this.sent_by != '') {
      obj['sent_by'] = parseInt(this.sent_by);
    }
    if (this.status != '') {
      obj['status'] = this.status;
    }
    this.AS.getMessageList(obj).subscribe((ml) => {
      this.messageList = ml;
      this.currentPageLimit -= 50;
      this.isMsgLoad = false;
    });
  }

  movetoPage(p) {
    this.page = p;
  }

  back() {
    this.router.navigateByUrl('/bot/messages');
  }

  rebootGreenApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id;
    this.AS.rebootGreenApi(obj).subscribe(
      (result) => {
        alert('Reboot successfully..');
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  rebootMaytApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id;
    this.AS.rebootMaytapi(obj).subscribe(
      (result) => {
        alert('Reboot successfully..');
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  logoutDevice(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id;
    this.AS.logoutDevice(obj).subscribe((result) => {
      this.openDevice(device, index);
    });
  }

  rebootDevice(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id;
    this.AS.rebootDevice(obj).subscribe(
      (result) => {
        alert('Reboot successfully..');
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  reloadWindow() {
    window.location.reload();
  }

  formatText(text: string) {
    return text.replace(/sms/gi, 'SMS');
  }
}
