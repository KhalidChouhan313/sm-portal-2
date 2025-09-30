import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';

interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isInRange?: boolean;
}
@Component({
  selector: 'app-button-stats',
  templateUrl: './button-stats.component.html',
  styleUrls: ['./button-stats.component.css'],
})
export class ButtonStatsComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  days: Day[] = [];
  showCalendar: boolean = false;
  selectedStart: Date | null = null;
  selectedEnd: Date | null = null;
  private minDate: Date;
  private maxDate: Date;
  col1: any[] = [];
  col2: any[] = [];
  col3: any[] = [];
  loading: boolean = false;
  private bookingOrPaylink: any[] = [];
  private trackingOrReview: any[] = [];
  private arrived: any[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loading = true;
    const userData = localStorage.getItem('user_details');
    const user = userData ? JSON.parse(userData) : null;
    const companyId = user?._id;

    const messageTypes = [
      { title: 'Booking', icon: 'assets/icons/Frame.svg', type: 'booking' },
      {
        title: 'Paylink',
        icon: 'assets/icons/Group 73 (1).png',
        type: 'paylink',
      },
      { title: 'Tracking', icon: 'assets/icons/tracking.svg', type: 'track' },
      { title: 'Follow Up', icon: 'assets/icons/Vector.png', type: 'followup' },
      { title: 'Arrived', icon: 'assets/icons/Group 73.png', type: 'arrived' },
    ];

    messageTypes.forEach((mt) => {
      this.adminService
        .getButtonStats(companyId, mt.type)
        .subscribe((res: any) => {
          const apiData = res[0] || {};
          const pressedArr = apiData?.pressed || [];
          const sentArr = apiData?.sent || [];

          const totalPressed = pressedArr.reduce(
            (sum: number, p: any) => sum + (p.pressedCount || 0),
            0
          );

          const items = sentArr
            .filter((s: any) => s.sentCount > 0)
            .map((s: any) => {
              const pressed = pressedArr.find((p: any) => p._id === s._id);
              const pressedCount = pressed ? pressed.pressedCount : 0;

              const percent =
                totalPressed > 0
                  ? ((pressedCount / totalPressed) * 100).toFixed(2)
                  : '0';

              return {
                label: s._id,
                value: pressedCount,
                percent,
                type: 'normal',
                sentCount: s.sentCount,
              };
            });

          if (items.length === 0) return;

          const topSentCount = items[0].sentCount;

          const template = {
            title: mt.title,
            icon: mt.icon,
            active: true,
            totalClicks: totalPressed,
            topSentCount,
            items,
          };

          const title = mt.title.trim();
          if (title === 'Paylink' || title === 'Booking') {
            this.bookingOrPaylink.push(template);
          } else if (title === 'Follow Up' || title === 'Tracking') {
            this.trackingOrReview.push(template);
          } else if (title === 'Arrived') {
            this.arrived.push(template);
          }
          this.buildColumns();
          this.loading = false;
        });
    });
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    this.minDate = new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      now.getDate()
    );
    this.maxDate = now;
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  private buildColumns() {
    let col1Arr: any[] = [];
    let trackingArr = [...this.trackingOrReview];
    const booking = this.bookingOrPaylink.find(
      (t: any) => t.title === 'Booking'
    );

    if (booking) {
      col1Arr.push(booking);
    } else {
      const tracking = trackingArr.find((t: any) => t.title === 'Tracking');
      if (tracking) {
        col1Arr.push(tracking);
        trackingArr = trackingArr.filter((t: any) => t.title !== 'Tracking');
      } else {
        const followUp = trackingArr.find((t: any) => t.title === 'Follow Up');
        if (followUp) {
          col1Arr.push(followUp);
          trackingArr = trackingArr.filter((t: any) => t.title !== 'Follow Up');
        }
      }
    }

    const paylink = this.bookingOrPaylink.find(
      (t: any) => t.title === 'Paylink'
    );
    if (paylink) {
      col1Arr.push(paylink);
    } else {
      const followUp = trackingArr.find((t: any) => t.title === 'Follow Up');
      if (followUp) {
        col1Arr.push(followUp);
        trackingArr = trackingArr.filter((t: any) => t.title !== 'Follow Up');
      }
    }

    this.col1 = col1Arr;

    if (trackingArr.length > 0) {
      this.col2 = [...trackingArr];
      this.col3 = [...this.arrived];
    } else {
      this.col2 = [...this.arrived];
      this.col3 = [];
    }
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private loadFilteredStats(from: string, to: string) {
    this.loading = true;
    this.bookingOrPaylink = [];
    this.trackingOrReview = [];
    this.arrived = [];

    const userData = localStorage.getItem('user_details');
    const user = userData ? JSON.parse(userData) : null;
    const companyId = user?._id;

    const messageTypes = [
      { title: 'Booking', icon: 'assets/icons/Frame.svg', type: 'booking' },
      {
        title: 'Paylink',
        icon: 'assets/icons/Group 73 (1).png',
        type: 'paylink',
      },
      { title: 'Tracking', icon: 'assets/icons/tracking.svg', type: 'track' },
      { title: 'Follow Up', icon: 'assets/icons/Vector.png', type: 'followup' },
      { title: 'Arrived', icon: 'assets/icons/Group 73.png', type: 'arrived' },
    ];

    messageTypes.forEach((mt) => {
      this.adminService
        .filterButtonStats(companyId, mt.type, from, to)
        .subscribe(
          (res: any) => {
            const apiData = res[0] || {};
            const pressedArr = apiData?.pressed || [];
            const sentArr = apiData?.sent || [];
            console.log(res);

            const totalPressed = pressedArr.reduce(
              (sum: number, p: any) => sum + (p.pressedCount || 0),
              0
            );

            const items = sentArr
              .filter((s: any) => s.sentCount > 0)
              .map((s: any) => {
                const pressed = pressedArr.find((p: any) => p._id === s._id);
                const pressedCount = pressed ? pressed.pressedCount : 0;

                const percent =
                  totalPressed > 0
                    ? ((pressedCount / totalPressed) * 100).toFixed(2)
                    : '0';

                return {
                  label: s._id,
                  value: pressedCount,
                  percent,
                  type: 'filter',
                  sentCount: s.sentCount,
                };
              });

            // 👇 yahan check
            if (items.length > 0) {
              const topSentCount = items[0].sentCount;

              const template = {
                title: mt.title,
                icon: mt.icon,
                active: true,
                totalClicks: totalPressed,
                topSentCount,
                items,
              };

              if (mt.title === 'Paylink' || mt.title === 'Booking') {
                this.bookingOrPaylink.push(template);
              } else if (mt.title === 'Follow Up' || mt.title === 'Tracking') {
                this.trackingOrReview.push(template);
              } else if (mt.title === 'Arrived') {
                this.arrived.push(template);
              }
            } else {
              // Agar items 0 hain to purana data rehne do, overwrite mat karo
              console.log(
                `${mt.title} returned no data, keeping previous values`
              );
            }

            this.buildColumns();
            this.loading = false; // 👈 ye hamesha chalega
          },
          (error) => {
            console.error(error);
            this.loading = false; // 👈 error case me bhi off
          }
        );
    });
  }

  months: {
    name: string;
    days: { date: Date; isCurrentMonth: boolean }[];
  }[] = [];

  generateCalendar(year: number, month: number) {
    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    this.days = [];
    this.currentYear = year;
    this.currentMonth = month;

    const startDay = firstDayOfMonth.getDay();
    for (let i = 0; i < startDay; i++) {
      this.days.push({ date: null, isCurrentMonth: false });
    }
    const totalDays = lastDayOfMonth.getDate();
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      if (date >= this.minDate && date <= this.maxDate) {
        this.days.push({ date, isCurrentMonth: true, isInRange: true });
      }
    }
  }

  selectDate(day: Day) {
    if (!day.isCurrentMonth) return;

    if (day.date > this.maxDate) return;
    if (!this.selectedStart || (this.selectedStart && this.selectedEnd)) {
      this.selectedStart = day.date;
      this.selectedEnd = null;
    } else {
      if (day.date >= this.selectedStart) {
        this.selectedEnd = day.date;
      } else {
        this.selectedEnd = this.selectedStart;
        this.selectedStart = day.date;
      }
      if (this.selectedStart && this.selectedEnd) {
        const from = this.formatDate(this.selectedStart);
        const to = this.formatDate(this.selectedEnd);
        this.loadFilteredStats(from, to);
      }
    }
  }

  isSelected(day: Day): boolean {
    if (!this.selectedStart) return false;
    if (this.selectedStart && !this.selectedEnd) {
      return this.sameDate(day.date, this.selectedStart);
    }
    return (
      this.selectedEnd &&
      day.date >= this.selectedStart &&
      day.date <= this.selectedEnd
    );
  }

  sameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
  toggleCalendar() {
    if (this.loading) return;
    this.showCalendar = !this.showCalendar;
  }
  isPrevDisabled(): boolean {
    return (
      this.currentYear === this.minDate.getFullYear() &&
      this.currentMonth === this.minDate.getMonth()
    );
  }
  isNextDisabled(): boolean {
    return (
      this.currentYear === this.maxDate.getFullYear() &&
      this.currentMonth === this.maxDate.getMonth()
    );
  }
}
