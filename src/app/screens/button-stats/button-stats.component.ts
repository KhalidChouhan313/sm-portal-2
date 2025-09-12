import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-button-stats',
  templateUrl: './button-stats.component.html',
  styleUrls: ['./button-stats.component.css'],
})
export class ButtonStatsComponent implements OnInit {
  templates: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user_details');
    const user = userData ? JSON.parse(userData) : null;
    const companyId = user?._id;

    // jitne bhi message types show karne hain
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

    this.templates = [];

    messageTypes.forEach((mt) => {
      this.adminService
        .getButtonStats(companyId, mt.type)
        .subscribe((res: any) => {
          const apiData = res[0] || {};
          console.log(apiData);
          const sentItems =
            apiData?.sent?.filter((s: any) => s.sentCount > 0) || [];

          const pressedMap: any = {};
          apiData?.pressed?.forEach(
            (p: any) => (pressedMap[p._id] = p.pressedCount)
          );

          const items = sentItems.map((item: any) => {
            const pressedCount = pressedMap[item._id] || 0;
            const sentCount = item.sentCount;
            const percent =
              sentCount > 0 ? ((pressedCount / sentCount) * 100).toFixed(0) : 0;

            return {
              label: item._id,
              value: pressedCount,
              percent: percent,
              type: 'normal',
            };
          });

          this.templates.push({
            title: mt.title,
            icon: mt.icon,
            active: true,
            totalClicks: apiData?.pressed?.reduce(
              (sum: number, b: any) => sum + b.pressedCount,
              0
            ),
            items: items,
          });
        });
    });
  }
}
