import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUrl: string = '';
  constructor(private authService: AuthService, private router: Router) {
    this.currentUrl = this.router.url;
  }

  user: any = null;
  title: string = 'dashboard';
  loading = true;
  showLogoutOptions = false;

  token = false;
  ngOnInit(): void {
    this.checkAuthentication();

    if (!localStorage.getItem('token')) {
      this.token = false;
    } else {
      this.token = true;
    }

    // Run immediately
    this.updateUrlAndTitle(this.router.url);

    // Run on every navigation change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateUrlAndTitle(event.urlAfterRedirects || event.url);
        this.checkAuthentication();
      });
  }

  updateUrlAndTitle(rawUrl: string): void {
    if (!rawUrl || rawUrl.trim() === '/' || rawUrl.trim() === '') {
      this.currentUrl = 'home / dashboard';
      this.title = 'dashboard';
    } else {
      const cleanedUrl = rawUrl.split('?')[0].replace(/\/$/, ''); // remove trailing slash
      this.currentUrl =
        'home' + cleanedUrl.replace(/\//g, ' / ').replace(/-/g, ' ');
      const urlParts = this.currentUrl.split(' / ').filter(Boolean);
      this.title = urlParts[urlParts.length - 1].replace(/-/g, ' ');
    }

    // console.log('Current URL:', `"${this.currentUrl}"`);
  }

  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    this.loading = true;
    this.authService.authenticateUser(token).subscribe(
      (res) => {
        this.user = res;
        this.loading = false;
        localStorage.setItem('user_details', JSON.stringify(res));
      },
      (err) => {
        this.logoutHandler();
      }
    );
  }

  logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_details');
    this.router.navigateByUrl('/login');
  };
}
