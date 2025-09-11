import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent {
  showSearch = false;
  selected: any;
  toggleShowSearch = (e: any) => {
    if (e.target.classList[0] !== "search_toggle_btn") {
      this.showSearch = false
    } else {
      this.showSearch = true
    }
  }

  currentItem = 0;
  setCurrentItem = (index:number) => this.currentItem = index;
}
