import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-button-stats',
  templateUrl: './button-stats.component.html',
  styleUrls: ['./button-stats.component.css'],
})
export class ButtonStatsComponent implements OnInit {
  templates: any[] = [];
  col1: any[] = [];
  col2: any[] = [];
  col3: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user_details');
    const user = userData ? JSON.parse(userData) : null;
    const companyId = user?._id;

    const messageTypes = [
      { title: 'Booking', icon: 'assets/icons/Frame.svg', type: 'booking' },
      { title: 'Arrived', icon: 'assets/icons/Group 73.png', type: 'arrived' },
      {
        title: 'Tracking',
        icon: 'assets/icons/tracking.svg',
        type: 'tracking',
      },
      {
        title: 'Paylink',
        icon: 'assets/icons/Group 73 (1).png',
        type: 'paylink',
      },
      { title: 'Review', icon: 'assets/icons/Vector.png', type: 'review' },
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

          if (!pressedArr.length || totalPressed === 0) return;

          const topSentCount = sentArr.length ? sentArr[0].sentCount : 0;

          const items = pressedArr.map((p: any) => {
            const percent =
              totalPressed > 0
                ? ((p.pressedCount / totalPressed) * 100).toFixed(0)
                : 0;
            return {
              label: p._id,
              value: p.pressedCount,
              percent: percent,
              type: 'normal',
            };
          });

          const template = {
            title: mt.title,
            icon: mt.icon,
            active: true,
            totalClicks: totalPressed,
            topSentCount: topSentCount, 
            items: items,
          };

          if (mt.title === 'Booking' || mt.title === 'Paylink') {
            this.col1.push(template);
          } else if (mt.title === 'Tracking' || mt.title === 'Review') {
            this.col2.push(template);
          } else if (mt.title === 'Arrived') {
            this.col3.push(template);
          }
        });
    });
  }
}
