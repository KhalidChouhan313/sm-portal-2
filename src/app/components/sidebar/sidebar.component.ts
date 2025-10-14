import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingsService } from 'src/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private bookingsService: BookingsService
  ) {}

  loading = true;
  haveBot = false;
  token = false;

  currentItem: string = '';
  currentSubItem: string = '';
  currentNestedItem: string = '';
  hoveredItem: string | null = null;

  ngOnInit(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('user_details') || '{}'
    );
    if (!currentUser || !currentUser._id) {
      this.router.navigateByUrl('login');
      return;
    }

    this.token = !!localStorage.getItem('token');

    this.bookingsService.getCompanyBots(currentUser._id).subscribe(
      (res) => {
        this.loading = false;
        this.haveBot = true;
      },
      (err) => {
        this.loading = false;
        this.haveBot = false;
      }
    );
  }

  setCurrentItem(e: string, event?: Event) {
    if (event) event.stopPropagation();
    this.currentItem = this.currentItem === e ? '' : e;
    this.currentSubItem = '';
    this.currentNestedItem = '';
  }

  setCurrentSubItem(e: string, event?: Event) {
    if (event) event.stopPropagation();
    this.currentSubItem = this.currentSubItem === e ? '' : e;
  }

 
setCurrentNestedItem(e: string, event?: Event) {
  if (event) event.stopPropagation();
  this.currentNestedItem = this.currentNestedItem === e ? '' : e;
}

  isToggled = false;
  toggleNavbar() {
    this.isToggled = !this.isToggled;
  }

  logoutHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_details');
    this.router.navigateByUrl('/login');
  }
}
