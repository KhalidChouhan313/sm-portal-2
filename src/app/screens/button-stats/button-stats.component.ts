import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-button-stats',
  templateUrl: './button-stats.component.html',
  styleUrls: ['./button-stats.component.css'],
})
export class ButtonStatsComponent implements OnInit {
  col1: any[] = [];
  col2: any[] = [];
  col3: any[] = [];

  private bookingOrPaylink: any[] = [];
  private trackingOrReview: any[] = [];
  private arrived: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user_details');
    const user = userData ? JSON.parse(userData) : null;
    const companyId = user?._id;

    const messageTypes = [
      { title: 'Booking', icon: 'assets/icons/Frame.svg', type: 'booking' },
      { title: 'Paylink', icon: 'assets/icons/Group 73 (1).png', type: 'paylink' },
      { title: 'Tracking', icon: 'assets/icons/tracking.svg', type: 'tracking' },
      { title: 'Review', icon: 'assets/icons/Vector.png', type: 'review' },
      { title: 'Arrived', icon: 'assets/icons/Group 73.png', type: 'arrived' },
    ];

    messageTypes.forEach((mt) => {
      this.adminService.getButtonStats(companyId, mt.type).subscribe((res: any) => {
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
        if (title === 'Booking' || title === 'Paylink') {
          this.bookingOrPaylink.push(template);
        } else if (title === 'Tracking' || title === 'Review') {
          this.trackingOrReview.push(template);
        } else if (title === 'Arrived') {
          this.arrived.push(template);
        }

        this.buildColumns();
      });
    });
  }

  private buildColumns() {
    this.col1 = [...this.bookingOrPaylink];

    if (this.trackingOrReview.length > 0) {
      this.col2 = [...this.trackingOrReview];
      this.col3 = [...this.arrived];
    } else {
      this.col2 = [...this.arrived];
      this.col3 = [];
    }
  }
}
