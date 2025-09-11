import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AdminService, BookingsService } from 'src/services';
import { AuthService } from 'src/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartDataset } from 'chart.js';
import { forkJoin } from 'rxjs';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private AS: AdminService,
    private router: Router,
    private eRef: ElementRef,
    private BKS: BookingsService
  ) { }

  currentUser: any;
  deviceList = [];
  showFilters = false;
  currentDevice: any;
  isLoad = true;
  isMsgLoad = true;
  deviceActive = false;
  page = 1;
  currentPageLimit = 0;
  f_date = '';
  t_date = '';
  fDate = '';
  tDate = '';
  target = '';
  target_type = '';
  status = '';
  sent_by = '';
  messageList: any;
  totalMsg = 0;
  totalSms = 0;
  totalWhatsapp = 0;
  notSent = 0;
  pieData: any;
  barChartData: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'SMS' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'WhatsApp' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Not Sent' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' },
  ];
  days = [0, 1, 2, 3, 4, 5, 6];
  showOptions: boolean[] = [false, false]; // Track multiple banners
  lastMsgDate: any;
  firstMsgDate: any;
  percentChange: any;
  thisDay = 1880;
  yesterday = 3412;
  isBannerVisible = true;
  wabaDeviceDetails: any;

  isTodayActive = true;
  isAllTimeActive = false;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    // console.log(this.currentUser);

    if (!this.currentUser) {
      this.router.navigateByUrl('login');
      return;
    }

    this.deviceList = [];

    this.AS.getUser(this.currentUser._id).subscribe((usr) => {
      this.currentUser = usr;
      this.deviceList = usr.wa_api.filter(
        (d) =>
          d.status &&
          (d.wa_api_platform == 'chatapi' ||
            d.wa_api_platform == 'maytapi' ||
            d.wa_api_platform == 'greenapi')
      );

      // console.log('home', this.deviceList);

      // Fetch messages for all devices

      this.setMessage();
    });
  }

  // setMessage() {
  //   this.messageList = [];

  //   this.BKS.getCompanyBots(this.currentUser._id).subscribe((admin) => {
  //     console.log('admin', admin.data[0]);
  //     this.wabaDeviceDetails = admin.data[0];
  //     if (admin.data[0].wa_phone_id.length) {
  //       this.deviceList.push({
  //         device_id: admin.data[0].wa_phone_id,
  //         active: true,
  //       });
  //     }

  //     let requests = this.deviceList.map((device) => {
  //       let objMsg = {
  //         device_id: device.device_id,
  //         company_id: this.currentUser._id,
  //         skip: this.currentPageLimit,
  //       };
  //       this.AS.getMessageList(objMsg).subscribe((ml) => {
  //         this.messageList = this.messageList.concat(ml);

  //         this.isMsgLoad = false;

  //         let endDate = new Date();
  //         let startDate = new Date();

  //         // if (this.isTodayActive) {
  //         //   startDate.setDate(startDate.getDate() - 1);
  //         //   startDate.setHours(23, 59, 0, 0);
  //         //   // startDate.setDate(startDate.getDate() - 6);
  //         // }
  //         // if (this.isAllTimeActive) {
  //         startDate.setDate(startDate.getDate() - 6);
  //         // }

  //         let t = endDate;
  //         let fd = startDate;
  //         let tz = t.getTimezoneOffset() / 60;
  //         fd.setDate(fd.getDate() - 1);
  //         let fh = 24 + tz;
  //         let m = (fd.getMonth() + 1).toString();
  //         let d = fd.getDate().toString();
  //         if (parseInt(m) < 10) {
  //           m = '0' + m;
  //         }
  //         if (parseInt(d) < 10) {
  //           d = '0' + d;
  //         }
  //         let startDateStr =
  //           fd.getFullYear() + '-' + m + '-' + d + 'T' + fh + ':00:00.000Z';

  //         let th = 23 + tz;
  //         let em = (t.getMonth() + 1).toString();
  //         let dm = (t.getDate() + 1).toString();

  //         if (parseInt(em) < 10) {
  //           em = '0' + em;
  //         }
  //         if (parseInt(dm) < 10) {
  //           dm = '0' + dm;
  //         }

  //         let endDateStr =
  //           t.getFullYear() + '-' + em + '-' + dm + 'T' + th + ':59:59.999Z';

  //         let objVals = {
  //           device_id: device.device_id,
  //           company_id: this.currentUser._id,
  //           startDate: startDateStr,
  //           endDate: endDateStr,
  //         };
  //         this.totalMsg = 0;
  //         this.totalSms = 0;
  //         this.totalWhatsapp = 0;
  //         this.notSent = 0;
  //         this.barChartData = [
  //           { data: [0, 0, 0, 0, 0, 0, 0], label: 'SMS' },
  //           { data: [0, 0, 0, 0, 0, 0, 0], label: 'WhatsApp' },
  //           { data: [0, 0, 0, 0, 0, 0, 0], label: 'Not Sent' },
  //           { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' },
  //         ];
  //         this.percentChange = 0;
  //         this.thisDay = 0;
  //         this.yesterday = 0;

  //         this.AS.getMessageGraphValue(objVals).subscribe((ml) => {
  //           let tday = ml[ml.length - 1].day;
  //           let today = ml[ml.length - 1].day;

  //           const fDate = new Date(ml[ml.length - 1].createdAt);

  //           this.firstMsgDate = fDate.toLocaleDateString('en-GB', {
  //             day: '2-digit',
  //             month: 'short',
  //             year: 'numeric',
  //           });

  //           const lDate = new Date(ml[0].createdAt);

  //           this.lastMsgDate = lDate.toLocaleDateString('en-GB', {
  //             day: '2-digit',
  //             month: 'short',
  //             year: 'numeric',
  //           });

  //           let x = 0;
  //           while (x < 7) {
  //             today++;
  //             if (today > 6) {
  //               today = 0;
  //             }
  //             // this.barChartLabels[x] = this.days[today];
  //             x++;
  //           }
  //           console.log(ml);

  //           ml.map((gv, j) => {
  //             // console.log('gv', gv);
  //             // if (this.isAllTimeActive) {
  //             this.totalMsg++;
  //             if (gv.sent_by == 0) {
  //               this.totalSms++;
  //             }
  //             if (gv.sent_by == 1) {
  //               this.totalWhatsapp++;
  //             }
  //             if (gv.sent_by == 2) {
  //               this.notSent++;
  //             }
  //             // }
  //             // if (this.isTodayActive) {
  //             //   const isToday = (date) => {
  //             //     const today = new Date();
  //             //     const givenDate = new Date(date);
  //             //     return (
  //             //       today.getFullYear() === givenDate.getFullYear() &&
  //             //       today.getMonth() === givenDate.getMonth() &&
  //             //       today.getDate() === givenDate.getDate()
  //             //     );
  //             //   };
  //             //   // Example usage:
  //             //   if (isToday(gv.createdAt)) {
  //             //     this.totalMsg++;
  //             //     if (gv.sent_by == 0) {
  //             //       this.totalSms++;
  //             //     }
  //             //     if (gv.sent_by == 1) {
  //             //       this.totalWhatsapp++;
  //             //     }
  //             //     if (gv.sent_by == 2) {
  //             //       this.notSent++;
  //             //     }
  //             //   }
  //             // }

  //             // let td = new Date();
  //             // let d = new Date(gv.createdAt);
  //             // let t = td.getTime() - d.getTime();
  //             // t = t / (1000 * 60);
  //             // let i = parseInt(gv.day);
  //             // let dayIndex = parseInt(gv.day);
  //             // let ind = this.days.findIndex(
  //             //   (day) => day === this.days[dayIndex]
  //             // );

  //             // let arrOfDays = [0, 0, 0, 0, 0, 0, 0];
  //             let gvDay = parseInt(gv.day) - 1;
  //             let todayDayNum = new Date().getDay();
  //             let indGetter = () => {
  //               let jsDay = gvDay % 7; // Converts 7 (Sunday) → 0, 1–6 stays same
  //               return (jsDay - todayDayNum + 7) % 7;
  //             };
  //             let ind = indGetter();

  //             // console.log(ind); // Ensure it stays within 0-6

  //             if (gv.sent_by == 0) {
  //               let v = this.barChartData[0]['data'][ind];
  //               this.barChartData[0]['data'][ind] = parseInt(v.toString()) + 1;
  //             } else if (gv.sent_by == 1) {
  //               let v = this.barChartData[1]['data'][ind];
  //               this.barChartData[1]['data'][ind] = parseInt(v.toString()) + 1;
  //             } else {
  //               let v = this.barChartData[2]['data'][ind];
  //               this.barChartData[2]['data'][ind] = parseInt(v.toString()) + 1;
  //             }
  //             let v = this.barChartData[3]['data'][ind];
  //             this.barChartData[3]['data'][ind] = parseInt(v.toString()) + 1;
  //           });

  //           // this.barChartData[0]['data'] = [
  //           //   this.barChartData[0]['data'][3],
  //           //   this.barChartData[0]['data'][4],
  //           //   this.barChartData[0]['data'][5],
  //           //   this.barChartData[0]['data'][6],
  //           //   this.barChartData[0]['data'][0],
  //           //   this.barChartData[0]['data'][1],
  //           //   this.barChartData[0]['data'][2],
  //           // ];
  //           // this.barChartData[1]['data'] = [
  //           //   this.barChartData[1]['data'][3],
  //           //   this.barChartData[1]['data'][4],
  //           //   this.barChartData[1]['data'][5],
  //           //   this.barChartData[1]['data'][6],
  //           //   this.barChartData[1]['data'][0],
  //           //   this.barChartData[1]['data'][1],
  //           //   this.barChartData[1]['data'][2],
  //           // ];
  //           // this.barChartData[2]['data'] = [
  //           //   this.barChartData[2]['data'][3],
  //           //   this.barChartData[2]['data'][4],
  //           //   this.barChartData[2]['data'][5],
  //           //   this.barChartData[2]['data'][6],
  //           //   this.barChartData[2]['data'][0],
  //           //   this.barChartData[2]['data'][1],
  //           //   this.barChartData[2]['data'][2],
  //           // ];
  //           // this.barChartData[3]['data'] = [
  //           //   this.barChartData[3]['data'][3],
  //           //   this.barChartData[3]['data'][4],
  //           //   this.barChartData[3]['data'][5],
  //           //   this.barChartData[3]['data'][6],
  //           //   this.barChartData[3]['data'][0],
  //           //   this.barChartData[3]['data'][1],
  //           //   this.barChartData[3]['data'][2],
  //           // ];

  //           this.percentChange = Math.round(((1880 - 1500) / 1500) * 10);

  //           this.percentChange =
  //             this.percentChange >= 0
  //               ? `+${this.percentChange}`
  //               : `${this.percentChange}`;

  //           // this.percentChange = `${this.percentChange.includes()}`
  //           if (this.isTodayActive) {
  //             let num1: any = this.barChartData[1]['data'][6];
  //             this.totalWhatsapp = num1;

  //             let num2: any = this.barChartData[0]['data'][6];
  //             this.totalSms = num2;

  //             let num3: any = this.barChartData[3]['data'][6];
  //             this.totalMsg = num3;
  //           }

  //           if (this.isAllTimeActive) {
  //             let pk = 0;
  //             let num1: any = this.barChartData[1]['data'].reduce(
  //               (a, b: any) => a + b,
  //               0
  //             );
  //             this.totalWhatsapp = num1;

  //             let num2: any = this.barChartData[0]['data'].reduce(
  //               (a, b: any) => a + b,
  //               0
  //             );
  //             this.totalSms = num2;

  //             let num3: any = this.barChartData[3]['data'].reduce(
  //               (a, b: any) => a + b,
  //               0
  //             );
  //             this.totalMsg = num3;
  //           }

  //           let pieTotal = this.totalWhatsapp + this.totalSms;
  //           this.pieData = [
  //             (this.totalWhatsapp / pieTotal) * 100,
  //             (this.totalSms / pieTotal) * 100,
  //           ];
  //           console.log({
  //             total: this.totalMsg,
  //             whatsapp: this.totalWhatsapp,
  //             sms: this.totalSms,
  //           });

  //           // console.log('checking', this.barChartData);
  //         });
  //       });
  //     });
  //   });
  // }

  setMessage() {
    this.messageList = [];

    this.BKS.getCompanyBots(this.currentUser._id).subscribe({
      next: (admin) => {
        console.log('admin', admin?.data?.[0]);
        this.wabaDeviceDetails = admin?.data?.[0];

        if (admin?.data?.[0]?.wa_phone_id?.length) {
          this.deviceList.push({
            device_id: admin.data[0].wa_phone_id,
            active: true,
          });
        }

        this.continueMessageFlow(); // ← Extracted logic
      },
      error: (err) => {
        console.error('Error fetching company bots', err);
        // Still continue even on error
        // this.deviceList = []; // default or empty
        this.continueMessageFlow(); // ← Still run the rest
      },
    });
  }

  continueMessageFlow() {
    let requests = this.deviceList.map((device) => {
      let objMsg = {
        device_id: device.device_id,
        company_id: this.currentUser._id,
        skip: this.currentPageLimit,
      };
      this.AS.getMessageList(objMsg).subscribe((ml) => {
        this.messageList = this.messageList.concat(ml);
        this.isMsgLoad = false;

        let endDate = new Date();
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);

        let t = endDate;
        let fd = startDate;
        let tz = t.getTimezoneOffset() / 60;
        fd.setDate(fd.getDate() - 1);
        let fh = 24 + tz;
        let m = String(fd.getMonth() + 1).padStart(2, '0');
        let d = String(fd.getDate()).padStart(2, '0');

        let startDateStr = `${fd.getFullYear()}-${m}-${d}T${fh}:00:00.000Z`;

        let th = 23 + tz;
        let em = String(t.getMonth() + 1).padStart(2, '0');
        let dm = String(t.getDate() + 1).padStart(2, '0');
        let endDateStr = `${t.getFullYear()}-${em}-${dm}T${th}:59:59.999Z`;

        let objVals = {
          device_id: device.device_id,
          company_id: this.currentUser._id,
          startDate: startDateStr,
          endDate: endDateStr,
        };

        this.totalMsg = 0;
        this.totalSms = 0;
        this.totalWhatsapp = 0;
        this.notSent = 0;
        this.barChartData = [
          { data: [0, 0, 0, 0, 0, 0, 0], label: 'SMS' },
          { data: [0, 0, 0, 0, 0, 0, 0], label: 'WhatsApp' },
          { data: [0, 0, 0, 0, 0, 0, 0], label: 'Not Sent' },
          { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' },
        ];

        this.percentChange = 0;

        this.AS.getMessageGraphValue(objVals).subscribe((ml) => {
          let tday = ml[ml.length - 1].day;
          let today = ml[ml.length - 1].day;

          const fDate = new Date(ml[ml.length - 1].createdAt);

          this.firstMsgDate = fDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          const lDate = new Date(ml[0].createdAt);

          this.lastMsgDate = lDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          let x = 0;
          while (x < 7) {
            today++;
            if (today > 6) {
              today = 0;
            }
            // this.barChartLabels[x] = this.days[today];
            x++;
          }
          // console.log(ml);

          ml.map((gv, j) => {
            // console.log('gv', gv);
            // if (this.isAllTimeActive) {
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
            // }
            // if (this.isTodayActive) {
            //   const isToday = (date) => {
            //     const today = new Date();
            //     const givenDate = new Date(date);
            //     return (
            //       today.getFullYear() === givenDate.getFullYear() &&
            //       today.getMonth() === givenDate.getMonth() &&
            //       today.getDate() === givenDate.getDate()
            //     );
            //   };
            //   // Example usage:
            //   if (isToday(gv.createdAt)) {
            //     this.totalMsg++;
            //     if (gv.sent_by == 0) {
            //       this.totalSms++;
            //     }
            //     if (gv.sent_by == 1) {
            //       this.totalWhatsapp++;
            //     }
            //     if (gv.sent_by == 2) {
            //       this.notSent++;
            //     }
            //   }
            // }

            // let td = new Date();
            // let d = new Date(gv.createdAt);
            // let t = td.getTime() - d.getTime();
            // t = t / (1000 * 60);
            // let i = parseInt(gv.day);
            // let dayIndex = parseInt(gv.day);
            // let ind = this.days.findIndex(
            //   (day) => day === this.days[dayIndex]
            // );

            // let arrOfDays = [0, 0, 0, 0, 0, 0, 0];
            let gvDay = parseInt(gv.day) - 1;
            let todayDayNum = new Date().getDay();
            let indGetter = () => {
              let jsDay = gvDay % 7; // Converts 7 (Sunday) → 0, 1–6 stays same
              return (jsDay - todayDayNum + 7) % 7;
            };
            let ind = indGetter();

            // console.log(ind); // Ensure it stays within 0-6

            if (gv.sent_by == 0) {
              let v = this.barChartData[0]['data'][ind];
              this.barChartData[0]['data'][ind] = parseInt(v.toString()) + 1;
            } else if (gv.sent_by == 1) {
              let v = this.barChartData[1]['data'][ind];
              this.barChartData[1]['data'][ind] = parseInt(v.toString()) + 1;
            } else {
              let v = this.barChartData[2]['data'][ind];
              this.barChartData[2]['data'][ind] = parseInt(v.toString()) + 1;
            }
            let v = this.barChartData[3]['data'][ind];
            this.barChartData[3]['data'][ind] = parseInt(v.toString()) + 1;
          });

          // this.barChartData[0]['data'] = [
          //   this.barChartData[0]['data'][3],
          //   this.barChartData[0]['data'][4],
          //   this.barChartData[0]['data'][5],
          //   this.barChartData[0]['data'][6],
          //   this.barChartData[0]['data'][0],
          //   this.barChartData[0]['data'][1],
          //   this.barChartData[0]['data'][2],
          // ];
          // this.barChartData[1]['data'] = [
          //   this.barChartData[1]['data'][3],
          //   this.barChartData[1]['data'][4],
          //   this.barChartData[1]['data'][5],
          //   this.barChartData[1]['data'][6],
          //   this.barChartData[1]['data'][0],
          //   this.barChartData[1]['data'][1],
          //   this.barChartData[1]['data'][2],
          // ];
          // this.barChartData[2]['data'] = [
          //   this.barChartData[2]['data'][3],
          //   this.barChartData[2]['data'][4],
          //   this.barChartData[2]['data'][5],
          //   this.barChartData[2]['data'][6],
          //   this.barChartData[2]['data'][0],
          //   this.barChartData[2]['data'][1],
          //   this.barChartData[2]['data'][2],
          // ];
          // this.barChartData[3]['data'] = [
          //   this.barChartData[3]['data'][3],
          //   this.barChartData[3]['data'][4],
          //   this.barChartData[3]['data'][5],
          //   this.barChartData[3]['data'][6],
          //   this.barChartData[3]['data'][0],
          //   this.barChartData[3]['data'][1],
          //   this.barChartData[3]['data'][2],
          // ];

          this.percentChange = Math.round(((1880 - 1500) / 1500) * 10);

          this.percentChange =
            this.percentChange >= 0
              ? `+${this.percentChange}`
              : `${this.percentChange}`;

          // this.percentChange = `${this.percentChange.includes()}`
          if (this.isTodayActive) {
            let num1: any = this.barChartData[1]['data'][6];
            this.totalWhatsapp = num1;

            let num2: any = this.barChartData[0]['data'][6];
            this.totalSms = num2;

            let num3: any = this.barChartData[3]['data'][6];
            this.totalMsg = num3;
          }

          if (this.isAllTimeActive) {
            let pk = 0;
            let num1: any = this.barChartData[1]['data'].reduce(
              (a, b: any) => a + b,
              0
            );
            this.totalWhatsapp = num1;

            let num2: any = this.barChartData[0]['data'].reduce(
              (a, b: any) => a + b,
              0
            );
            this.totalSms = num2;

            let num3: any = this.barChartData[3]['data'].reduce(
              (a, b: any) => a + b,
              0
            );
            this.totalMsg = num3;
          }

          let pieTotal = this.totalWhatsapp + this.totalSms;
          this.pieData = [
            (this.totalWhatsapp / pieTotal) * 100,
            (this.totalSms / pieTotal) * 100,
          ];
          // console.log({
          //   total: this.totalMsg,
          //   whatsapp: this.totalWhatsapp,
          //   sms: this.totalSms,
          // });

          // console.log('checking', this.barChartData);
        });
      });
    });
  }

  // rotateZeros(arr) {
  //   let nonZeros = arr.filter((num) => num !== 0); // Extract non-zero elements
  //   let zerosCount = arr.length - nonZeros.length; // Count number of zeros
  //   return new Array(zerosCount).fill(0).concat(nonZeros); // Reconstruct array
  // }

  todayActive() {
    this.isTodayActive = true;
    this.isAllTimeActive = false;
    this.deviceList = [];

    this.AS.getUser(this.currentUser._id).subscribe((usr) => {
      this.currentUser = usr;
      this.deviceList = usr.wa_api.filter(
        (d) =>
          d.status &&
          (d.wa_api_platform == 'chatapi' ||
            d.wa_api_platform == 'maytapi' ||
            d.wa_api_platform == 'greenapi')
      );
    });
    this.setMessage();
  }

  allTimeActive() {
    this.isTodayActive = false;
    this.isAllTimeActive = true;
    this.deviceList = [];

    this.AS.getUser(this.currentUser._id).subscribe((usr) => {
      this.currentUser = usr;
      this.deviceList = usr.wa_api.filter(
        (d) =>
          d.status &&
          (d.wa_api_platform == 'chatapi' ||
            d.wa_api_platform == 'maytapi' ||
            d.wa_api_platform == 'greenapi')
      );
    });
    this.setMessage();
  }

  toggleBanner() {
    this.isBannerVisible = !this.isBannerVisible;
  }

  onlyNumber(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  toggleOptions(index: number, event: Event) {
    event.stopPropagation(); // Prevents immediate closing when clicking the button
    this.showOptions = this.showOptions.map((_, i) =>
      i === index ? !this.showOptions[i] : false
    );
  }

  @HostListener('document:click', ['$event'])
  closeOptions(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showOptions = [false, false]; // Close all options
    }
  }

  search() {
    this.page = 0;
    this.isMsgLoad = true;
    this.currentPageLimit = 0;

    this.messageList = []; // Reset message list once at the start

    const requests = this.deviceList.map((item) => {
      let obj = {
        device_id: item.device_id,
        company_id: this.currentUser._id,
        skip: 0,
      };

      let t = new Date();
      let fd = new Date(this.f_date);
      let tz = t.getTimezoneOffset() / 60;

      if (this.f_date && this.t_date) {
        fd.setDate(fd.getDate() - 1);
        let fh = 24 + tz;
        let m = (fd.getMonth() + 1).toString().padStart(2, '0');
        let d = fd.getDate().toString().padStart(2, '0');

        this.fDate = `${fd.getFullYear()}-${m}-${d}T${fh}:00:00.000Z`;

        let th = 23 + tz;
        this.tDate = `${this.t_date}T${th}:59:59.999Z`;

        obj['fDate'] = this.fDate;
        obj['tDate'] = this.tDate;
      }

      if (this.target) obj['target'] = this.target;
      if (this.target_type) obj['target_type'] = this.target_type;
      if (this.sent_by) obj['sent_by'] = parseInt(this.sent_by);
      if (this.status) obj['status'] = this.status;

      // console.log('obj', obj);

      return this.AS.getMessageList(obj);
    });

    // Wait for all API calls to complete and merge results
    forkJoin(requests).subscribe((results) => {
      this.messageList = results.flat(); // Flatten and merge all responses
      // console.log('Combined Messages:', this.messageList);
      this.isMsgLoad = false;
    });

    this.showFilters = false;
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

  formatText(text: string) {
    return text.replace(/sms/gi, 'SMS');
  }
}
