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
  ) { }

  loading = true;
  haveBot = false;
  token = false;

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!currentUser) {
      this.router.navigateByUrl('login');
    }

    // console.log(currentUser._id);

    if (!localStorage.getItem('token')) {
      this.token = false;
    } else {
      this.token = true;
    }

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
  }w

  currentItem = '';
  hoveredItem: string | null = null;

  onMouseEnter(item: string) {
    this.hoveredItem = item;
  }

  onMouseLeave() {
    if (this.currentSubItem == '') {
      this.hoveredItem = null;
    }
  }

  setCurrentItem = (e: string) => {
    this.currentSubItem = '';
    this.hoveredItem = null;
    this.currentItem = this.currentItem === e ? null : e;
  };
  currentSubItem = '';

  setCurrentSubItem = (e: string) => {
    this.currentItem = '';
    this.currentSubItem = e;
  };

  isToggled = false;
  toggleNavbar = () => (this.isToggled = !this.isToggled);

  logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_details');
    this.router.navigateByUrl('/login');
  };
}
